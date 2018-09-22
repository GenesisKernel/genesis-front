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

import uuid from 'uuid';
import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { txExec } from '../actions';
import { authorize } from 'modules/auth/actions';
import { TTxError } from 'genesis/tx';
import { enqueueNotification } from 'modules/notifications/actions';
import Contract, { IContractParam } from 'lib/tx/contract';
import defaultSchema from 'lib/tx/schema/defaultSchema';
import fileObservable from 'modules/io/util/fileObservable';

export const txExecEpic: Epic = (action$, store, { api }) => action$.ofAction(txExec.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.from(client.getContract({
            name: action.payload.tx.contract.name

        })).flatMap(proto => Observable.from(proto.fields)
            .filter(l => l.txtype === 'types.File' && action.payload.tx.contract.params[l.name])
            .flatMap(field =>
                fileObservable(action.payload.tx.contract.params[field.name])
                    .map(buffer => {
                        const blob = action.payload.tx.contract.params[field.name] as File;
                        return {
                            field: field.name,
                            name: blob.name,
                            type: blob.type,
                            value: buffer,
                        };
                    })
            ).toArray()
            .flatMap(files => {
                const fields: { [name: string]: IContractParam } = {};
                proto.fields.forEach(field => {
                    const file = files.find(f => f.field === field.name);
                    fields[field.name] = {
                        type: field.txtype,
                        value: file ? {
                            name: file.name,
                            type: file.type,
                            value: file.value
                        } : action.payload.tx.contract.params[field.name]
                    };
                });

                const contract = new Contract({
                    id: proto.id,
                    schema: defaultSchema,
                    ecosystemID: state.auth.ecosystem ? parseInt(state.auth.ecosystem, 10) : 1,
                    roleID: state.auth.role ? state.auth.role.id : 0,
                    fields
                });

                return Observable.from(contract.sign(action.payload.privateKey)).flatMap(signature =>
                    client.txSend({
                        data: new Blob([signature], { type: 'application/octet-stream' })
                    })
                );
            })

        ).flatMap(result => Observable.defer(() => client.txStatus({
            hash: result.hash

        }).then(status => {
            if (!status.blockid && !status.errmsg) {
                throw 'E_PENDING';
            }
            else {
                return status;
            }

        })).retryWhen(errors =>
            errors.delay(2000)

        ).flatMap(txResult => {
            if (txResult.blockid) {
                const actions = Observable.of<Action>(
                    txExec.done({
                        params: action.payload,
                        result: {
                            block: txResult.blockid,
                            result: txResult.result
                        }
                    }),
                    authorize(action.payload.privateKey)
                );

                if (action.payload.tx.silent) {
                    return actions;
                }
                else {
                    return actions.concat(Observable.of(enqueueNotification({
                        id: uuid.v4(),
                        type: 'TX_SUCCESS',
                        params: {
                            block: txResult.blockid,
                            tx: action.payload.tx
                        }
                    })));
                }
            }
            else {
                return Observable.of(txExec.failed({
                    params: action.payload,
                    error: {
                        type: txResult.errmsg.type as TTxError,
                        error: txResult.errmsg.error
                    }
                }));
            }

        })).catch(error => Observable.of(txExec.failed({
            params: action.payload,
            error: {
                type: (error.errmsg ? error.errmsg.type : error.error) as TTxError,
                error: error.errmsg ? error.errmsg.error : error.msg
            }
        })));
    });

export default txExecEpic;