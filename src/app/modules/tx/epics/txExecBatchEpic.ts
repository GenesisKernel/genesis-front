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
import { txExecBatch, txBatchStatus } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import { ITxStatusResponse } from 'genesis/api';
import { ITransaction } from 'genesis/tx';

const BATCH_COOLDOWN_TIMER = 3000;
const BATCH_COUNT = 10;
const BATCH_CONCURRENCY = 1;

interface IBatchExecStatus {
    index: number;
    data: ITxStatusResponse[];
}

const txExecBatchEpic: Epic = (action$, store, { api }) => action$.ofAction(txExecBatch.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        const fullStatus: { contract: string, pending: number, results: ITxStatusResponse[] }[] = action.payload.contracts.map(contract => ({
            contract: contract.name,
            pending: contract.data.length,
            results: []
        }));

        return Observable.from(action.payload.contracts)
            .flatMap((batch, index) => {
                return Observable.from(batch.data).bufferCount(BATCH_COUNT).flatMap(params => {
                    return Observable.from(client.txPrepareBatch({
                        name: batch.name,
                        data: params

                    })).flatMap(prepare =>
                        client.txCallBatch({
                            requestID: prepare.request_id,
                            time: prepare.time,
                            pubkey: keyring.generatePublicKey(state.auth.privateKey, true),
                            signatures: prepare.forsign.map(forsign =>
                                keyring.sign(forsign, state.auth.privateKey)
                            )
                        })

                    ).catch(prepareError => Observable.throw({
                        tx: {
                            uuid: action.payload.uuid,
                            name: batch.name,
                            silent: action.payload.silent,
                            params: batch.data[index],
                        },
                        error: {
                            type: prepareError.error,
                            error: prepareError.msg
                        }

                    })).flatMap(tx => {
                        const notifier: Observable<IBatchExecStatus> = Observable.defer(() => (
                            client.txStatusBatch({
                                hashes: tx.hashes
                            })

                        )).flatMap(status => {
                            const results: ITxStatusResponse[] = [];
                            let pending = 0;

                            for (let itr in status.results) {
                                if (status.results.hasOwnProperty(itr)) {
                                    const result = status.results[itr];
                                    if (result.errmsg) {
                                        throw result.errmsg;
                                    }
                                    else if (!result.blockid) {
                                        pending++;
                                    }
                                    else {
                                        results.push(result);
                                    }
                                }
                            }

                            if (pending) {
                                return Observable.timer(BATCH_COOLDOWN_TIMER).flatMap(() =>
                                    notifier
                                );
                            }
                            else {
                                return Observable.of({
                                    index,
                                    status: 'DONE',
                                    data: results
                                });
                            }
                        });

                        return notifier.catch(childError => Observable.throw({
                            tx: {
                                uuid: action.payload.uuid,
                                name: batch.name,
                                silent: action.payload.silent,
                                params: batch.data[index],
                            },
                            error: {
                                type: childError.type,
                                error: childError.error
                            }
                        }));
                    });
                });

            }, BATCH_CONCURRENCY).map((status: IBatchExecStatus) => {
                fullStatus[status.index].pending -= status.data.length;
                fullStatus[status.index].results = status.data;

                const totalPending = fullStatus.map(v => v.pending).reduce((a, b) => a + b);
                const results = fullStatus.map(v =>
                    v.results.map(r => ({
                        type: 'single',
                        uuid: action.payload.uuid,
                        contract: v.contract,
                        block: r.blockid,
                        result: r.result,
                        error: r.errmsg

                    }) as ITransaction)
                ).reduce((a, b) => a.concat(b));

                if (totalPending) {
                    return txBatchStatus({
                        id: action.payload.uuid,
                        pending: totalPending
                    });
                }
                else {
                    return txExecBatch.done({
                        params: action.payload,
                        result: results
                    });
                }

            }).catch(e => Observable.of(txExecBatch.failed({
                params: action.payload,
                error: e
            })));
    });

export default txExecBatchEpic;