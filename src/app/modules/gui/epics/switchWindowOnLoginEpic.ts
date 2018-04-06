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
import { switchWindow } from '../actions';
import { login } from 'modules/auth/actions';
import { Observable } from 'rxjs/Observable';

const switchWindowOnLoginEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(login.done)
        .flatMap(action => {
            if (action.payload.result.roles && action.payload.result.roles.length) {
                return Observable.empty<never>();
            }
            else {
                return Observable.of(switchWindow.started('main'));
            }
        });

export default switchWindowOnLoginEpic;