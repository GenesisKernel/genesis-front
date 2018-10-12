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
import { sectionsInit } from '../actions';
import { Reducer } from 'modules';
import { TSection } from 'genesis/content';

const sectionsInitDoneHandler: Reducer<typeof sectionsInit.done, State> = (state, payload) => {
    const sections: { [key: string]: TSection } = {};
    payload.result.sections.forEach(section => {
        sections[section.name] = section;
    });

    /*state.systemSections.forEach(section => {
        sections[section.name] = section;
    });*/

    return {
        ...state,
        inited: true,
        mainSection: payload.result.mainSection,
        section: payload.result.section,
        sections
    };
};

export default sectionsInitDoneHandler;