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
import { isType } from 'typescript-fsa';
import keyring from 'lib/keyring';
import { txCall, txAuthorize, txPrepare, txExecBatch } from '../actions';
import { modalShow, modalClose } from 'modules/modal/actions';

const txCallEpic: Epic = (action$, store) => action$.ofAction(txCall)
    .flatMap(action => {
        const execTx = (privateKey: string) => {
            if ('contracts' in action.payload) {
                return Observable.of(txExecBatch.started({
                    ...action.payload,
                    privateKey
                }));
            }
            else {
                return Observable.of(txPrepare({
                    tx: action.payload,
                    privateKey
                }));
            }
        };

        const validateTx = Observable.defer(() => {
            const state = store.getState();
            if (keyring.validatePrivateKey(state.auth.privateKey)) {
                return execTx(state.auth.privateKey);
            }
            else {
                const contractName = 'contracts' in action.payload ? null : action.payload.name;

                return Observable.merge(
                    Observable.of(txAuthorize.started({ contract: contractName })),
                    action$.filter(l => txAuthorize.done.match(l) || txAuthorize.failed.match(l))
                        .take(1)
                        .flatMap(result => {
                            if (isType(result, txAuthorize.done)) {
                                return execTx(keyring.decryptAES(store.getState().auth.account.encKey, result.payload.result));
                            }
                            else {
                                return Observable.empty<never>();
                            }
                        })
                );
            }
        });

        if (action.payload.confirm) {
            return Observable.merge(
                Observable.of(modalShow({
                    id: action.payload.uuid,
                    type: 'TX_CONFIRM',
                    params: action.payload.confirm
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .flatMap(modalPayload => {
                        if ('RESULT' === modalPayload.payload.reason) {
                            return validateTx;
                        }
                        else {
                            return Observable.empty<never>();
                        }
                    })
            );
        }
        else {
            return validateTx;
        }
    });

export default txCallEpic;