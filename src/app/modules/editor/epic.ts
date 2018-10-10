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

import { combineEpics } from 'redux-observable';
import newContractEpic from './epics/newContractEpic';
import editorSaveEpic from './epics/editorSaveEpic';
import newPageEpic from './epics/newPageEpic';
import editEntityEpic from './epics/editEntityEpic';
import newMenuEpic from './epics/newMenuEpic';
import newBlockEpic from './epics/newBlockEpic';
import closeEditorTabEpic from './epics/closeEditorTabEpic';
import createEditorTabEpic from './epics/createEditorTabEpic';
import changeEditorToolEpic from './epics/changeEditorToolEpic';
import loadEditorTabEpic from './epics/loadEditorTabEpic';
import generatePageTemplateEpic from './epics/generatePageTemplateEpic';
import getPageTreeEpic from './epics/getPageTreeEpic';
import getPageTreeDoneEpic from './epics/getPageTreeDoneEpic';
import changePageEpic from './epics/changePageEpic';
import selectTagEpic from './epics/selectTagEpic';
import addTagEpic from './epics/addTagEpic';
import moveTagEpic from './epics/moveTagEpic';
import copyTagEpic from './epics/copyTagEpic';
import removeTagEpic from './epics/removeTagEpic';
import moveTreeTagEpic from './epics/moveTreeTagEpic';
import saveConstructorHistoryEpic from './epics/saveConstructorHistoryEpic';
import constructorUndoEpic from './epics/constructorUndoEpic';
import constructorRedoEpic from './epics/constructorRedoEpic';
import setTagCanDropPositionEpic from './epics/setTagCanDropPositionEpic';
import debugContractEpic from './epics/debugContractEpic';

export default combineEpics(
    changeEditorToolEpic,
    closeEditorTabEpic,
    createEditorTabEpic,
    editEntityEpic,
    editorSaveEpic,
    loadEditorTabEpic,
    newBlockEpic,
    newContractEpic,
    newMenuEpic,
    newPageEpic,
    generatePageTemplateEpic,
    getPageTreeEpic,
    getPageTreeDoneEpic,
    changePageEpic,
    selectTagEpic,
    addTagEpic,
    moveTagEpic,
    copyTagEpic,
    removeTagEpic,
    moveTreeTagEpic,
    saveConstructorHistoryEpic,
    constructorUndoEpic,
    constructorRedoEpic,
    setTagCanDropPositionEpic,
    debugContractEpic
);