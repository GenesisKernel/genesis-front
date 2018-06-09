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

import * as actions from './actions';
import { TEditorTab } from 'genesis/editor';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import changeEditorToolDoneHandler from './reducers/changeEditorToolDoneHandler';
import changeEditorTabHandler from './reducers/changeEditorTabHandler';
import changeEditorToolStartedHandler from './reducers/changeEditorToolStartedHandler';
import closeEditorTabHandler from './reducers/closeEditorTabHandler';
import createEditorTabDoneHandler from './reducers/createEditorTabDoneHandler';
import reloadEditorTabHandler from './reducers/reloadEditorTabHandler';
import revertEditorTabHandler from './reducers/revertEditorTabHandler';
import updateEditorTabHandler from './reducers/updateEditorTabHandler';
import loadEditorTabDoneHandler from './reducers/loadEditorTabDoneHandler';
import getPageTreeDoneHandler from './reducers/getPageTreeDoneHandler';
import getPageTreeFailedHandler from './reducers/getPageTreeFailedHandler';
import selectTagDoneHandler from './reducers/selectTagDoneHandler';
import changePageDoneHandler from './reducers/changePageDoneHandler';
import addTagDoneHandler from './reducers/addTagDoneHandler';
import moveTagDoneHandler from './reducers/moveTagDoneHandler';
import copyTagDoneHandler from './reducers/copyTagDoneHandler';
import removeTagDoneHandler from './reducers/removeTagDoneHandler';
import saveConstructorHistoryDoneHandler from './reducers/saveConstructorHistoryDoneHandler';
import setTagCanDropPositionDoneHandler from './reducers/setTagCanDropPositionDoneHandler';
import constructorUndoDoneHandler from './reducers/constructorUndoDoneHandler';
import constructorRedoDoneHandler from './reducers/constructorRedoDoneHandler';
import setPageTemplateHandler from './reducers/setPageTemplateHandler';

export type State = {
    readonly pending: boolean;
    readonly tabIndex: number;
    readonly tabs: TEditorTab[];
};

export const initialState: State = {
    pending: false,
    tabIndex: 0,
    tabs: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.changeEditorTab, changeEditorTabHandler)
    .case(actions.changeEditorTool.done, changeEditorToolDoneHandler)
    .case(actions.changeEditorTool.started, changeEditorToolStartedHandler)
    .case(actions.closeEditorTab, closeEditorTabHandler)
    .case(actions.createEditorTab.done, createEditorTabDoneHandler)
    .case(actions.loadEditorTab.done, loadEditorTabDoneHandler)
    .case(actions.reloadEditorTab, reloadEditorTabHandler)
    .case(actions.revertEditorTab, revertEditorTabHandler)
    .case(actions.updateEditorTab, updateEditorTabHandler)
    .case(actions.getPageTree.done, getPageTreeDoneHandler)
    .case(actions.getPageTree.failed, getPageTreeFailedHandler)
    .case(actions.selectTag.done, selectTagDoneHandler)
    .case(actions.changePage.done, changePageDoneHandler)
    .case(actions.addTag.done, addTagDoneHandler)
    .case(actions.moveTag.done, moveTagDoneHandler)
    .case(actions.copyTag.done, copyTagDoneHandler)
    .case(actions.removeTag.done, removeTagDoneHandler)
    .case(actions.saveConstructorHistory.done, saveConstructorHistoryDoneHandler)
    .case(actions.constructorUndo.done, constructorUndoDoneHandler)
    .case(actions.constructorRedo.done, constructorRedoDoneHandler)
    .case(actions.setTagCanDropPosition.done, setTagCanDropPositionDoneHandler)
    .case(actions.setPageTemplate, setPageTemplateHandler);