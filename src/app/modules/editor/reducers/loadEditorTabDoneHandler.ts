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

import { State } from '../reducer';
import { loadEditorTab } from '../actions';
import { Reducer } from 'modules';
import findTabIndex from './findTabIndex';

const loadEditorTabDoneHandler: Reducer<typeof loadEditorTab.done, State> = (state, payload) => {
    const tabIndex = findTabIndex(state, payload.result);

    const tabs = -1 === tabIndex ?
        [
            ...state.tabs,
            {
                ...payload.result
            }
        ] : [
            ...state.tabs.slice(0, tabIndex),
            {
                ...state.tabs[tabIndex],
                initialValue: payload.result.initialValue,
                dirty: payload.result.initialValue !== state.tabs[tabIndex].value
            },
            ...state.tabs.slice(tabIndex + 1)
        ];

    return {
        ...state,
        tabIndex: -1 === tabIndex ? tabs.length - 1 : tabIndex,
        tabs
    };
};

export default loadEditorTabDoneHandler;