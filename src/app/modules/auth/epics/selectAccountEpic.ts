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

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { Observable } from 'rxjs/Observable';
import { selectAccount } from '../actions';
import { navigate } from 'modules/engine/actions';
import api, { IAPIError } from 'lib/api';

const selectAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(selectAccount.started)
        .flatMap(action => {
            return Observable.fromPromise(
                api.refresh(action.payload.sessionToken, action.payload.refreshToken)
                    .then(tokens =>
                        api.row(tokens.token, 'members', action.payload.id, 'avatar,member_name')
                            .then(memberResult => ({
                                avatar: memberResult.value.avatar,
                                username: memberResult.value.member_name,
                                ...tokens
                            }))
                    )

            ).map(payload => selectAccount.done({
                params: {
                    ...action.payload,
                    avatar: payload.avatar,
                    username: payload.username,
                    sessionToken: payload.token,
                    refreshToken: payload.refresh
                },
                result: {
                    sessionToken: payload.token,
                    refreshToken: payload.refresh
                }

            })).catch((e: IAPIError) =>
                Observable.of<Action>(
                    selectAccount.failed({
                        params: action.payload,
                        error: e.error
                    }),
                    navigate('/')
                )
            );
        });

export default selectAccountEpic;