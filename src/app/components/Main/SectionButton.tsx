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

import * as React from 'react';
import * as classNames from 'classnames';
import imgClose from 'images/close.svg';

import themed from 'components/Theme/themed';

const StyledSectionButton = themed.button`
    position: relative;
    border-radius: 0;
    padding: 0 20px;
    margin: 0;
    outline: 0;
    border: 0;
    background: 0;
    color: ${props => props.theme.headerForeground};
    font-size: 16px;
    font-weight: 300;
    transition: background .15s;

    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &.active {
        background: ${props => props.theme.headerBackgroundActive};
        color: ${props => props.theme.headerForegroundActive};
    }

    &.closeable {
        padding-right: 0;
    }

    .section-close {
        padding: 0 10px 0 8px;
        width: 0;
        font-size: 15px;
        opacity: 0.5;
        transition: opacity ease-in-out .17s;
        font-weight: bold;

        &:hover {
            opacity: 1;
        }
    }
`;

export interface ISectionButtonProps {
    active?: boolean;
    closeable?: boolean;
    onClick?: () => void;
    onClose?: () => void;
}

const SectionButton: React.SFC<ISectionButtonProps> = props => {
    const onClose = props.closeable ? (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        props.onClose();
    } : null;

    return (
        <StyledSectionButton onClick={props.onClick} className={classNames({ active: props.active, closeable: props.closeable })}>
            {props.children}
            {props.closeable && (
                <span className="section-close" onClick={onClose}>
                    <img src={imgClose} />
                </span>
            )}
        </StyledSectionButton>
    );
};

export default SectionButton;