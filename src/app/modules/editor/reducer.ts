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
import selectTagHandler from './reducers/selectTagHandler';
import changePageDoneHandler from './reducers/changePageDoneHandler';
import addTagDoneHandler from './reducers/addTagDoneHandler';
import saveConstructorHistoryDoneHandler from './reducers/saveConstructorHistoryDoneHandler';
import setTagCanDropPositionDoneHandler from './reducers/setTagCanDropPositionDoneHandler';
import constructorUndoDoneHandler from './reducers/constructorUndoDoneHandler';
import constructorRedoDoneHandler from './reducers/constructorRedoDoneHandler';

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
    .case(actions.selectTag, selectTagHandler)
    .case(actions.changePage.done, changePageDoneHandler)
    .case(actions.addTag.done, addTagDoneHandler)
    .case(actions.saveConstructorHistory.done, saveConstructorHistoryDoneHandler)
    .case(actions.constructorUndo.done, constructorUndoDoneHandler)
    .case(actions.constructorRedo.done, constructorRedoDoneHandler)
    .case(actions.setTagCanDropPosition.done, setTagCanDropPositionDoneHandler);