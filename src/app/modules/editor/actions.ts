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

import actionCreatorFactory from 'typescript-fsa';
import { TProtypoElement } from 'genesis/protypo';

import { IEditorTabCreateCall, ILoadEditorTabCall, ICreateEditorTabCall, IReloadEditorTabCall, TEditorTab, IChangePageCall, IChangePageResult, ISaveConstructorHistoryResult,
    IConstructorUndoRedoResult, ISetTagCanDropPositionCall, ISetTagCanDropPositionResult, IAddTagCall, IOperateTagCall, IOperateTagResult, IMoveTreeTag, ISelectTagResult,
    TConstructorTreeElement
} from 'genesis/editor';

const actionCreator = actionCreatorFactory('editor');

export const editorSave = actionCreator<TEditorTab>('EDITOR_SAVE');
export const createEditorTab = actionCreator.async<ICreateEditorTabCall, IEditorTabCreateCall>('CREATE_EDITOR_TAB');
export const loadEditorTab = actionCreator.async<ILoadEditorTabCall, TEditorTab>('LOAD_EDITOR_TAB');
export const changeEditorTab = actionCreator<number>('CHANGE_EDITOR_TAB');
export const closeEditorTab = actionCreator<number>('CLOSE_EDITOR_TAB');
export const updateEditorTab = actionCreator<string>('UPDATE_EDITOR_TAB');
export const revertEditorTab = actionCreator<number>('REVERT_EDITOR_TAB');
export const reloadEditorTab = actionCreator<IReloadEditorTabCall>('RELOAD_EDITOR_TAB');
export const changeEditorTool = actionCreator.async<string, TProtypoElement[]>('CHANGE_EDITOR_TOOL');

// TODO: Pending refactoring
export const setPageTemplate = actionCreator<string>('SET_PAGE_TEMPLATE');
export const getPageTree = actionCreator.async<void, { name?: string, jsonData: TProtypoElement[], treeData?: TConstructorTreeElement[], error?: string }, string>('GET_PAGE_TREE');
export const changePage = actionCreator.async<IChangePageCall, IChangePageResult>('CHANGE_PAGE');
export const selectTag = actionCreator.async<TProtypoElement, ISelectTagResult>('SELECT_TAG');
export const setTagCanDropPosition = actionCreator.async<ISetTagCanDropPositionCall, ISetTagCanDropPositionResult>('SET_TAG_CAN_DROP_POSITION');
export const addTag = actionCreator.async<IAddTagCall, IOperateTagResult>('ADD_TAG');
export const copyTag = actionCreator.async<IOperateTagCall, IOperateTagResult>('COPY_TAG');
export const moveTag = actionCreator.async<IOperateTagCall, IOperateTagResult>('MOVE_TAG');
export const removeTag = actionCreator.async<IOperateTagCall, IOperateTagResult>('REMOVE_TAG');
export const moveTreeTag = actionCreator<IMoveTreeTag>('MOVE_TREE_TAG');
export const saveConstructorHistory = actionCreator.async<void, ISaveConstructorHistoryResult>('SAVE_CONSTRUCTOR_HISTORY');
export const constructorUndo = actionCreator.async<void, IConstructorUndoRedoResult>('CONSTRUCTOR_UNDO');
export const constructorRedo = actionCreator.async<void, IConstructorUndoRedoResult>('CONSTRUCTOR_REDO');
export const generatePageTemplate = actionCreator<string>('GENERATE_PAGE_TEMPLATE');

export const editorActions = {
    changePage, setTagCanDropPosition, addTag, moveTag, copyTag, removeTag, selectTag
};