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

import { combineEpics } from 'redux-observable';
import editContractEpic from './epics/editContractEpic';
import newContractEpic from './epics/newContractEpic';
import editPageEpic from './epics/editPageEpic';
import editorSaveEpic from './epics/editorSaveEpic';
import newPageEpic from './epics/newPageEpic';
import editMenuEpic from './epics/editMenuEpic';
import editBlockEpic from './epics/editBlockEpic';
import newMenuEpic from './epics/newMenuEpic';
import newBlockEpic from './epics/newBlockEpic';
import closeEditorTabEpic from './epics/closeEditorTabEpic';
import createEditorTabEpic from './epics/createEditorTabEpic';
import changeEditorToolEpic from './epics/changeEditorToolEpic';
import loadEditorTabEpic from './epics/loadEditorTabEpic';
import generatePageTemplateEpic from './epics/generatePageTemplateEpic';
import getPageTreeEpic from './epics/getPageTreeEpic';

export default combineEpics(
    changeEditorToolEpic,
    closeEditorTabEpic,
    createEditorTabEpic,
    editBlockEpic,
    editContractEpic,
    editMenuEpic,
    editorSaveEpic,
    editPageEpic,
    loadEditorTabEpic,
    newBlockEpic,
    newContractEpic,
    newMenuEpic,
    newPageEpic,
    generatePageTemplateEpic,
    getPageTreeEpic
);