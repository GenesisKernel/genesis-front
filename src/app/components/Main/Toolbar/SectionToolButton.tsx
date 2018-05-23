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

import * as React from 'react';
import styled from 'styled-components';

export interface ISectionToolButtonProps {
    className?: string;
    disabled?: boolean;
    activeIndex: number;
    items: React.ReactNode[];
    onChange?: (index: number) => void;
}

const SectionToolButton: React.SFC<ISectionToolButtonProps> = props => (
    <li className={props.className}>
        <ul className="button-sections">
            {props.items.map((l, i) => (
                <li key={i} className={props.activeIndex === i ? 'active' : null}>
                    <button onClick={props.onChange && props.onChange.bind(null, i)}>
                        {l}
                    </button>
                </li>
            ))}
        </ul>
    </li>
);

const StyledSectionToolButton = styled(SectionToolButton) `
    display: inline-block;
    height: 40px;
    padding: 9px;
    float: right;

    ul.button-sections {
        border: solid 1px #9eb4d0;
        border-radius: 2px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-size: 0;

        li {
            display: inline-block;

            button {
                background: 0;
                outline: 0;
                border: 0;
                border-right: solid 1px #9eb4d0;
                height: 20px;
                font-size: 13px;
                padding: 0 10px;
                color: #194a8a;
            }

            &:last-child button {
                border-right: 0;
            }

            &:hover button {
                background: #e9eef5;
            }

            &.active button {
                background: #9eb4d1;
                color: #fff;
            }
        }
    }
`;

export default StyledSectionToolButton;