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
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';
import { sendAttachment } from '../actions';
import { sendAttachment as fsSend } from 'lib/fs';

const sendAttachmentEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(sendAttachment)
        .flatMap(action => {
            fsSend(action.payload.name, action.payload.data);
            return Observable.empty();
        });

export default sendAttachmentEpic;