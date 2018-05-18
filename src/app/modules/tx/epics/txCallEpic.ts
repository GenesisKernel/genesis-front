// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

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