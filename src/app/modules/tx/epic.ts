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

import { IRootState } from 'modules';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { toastr } from 'react-redux-toastr';
import swal from 'sweetalert2';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as actions from './actions';
import * as authActions from 'modules/auth/actions';
import * as storageActions from 'modules/storage/actions';
import keyring from 'lib/keyring';
import api, { IAPIError, ITxStatusResponse } from 'lib/api';
import { modalShow, modalClose } from 'modules/content/actions';
import { isType } from 'typescript-fsa';

export const txCallEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.txCall)
        .flatMap(action => {
            const state = store.getState();
            if (keyring.validatePrivateKey(state.auth.privateKey)) {
                return Observable.of(actions.txExec.started({
                    tx: action.payload,
                    privateKey: state.auth.privateKey
                }));
            }
            else {
                return Observable.merge(
                    Observable.of(actions.txAuthorize.started({ contract: action.payload.name })),
                    action$.filter(l => actions.txAuthorize.done.match(l) || actions.txAuthorize.failed.match(l))
                        .take(1)
                        .flatMap(result => {
                            if (isType(result, actions.txAuthorize.done)) {
                                return Observable.of(actions.txExec.started({
                                    tx: action.payload,
                                    privateKey: keyring.decryptAES(store.getState().auth.account.encKey, result.payload.result)
                                }, action.meta));
                            }
                            else {
                                return Observable.empty<never>();
                            }
                        })
                );
            }
        });

export const txAuthorizeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.txAuthorize.started)
        .flatMap(action =>
            Observable.merge(
                Observable.of(modalShow({
                    id: 'TX_CONFIRM_PASSWORD',
                    type: 'PROMPT',
                    params: {
                        type: 'password',
                        title: store.getState().engine.intl.formatMessage({
                            id: 'tx',
                            defaultMessage: 'Transaction'
                        }),
                        description: store.getState().engine.intl.formatMessage({
                            id: 'tx.password',
                            defaultMessage: 'Enter your password to sign contract \'{contract}\''
                        }, { contract: action.payload.contract })
                    }
                })),
                action$.ofAction(modalClose).map(result => {
                    if (result.payload.data) {
                        return actions.txAuthorize.done({
                            params: action.payload,
                            result: result.payload.data
                        });
                    }
                    else {
                        return actions.txAuthorize.failed({
                            params: action.payload,
                            error: null
                        });
                    }
                })
            )
        );

export const txExecEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.txExec.started)
        .flatMap(action => {
            const state = store.getState();

            if (keyring.validatePrivateKey(action.payload.privateKey)) {
                return Observable.fromPromise(api.txPrepare(state.auth.sessionToken, action.payload.tx.name, action.payload.tx.params, action.payload.tx.vde)
                    .then(response => {
                        let forSign = response.forsign;
                        const signParams = {};

                        const execTx = () => {
                            const signature = keyring.sign(forSign, action.payload.privateKey);
                            const publicKey = keyring.generatePublicKey(action.payload.privateKey);

                            return api.txExec(state.auth.sessionToken, action.payload.tx.name, {
                                ...action.payload.tx.params,
                                pubkey: publicKey,
                                signature,
                                time: response.time,
                                ...signParams
                            }, action.payload.tx.vde);
                        };

                        if (response.signs) {
                            return Promise.each(response.signs, sign => {
                                return swal({
                                    title: state.engine.intl.formatMessage({ id: 'tx.confirm', defaultMessage: 'Signature required' }),
                                    html: `
                                        <div class="text-left">
                                            <div>${_.escape(sign.title)}</div>
                                            <div>
                                                ${sign.params.map(param => `
                                                    <hr/>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div><strong>${_.escape(param.name)}</strong></div>
                                                            <div class="text-muted">${_.escape(param.text)}</div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div><strong>${state.engine.intl.formatMessage({ id: 'tx.param.value', defaultMessage: 'Value' })}</strong></div>
                                                            ${_.escape(action.payload.tx.params[param.name] || '-')}
                                                        </div>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    `,
                                    showCancelButton: true
                                }).catch(e => {
                                    throw new Error('E_TX_CANCELLED');
                                });
                            }).then(result => {
                                response.signs.forEach(sign => {
                                    const childSign = keyring.sign(sign.forsign, action.payload.privateKey);
                                    signParams[sign.field] = childSign;
                                    forSign += `,${childSign}`;
                                });
                                return execTx();
                            });
                        }
                        else {
                            return execTx();
                        }
                    }))
                    .flatMap(payload => {
                        // We must listen to this transaction or we will never catch
                        // the ID of newly created ecosystem. Contract name is constant
                        const hooks: Observable<Action>[] = [];
                        const contractName = /^(@[0-9]+)?(.*)$/i.exec(action.payload.tx.name)[2];

                        switch (contractName) {
                            case 'NewEcosystem':
                                const ecosystemName = (action.payload.tx.params && action.payload.tx.params.Name) || payload.result;
                                const account = state.auth.account;

                                hooks.push(
                                    Observable.of(storageActions.saveAccount({
                                        id: account.id,
                                        encKey: account.encKey,
                                        address: account.address,
                                        avatar: null,
                                        username: null,
                                        sessionToken: null,
                                        refreshToken: null,
                                        socketToken: null,
                                        timestamp: null,
                                        ecosystem: payload.result,
                                        ecosystemName
                                    }))
                                );
                                break;

                            default:
                                break;
                        }

                        if (!action.payload.tx.silent) {
                            toastr.success(
                                action.payload.tx.name,
                                state.engine.intl.formatMessage({ id: 'tx.imprinted.block', defaultMessage: 'Imprinted in the blockchain (block #{block})' }, { block: payload.blockid }),
                            );
                        }

                        return Observable.concat(
                            ...hooks,
                            Observable.of(authActions.authorize({
                                privateKey: action.payload.privateKey
                            })),
                            Observable.of(actions.txExec.done({
                                params: action.payload,
                                result: {
                                    block: payload.blockid,
                                    result: payload.result
                                }
                            }, action.meta)));
                    })
                    .catch((error: IAPIError & ITxStatusResponse) => {
                        if (!action.payload.tx.silent) {
                            toastr.error(
                                action.payload.tx.name,
                                state.engine.intl.formatMessage({ id: 'tx.error', defaultMessage: 'Error executing transaction' })
                            );
                        }
                        return Observable.of(actions.txExec.failed({
                            params: action.payload,
                            error: {
                                type: error.errmsg ? error.errmsg.type : error.error,
                                error: error.errmsg ? error.errmsg.error : error.msg
                            }
                        }));
                    });
            }
            else {
                return Observable.of(actions.txExec.failed({
                    params: action.payload,
                    error: {
                        type: 'E_INVALID_PASSWORD',
                        error: null
                    }
                }));
            }
        });

export default combineEpics(
    txCallEpic,
    txAuthorizeEpic,
    txExecEpic
);