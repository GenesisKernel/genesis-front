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
import { Observable } from 'rxjs';
import keyring from 'lib/keyring';
import { txPrepareBatch, txExecBatch } from '../actions';
import NodeObservable from 'modules/engine/util/NodeObservable';
import { TTxParams } from 'genesis/api';
import TxDissect from '../util/TxDissect';

// 10 seconds max jitter between tx header validation
const MAX_FAULT_TIME = 10;

const txPrepareBatchEpic: Epic = (action$, store, { api }) => action$.ofAction(txPrepareBatch)
    .flatMap(action => {
        const state = store.getState();
        const validatingNodesCount = Math.min(state.storage.fullNodes.length, 3);

        const contracts: { name: string, params: TTxParams }[] = [];
        for (let itr in action.payload.tx.contracts) {
            if (action.payload.tx.contracts.hasOwnProperty(itr)) {
                const tx = action.payload.tx.contracts[itr];
                tx.params.forEach(item =>
                    contracts.push({
                        name: tx.name,
                        params: item
                    })
                );
            }
        }

        return NodeObservable({
            nodes: state.storage.fullNodes,
            count: validatingNodesCount,
            concurrency: 3,
            timeout: MAX_FAULT_TIME * 1000,
            api

        }).flatMap(apiHost => {
            const node = api({ apiHost });
            return Observable.from(node.getUid())
                .flatMap(uid => node
                    .authorize(uid.token)
                    .login({
                        publicKey: keyring.generatePublicKey(action.payload.privateKey),
                        signature: keyring.sign(uid.uid, action.payload.privateKey),
                        ecosystem: state.auth.wallet.ecosystem,
                        role: state.auth.role && state.auth.role.id

                    }).then(session =>
                        api({
                            apiHost,
                            sessionToken: session.token
                        }).txPrepareBatch({
                            contracts
                        })
                    )
                );

        }).flatMap(prepare => Observable.from(prepare.forsign)
            .map(forsign => TxDissect(forsign))
            .toArray().map(dissected => ({
                prepare,
                dissected
            }))

        ).toArray().map((result, index) => {
            const mainPrepare = result[result.length - 1];

            for (let p = 0; p < result.length; p++) {
                const prepare = result[p];
                for (let h = 0; h < prepare.dissected.length; h++) {
                    const header = prepare.dissected[h];
                    if (header.body !== mainPrepare.dissected[h].body || MAX_FAULT_TIME < Math.abs(header.timestamp - mainPrepare.dissected[h].timestamp)) {
                        throw {
                            error: 'E_INVALIDATED'
                        };
                    }
                }
            }

            return txExecBatch.started({
                ...mainPrepare.prepare,
                privateKey: action.payload.privateKey,
                uuid: action.payload.tx.uuid
            });

        }).catch(e => Observable.of(txExecBatch.failed({
            params: {
                uuid: action.payload.tx.uuid,
                request_id: null,
                forsign: [],
                time: null,
                privateKey: null
            },
            error: {
                type: e.error,
                error: e.msg,
                params: e.params
            }
        })));
    });

export default txPrepareBatchEpic;