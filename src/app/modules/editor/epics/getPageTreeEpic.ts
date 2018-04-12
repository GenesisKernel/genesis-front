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
import { getPageTree } from '../actions';
import { Observable } from 'rxjs/Observable';

const getPageTreeEpic: Epic = (action$, store, { constructorModule, api }) => action$.ofAction(getPageTree.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost, state.auth.sessionToken);

        const template = state.editor.tabs[state.editor.tabIndex].value;

        return Observable.fromPromise(client.contentJson({
            template,
            locale: state.storage.locale,
            source: true

        })).map(payload => {
            let jsonData = payload.tree;
            constructorModule.setIds(jsonData);

            jsonData = constructorModule.updateChildrenText(jsonData);

            return getPageTree.done({
                params: action.payload,
                result: {
                    jsonData,
                    treeData: constructorModule.convertToTreeData(jsonData)
                }
            });

        }).catch(e => Observable.of(getPageTree.failed({
            params: action.payload,
            error: e.error
        })));
    });

export default getPageTreeEpic;