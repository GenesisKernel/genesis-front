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
import { IRootState } from 'modules';
import { Observable } from 'rxjs';

const copyTagEpic: Epic<Action, IRootState> =
    (action$, store, { findTagById, convertToTreeData, copyObject, resolveTagHandler, getConstructorTemplate, generateId, setIds }) => action$.ofAction(actions.copyTag.started)
        .flatMap(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const tabData = tab && tab.data || null;
            let jsonData = tabData.jsonData && copyObject(tabData.jsonData) || null;

            let tagCopy = copyObject(action.payload.tag);
            // generate new id for inserted tag
            tagCopy.id = generateId();

            if (tagCopy.children) {
                setIds(tagCopy.children, true);
            }
            if (tagCopy.tail) {
                setIds(tagCopy.tail, true);
            }

            if ('string' === typeof action.payload.destinationTagID &&
                'string' === typeof action.payload.position) {
                let tag = findTagById(jsonData, action.payload.destinationTagID);
                // alert(JSON.stringify(tag));
                if (tag.el) {
                    // generate new id for inserted tag
                    // tagCopy.id = generateId();

                    switch (action.payload.position) {
                        case 'inside':
                            if (tag.el.children) {
                                tag.el.children = [];
                            }
                            tag.el.children.push(tagCopy);
                            break;
                        case 'before':
                            if (tag.parent && tag.parent.id && tag.parent.children) {
                                tag.parent.children.splice(tag.parentPosition, 0, tagCopy);
                            }
                            else {
                                jsonData.splice(tag.parentPosition, 0, tagCopy);
                            }
                            break;
                        case 'after':
                            if (tag.parent && tag.parent.id && tag.parent.children) {
                                tag.parent.children.splice(tag.parentPosition + 1, 0, tagCopy);
                            }
                            else {
                                jsonData.splice(tag.parentPosition + 1, 0, tagCopy);
                            }
                            break;
                        default:
                            break;
                    }

                }
                // alert(tag.el.id + ' parent ' + (tag.parent && tag.parent.id || 'root') + " pos " + tag.parentPosition);
            }
            else {
                jsonData = jsonData.concat(
                    tagCopy
                );
            }

            return Observable.of(actions.copyTag.done({
                params: action.payload,
                result: {
                    jsonData,
                    treeData: convertToTreeData(jsonData)
                }
            }));
        });

export default copyTagEpic;