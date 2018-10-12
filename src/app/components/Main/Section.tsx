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
import { IPage } from 'genesis/content';
import { Link } from 'react-router-dom';

import Page from 'components/Main/Page';
import Stack from 'components/Animation/Stack';

export interface ISectionProps {
    pages: IPage[];
}

const Section: React.SFC<ISectionProps> = (props) => (
    <div className="fullscreen">
        <div style={{ position: 'absolute', bottom: 50, left: 50, zIndex: 10000 }}>
            <Link to="/home/default_page">Navigate</Link>
        </div>
        <div>
            <Stack
                items={(props.pages || []).map(page => (
                    <div key={page.key} style={{ background: '#fff', padding: 15, height: '100%' }}>
                        <Page value={page} />
                    </div>
                ))}
            />
        </div>
    </div>
);

export default Section;