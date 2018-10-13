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

import themed from 'components/Theme/themed';
import SectionButton from './SectionButton';

export interface ISectionsProps {
    section: string;
    values: {
        name: string;
        title: string;
        page: string;
        params?: {
            [name: string]: string;
        }
    }[];
}

const StyledSelector = themed.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 0;

    > li {
        display: inline-block;
        font-size: 16px;
        color: #fff;
        user-select: none;
        margin: 0 12px 0 0;
    }
`;

const Selector: React.SFC<ISectionsProps> = (props) => (
    <StyledSelector>
        {props.values.map(section => (
            <li key={section.name}>
                <SectionButton
                    active={props.section === section.name}
                    section={section.name}
                    page={section.page}
                    params={section.params}
                >
                    {section.title}
                </SectionButton>
            </li>

        ))}
    </StyledSelector>
);

export default Selector;