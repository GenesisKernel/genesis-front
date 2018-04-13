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
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import { generatePageTemplate, updateEditorTab, setPageTemplate } from '../actions';

const generatePageTemplateEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(generatePageTemplate)
        .flatMap(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const jsonData = tab && tab.data && tab.data.jsonData;
            const codeGenerator = new constructorModule.CodeGenerator(jsonData);
            const pageTemplate = codeGenerator.render();

            return Observable.concat([
                updateEditorTab(pageTemplate),
                setPageTemplate(pageTemplate),
            ]);
        });

export default generatePageTemplateEpic;