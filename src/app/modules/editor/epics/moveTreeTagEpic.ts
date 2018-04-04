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

const moveTreeTagEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.moveTreeTag)
        .map(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const tabData = tab && tab.data || null;
            let jsonData = tabData.jsonData && constructorModule.copyObject(tabData.jsonData) || null;

            let movedTag = constructorModule.copyObject(constructorModule.findTagById(jsonData, action.payload.tagID));
            let tagTreeNewPosition = constructorModule.copyObject(constructorModule.findTagById(action.payload.treeData, action.payload.tagID));

            let destinationTagID = null;
            let position = 'inside';

            if (tagTreeNewPosition.parent === null) {
                if (tagTreeNewPosition.parentPosition === 0) {
                    position = 'before';
                    destinationTagID = jsonData[0].id;
                }
                else {
                    position = 'after';
                    if (jsonData[tagTreeNewPosition.parentPosition]) {
                        destinationTagID = jsonData[tagTreeNewPosition.parentPosition].id;
                    }
                    else {
                        destinationTagID = jsonData[tagTreeNewPosition.parentPosition - 1].id;
                    }
                }
            }
            else {
                if (tagTreeNewPosition.parent.children.length === 1) {
                    position = 'inside';
                    destinationTagID = tagTreeNewPosition.parent.id;
                }
                else {
                    if (tagTreeNewPosition.parentPosition === 0) {
                        destinationTagID = tagTreeNewPosition.parent.children[1].id;
                        position = 'before';
                    }
                    else {
                        position = 'after';
                        const el = tagTreeNewPosition.parent.children[tagTreeNewPosition.parentPosition - 1];
                        if (el) {
                            destinationTagID = el.id;
                        }
                    }
                }
            }

            return actions.moveTag.started({
                tag: movedTag.el,
                destinationTagID,
                position
            });
        });

export default moveTreeTagEpic;