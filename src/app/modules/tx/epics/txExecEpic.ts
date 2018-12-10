// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Action } from 'redux';
import { Epic } from 'modules';
import { from, defer, of, throwError } from 'rxjs';
import { txExec } from '../actions';
import uuid from 'uuid';
import Contract, { IContractParam } from 'lib/tx/contract';
import defaultSchema from 'lib/tx/schema/defaultSchema';
import fileObservable from 'modules/io/util/fileObservable';
import { enqueueNotification } from 'modules/notifications/actions';
import { flatMap, filter, map, toArray, retryWhen, delay, catchError } from 'rxjs/operators';

const TX_STATUS_INTERVAL = 3000;

// TODO: refactoring
export const txExecEpic: Epic = (action$, store, { api }) => action$.ofAction(txExec.started).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);
        const privateKey = store.value.auth.privateKey!;

        return from(action.payload.contracts).pipe(
            flatMap(contract => from(client.getContract({ name: contract.name })).pipe(
                flatMap(proto => from(contract.params).pipe(
                    flatMap(params => from(proto.fields).pipe(
                        filter(l => l.type === 'file' && params[l.name]),
                        flatMap(field => fileObservable(params[field.name]).pipe(
                            map(buffer => {
                                const blob = params[field.name] as File;
                                return {
                                    field: field.name,
                                    name: blob.name,
                                    type: blob.type,
                                    value: buffer,
                                };
                            }),
                            toArray(),
                        )),
                        flatMap(files => {
                            const txParams: { [name: string]: IContractParam } = {};
                            const logParams: { [name: string]: IContractParam } = {};

                            proto.fields.forEach(field => {
                                const file = files.find(f => f.field === field.name);
                                txParams[field.name] = {
                                    type: field.type,
                                    value: file ? {
                                        name: file.name,
                                        type: file.type,
                                        value: file.value
                                    } : params[field.name]
                                };
                                logParams[field.name] = {
                                    type: field.type,
                                    value: file ? null : params[field.name]
                                };
                            });

                            return from(new Contract({
                                id: proto.id,
                                schema: defaultSchema,
                                ecosystemID: parseInt(store.value.auth.session.access!.ecosystem || '1', 10),
                                fields: txParams,
                                maxSum: store.value.auth.session.wallet!.settings && store.value.auth.session.wallet!.settings.maxSum

                            }).sign(privateKey)).pipe(
                                map(signature => ({
                                    ...signature,
                                    name: proto.name,
                                    params: logParams
                                }))
                            );
                        })
                    ))
                )),
            ), 1),
            toArray(),
            flatMap(contracts => {
                const request: { [hash: string]: Blob } = {};
                const jobs: {
                    name: string,
                    hash: string,
                    params: {
                        [name: string]: IContractParam;
                    }
                }[] = [];

                contracts.forEach(contract => {
                    request[contract.hash] = new Blob([contract.data]);
                    jobs.push({
                        name: contract.name,
                        hash: contract.hash,
                        params: contract.params,
                    });
                });

                return from(client.txSend(request)).pipe(
                    flatMap(() => defer(() =>
                        client.txStatus(contracts.map(l => l.hash))
                    ).pipe(
                        map(status => {
                            let pending = contracts.length;
                            contracts.forEach(contract => {
                                const tx = status[contract.hash];
                                if (tx.errmsg) {
                                    throw {
                                        type: 'E_ERROR',
                                        data: tx.errmsg
                                    };
                                }
                                else if (tx.blockid) {
                                    pending--;
                                }
                            });

                            if (0 === pending) {
                                return jobs.map(job => ({
                                    ...job,
                                    status: status[job.hash]
                                }));
                            }
                            else {
                                throw {
                                    type: 'E_PENDING',
                                    count: pending
                                };
                            }

                        }),
                        retryWhen(errors => errors.pipe(
                            flatMap(error => {
                                switch (error.type) {
                                    case 'E_PENDING':
                                        return of(error).pipe(
                                            delay(TX_STATUS_INTERVAL)
                                        );

                                    case 'E_ERROR':
                                        return throwError({
                                            id: error.data.id,
                                            type: error.data.type,
                                            error: error.data.error,
                                            params: error.data.params
                                        });

                                    default:
                                        return throwError(error);
                                }

                            })
                        ))
                    ))
                );
            }, 1),
            toArray(),
            flatMap(results => of<Action>(
                txExec.done({
                    params: action.payload,
                    result: Array.prototype.concat.apply([], results)
                }),
                enqueueNotification({
                    id: uuid.v4(),
                    type: 'TX_BATCH',
                    params: {}
                })

            )),
            catchError(error => of(txExec.failed({
                params: action.payload,
                error: 'id' in error ? error : {
                    type: (error.errmsg ? error.errmsg.type : error.error),
                    error: error.errmsg ? error.errmsg.error : error.msg,
                    params: error.params || []
                }
            })))
        );
    })
);

export default txExecEpic;