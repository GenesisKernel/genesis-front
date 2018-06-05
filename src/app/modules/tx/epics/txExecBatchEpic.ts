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

import { Epic } from 'modules';
import { txExecBatch } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import { ITxCallBatchResponse } from 'genesis/api';
import { ITransaction } from 'genesis/tx';

const TX_STATUS_INTERVAL = 3000;

const txExecBatchEpic: Epic = (action$, store, { api }) => action$.ofAction(txExecBatch.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);
        const privateKey = action.payload.privateKey;
        const publicKey = keyring.generatePublicKey(privateKey);

        return Observable.of(action.payload).flatMap(result => Observable.from(result.forsign).flatMap(forsign =>
            // Performance bottleneck. Detach cryptographic operations from current
            // context to release the event loop
            Observable.of(
                keyring.sign(forsign, privateKey)

            ).delay(50), 5).toArray().flatMap(signatures =>
                client.txCallBatch({
                    requestID: result.request_id,
                    time: result.time,
                    signatures,
                    pubkey: publicKey
                })
            )
        ).flatMap((call: ITxCallBatchResponse) =>
            Observable.defer(() => client.txStatusBatch({
                hashes: call.hashes

            })).map(status => {
                let pending = action.payload.forsign.length;

                for (let itr in status.results) {
                    if (status.results.hasOwnProperty(itr)) {
                        const tx = status.results[itr];
                        if (tx.errmsg) {
                            throw {
                                type: 'E_ERROR',
                                data: tx.errmsg
                            };
                        }
                        else if (tx.blockid) {
                            pending--;
                        }
                    }
                }

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

            }))

        ).map(result => {
            const results: ITransaction[] = [];
            for (let itr in result.results) {
                if (result.results.hasOwnProperty(itr)) {
                    const tx = result.results[itr];
                    results.push({
                        type: 'single',
                        uuid: action.payload.uuid,
                        contract: null,
                        block: tx.blockid,
                        result: tx.result,
                        error: null
                    });
                }
            }

            return txExecBatch.done({
                params: action.payload,
                result: results
            });

        }).catch(error =>
            Observable.of(txExecBatch.failed({
                params: action.payload,
                error
            }))
        );
    });

export default txExecBatchEpic;