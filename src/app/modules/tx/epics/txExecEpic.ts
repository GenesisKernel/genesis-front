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
import { Observable } from 'rxjs';
import { txExec } from '../actions';
import { ITransaction } from 'genesis/tx';
import uuid from 'uuid';
import Contract, { IContractParam } from 'lib/tx/contract';
import defaultSchema from 'lib/tx/schema/defaultSchema';
import fileObservable from 'modules/io/util/fileObservable';
import { enqueueNotification } from 'modules/notifications/actions';

const TX_STATUS_INTERVAL = 3000;

export const txExecEpic: Epic = (action$, store, { api }) => action$.ofAction(txExec.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.from(action.payload.tx.contracts).flatMap(contract =>
            Observable.from(client.getContract({
                name: contract.name

            })).flatMap(proto =>
                Observable.from(contract.params).flatMap(fields =>
                    Observable.from(proto.fields)
                        .filter(l => l.type === 'file' && contract.params[l.name])
                        .flatMap(field => fileObservable(fields[field.name])
                            .map(buffer => {
                                const blob = fields[field.name] as File;
                                return {
                                    field: field.name,
                                    name: blob.name,
                                    type: blob.type,
                                    value: buffer,
                                };
                            })
                        ).toArray()
                        .flatMap(files => {
                            const params: { [name: string]: IContractParam } = {};
                            proto.fields.forEach(field => {
                                const file = files.find(f => f.field === field.name);
                                params[field.name] = {
                                    type: field.type,
                                    value: file ? {
                                        name: file.name,
                                        type: file.type,
                                        value: file.value
                                    } : params[field.name]
                                };
                            });

                            // tslint:disable-next-line:no-console
                            console.log('Passing params::', params, fields);

                            return Observable.from(new Contract({
                                id: proto.id,
                                schema: defaultSchema,
                                ecosystemID: state.auth.ecosystem ? parseInt(state.auth.ecosystem, 10) : 1,
                                fields: params
                            }).sign(action.payload.privateKey));
                        })

                    // Contract params serialization concurrency
                ), 1).toArray()

            // Contracts serialization concurrency
            , 1).flatMap(contracts => {
                const request = {};
                contracts.forEach(contract => {
                    request[contract.hash] = new Blob([contract.data]);
                });
                return Observable.from(client.txSend(request)).flatMap(sendResponse => Observable.defer(() =>
                    client.txStatus(contracts.map(l => l.hash))

                ).map(status => {
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
                        return status;
                    }
                    else {
                        throw {
                            type: 'E_PENDING',
                            count: pending
                        };
                    }

                }).retryWhen(errors => errors.flatMap(error => {
                    switch (error.type) {
                        case 'E_PENDING':
                            return Observable.of(error).delay(TX_STATUS_INTERVAL);

                        case 'E_ERROR':
                            return Observable.throw({
                                type: error.data.type,
                                error: error.data.error,
                                params: error.data.params
                            });

                        default:
                            return Observable.throw(error);
                    }

                })));

            }, 1).toArray().flatMap(result => {
                const results: ITransaction[] = [];
                result.forEach(contract => {
                    Object.keys(contract).forEach(hash => {
                        const status = contract[hash];
                        results.push({
                            uuid: action.payload.tx.uuid,
                            contract: null,
                            block: status.blockid,
                            result: status.result,
                            error: null
                        });
                    });
                });

                return Observable.of<Action>(
                    txExec.done({
                        params: action.payload,
                        result: results
                    }),
                    enqueueNotification({
                        id: uuid.v4(),
                        type: 'TX_BATCH',
                        params: {}
                    })
                );

            }).catch(error => {
                // tslint:disable-next-line:no-console
                console.log('TxError::', error);
                return Observable.of(txExec.failed({
                    params: action.payload,
                    error
                }));
            });
    });

export default txExecEpic;