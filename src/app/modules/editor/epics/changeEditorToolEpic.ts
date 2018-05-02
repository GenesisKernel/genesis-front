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
import { Epic } from 'modules';
import { changeEditorTool, getPageTree } from '../actions';
import { Observable } from 'rxjs/Observable';

const changeEditorToolEpic: Epic = (action$, store, { api }) => action$.ofAction(changeEditorTool.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        switch (action.payload) {
            case 'preview':
                const payload = state.editor.tabs[state.editor.tabIndex].value;
                return Observable.fromPromise(client.contentTest({
                    template: payload,
                    locale: state.storage.locale,
                    params: {}

                })).map(result => changeEditorTool.done({
                    params: action.payload,
                    result: result.tree

                })).catch(e => Observable.of(changeEditorTool.failed({
                    params: action.payload,
                    error: e
                })));

            case 'constructor':
                return Observable.of<Action>(
                    getPageTree.started(null),
                    changeEditorTool.done({
                        params: action.payload,
                        result: null
                    }));

            default:
                return Observable.of(changeEditorTool.done({
                    params: action.payload,
                    result: null
                }));
        }
    });

export default changeEditorToolEpic;