// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
                if (tagTreeNewPosition.parentPosition === 0 || tagTreeNewPosition.parentPosition === null) {
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
                    if (tagTreeNewPosition.parentPosition === 0 || tagTreeNewPosition.parentPosition === null) {
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