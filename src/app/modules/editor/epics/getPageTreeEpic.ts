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
import * as actions from '../actions';
import api, { IAPIError } from 'lib/api';
import { IRootState } from 'modules';
import { Observable } from 'rxjs';

const getPageTreeEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.getPageTree.started)
        .flatMap(action => {
            const state = store.getState();

            const template = state.editor.tabs[state.editor.tabIndex].value;

            return Observable.fromPromise(api.contentJson(state.auth.sessionToken, template, state.storage.locale, true))
                .map(payload => {
                    let pageTree = payload.tree;
                    constructorModule.setIds(pageTree);

                    return actions.getPageTree.done({
                        params: action.payload,
                        result: {
                            jsonData: pageTree,
                            treeData: constructorModule.convertToTreeData(pageTree)
                        }
                    });
                })
                .catch((e: IAPIError) =>
                    Observable.of(actions.getPageTree.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export default getPageTreeEpic;