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
import { renderPage } from '../actions';
import { Reducer } from 'modules';
import upsertSectionPage from '../util/upsertSectionPage';
import upsertSectionBreadcrumb from '../util/upsertSectionBreadcrumb';

const renderPageHandler: Reducer<typeof renderPage.started, State> = (state, payload): State => ({
    ...state,
    sections: {
        ...state.sections,
        [payload.section]: {
            ...upsertSectionPage(state.sections[payload.section], {
                name: payload.name,
                status: 'PENDING',
                params: payload.params,
                location: payload.location
            }),
            breadcrumbs: upsertSectionBreadcrumb(
                state.sections[payload.section],
                {
                    caller: payload.location.state && payload.location.state.from && payload.location.state.from.name,
                    type: payload.location.state && payload.location.state.from && payload.location.state.from.type,
                    section: payload.section,
                    page: payload.name,
                    params: payload.params
                }
            )
        }
    }
});

export default renderPageHandler;