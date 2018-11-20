// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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

import actionCreatorFactory from 'typescript-fsa';
import { TProtypoElement } from 'genesis/protypo';

import { IEditorTabCreateCall, ILoadEditorTabCall, ICreateEditorTabCall, IReloadEditorTabCall, TEditorTab } from 'genesis/editor';

const actionCreator = actionCreatorFactory('editor');

export const editorSave = actionCreator<TEditorTab>('EDITOR_SAVE');
export const createEditorTab = actionCreator.async<ICreateEditorTabCall, IEditorTabCreateCall>('CREATE_EDITOR_TAB');
export const loadEditorTab = actionCreator.async<ILoadEditorTabCall, TEditorTab>('LOAD_EDITOR_TAB');
export const changeEditorTab = actionCreator<number>('CHANGE_EDITOR_TAB');
export const closeEditorTab = actionCreator<number>('CLOSE_EDITOR_TAB');
export const closeAllEditorTab = actionCreator('CLOSE_ALL_EDITOR_TAB');
export const closeSavedEditorTab = actionCreator('CLOSE_SAVED_EDITOR_TAB');
export const updateEditorTab = actionCreator<string>('UPDATE_EDITOR_TAB');
export const revertEditorTab = actionCreator<number>('REVERT_EDITOR_TAB');
export const reloadEditorTab = actionCreator<IReloadEditorTabCall>('RELOAD_EDITOR_TAB');
export const changeEditorTool = actionCreator.async<string, TProtypoElement[]>('CHANGE_EDITOR_TOOL');
export const generatePageTemplate = actionCreator<string>('GENERATE_PAGE_TEMPLATE');
export const debugContract = actionCreator<string>('DEBUG_CONTRACT');
