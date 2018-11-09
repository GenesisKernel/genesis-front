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

import React from 'react';
import Protypo from 'containers/Widgets/Protypo';
import { IPage } from 'genesis/content';

import Error from './Error';
import Timeout from './Timeout';
import NotFound from './NotFound';

export interface IPageProps {
    section: string;
    value: IPage;
}

const Page: React.SFC<IPageProps> = (props) => {
    if (props.value.error) {
        switch (props.value.error) {
            case 'E_HEAVYPAGE': return (<Timeout />);
            case 'E_NOTFOUND': return (<NotFound />);
            default: return (<Error error={props.value.error} />);
        }
    }
    else {
        return (
            <div className="fullscreen" style={{ backgroundColor: '#fff' }}>
                <Protypo
                    context="page"
                    section={props.section}
                    page={props.value.name}
                    content={props.value.content}
                />
            </div>
        );
    }
};

export default Page;