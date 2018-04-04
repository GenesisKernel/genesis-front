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

const changePageEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.changePage.started)
        .map(action => {
            const state = store.getState().editor;
            const tabData = state.tabs[state.tabIndex].designer.data;
            const jsonData = tabData && constructorModule.copyObject(tabData.jsonData) || null;
            let selectedTag = tabData && tabData.selectedTag || null;

            let tag = constructorModule.findTagById(jsonData, action.payload.tagID).el;
            if (tag) {
                if (typeof (action.payload.text) !== 'undefined') {
                    // todo: parse contentEditable tags and create children array

                    const regex = /(<[^\/>]+>[^<]*<\/[^>]+>)/ig; // remove tags
                    let plainText = action.payload.text.replace(regex, '');
                    const regexTags = /(<[^>]+>)/ig;    // remove empty tags
                    plainText = plainText.replace(regexTags, '');

                    if (tag.children && tag.children.length) {
                        for (let i = 0; i < tag.children.length; i++) {
                            if (tag.children[i].tag === 'text') {
                                tag.children[i].text = plainText;
                                break;
                            }
                        }
                    }
                }

                if (!tag.attr) {
                    tag.attr = {};
                }

                if ('string' === typeof action.payload.width) {
                    tag.attr.width = action.payload.width;
                }

                if ('string' === typeof action.payload.ratio) {
                    tag.attr.ratio = action.payload.ratio;
                }

                if ('string' === typeof action.payload.name) {
                    tag.attr.name = action.payload.name;
                }

                if ('string' === typeof action.payload.source) {
                    tag.attr.source = action.payload.source;
                }

                if ('string' === typeof action.payload.condition) {
                    tag.attr.condition = action.payload.condition;
                }

                if ('string' === typeof action.payload.class) {
                    tag.attr.class = action.payload.class || '';
                }

                let properties = new constructorModule.Properties();

                if ('string' === typeof action.payload.align) {
                    tag.attr.class = properties.updateClassList(tag.attr.class || '', 'align', action.payload.align);
                }

                if ('string' === typeof action.payload.transform) {
                    tag.attr.class = properties.updateClassList(tag.attr.class || '', 'transform', action.payload.transform);
                }

                if ('string' === typeof action.payload.wrap) {
                    tag.attr.class = properties.updateClassList(tag.attr.class || '', 'wrap', action.payload.wrap);
                }

                if ('string' === typeof action.payload.color) {
                    tag.attr.class = properties.updateClassList(tag.attr.class || '', 'color', action.payload.color);
                }

                if ('string' === typeof action.payload.btn) {
                    tag.attr.class = properties.updateClassList(tag.attr.class || '', 'btn', action.payload.btn);
                }
            }

            if (selectedTag && tag && selectedTag.id === tag.id) {
                selectedTag = constructorModule.copyObject(tag);
            }

            return actions.changePage.done({
                params: action.payload,
                result: {
                    jsonData,
                    treeData: constructorModule.convertToTreeData(jsonData),
                    selectedTag
                }
            });

        });

export default changePageEpic;