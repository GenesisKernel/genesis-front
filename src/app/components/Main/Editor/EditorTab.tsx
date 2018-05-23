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
import classNames from 'classnames';
import styled from 'styled-components';
import imgClose from 'images/close.svg';
import { FormattedMessage } from 'react-intl';
import { TEditorTab } from 'genesis/editor';

export interface IEditorTabProps extends TEditorTab {
    icon: string;
    active?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

const EditorTab: React.SFC<IEditorTabProps> = props => {
    const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (props.onClose) {
            props.onClose(e);
        }
    };

    const onMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Catch middle mouse button to close the tab
        if (1 === e.button) {
            props.onClose(e);
        }
    };

    return (
        <li className={classNames(props.className, { active: props.active, emphasis: props.dirty })}>
            <button onClick={props.onClick} onMouseUp={onMouseUp}>
                <div className="icon">
                    <img className="icon" src={props.icon} />
                </div>
                <div className="tab-label">
                    {props.name ?
                        (
                            <span>{props.name}</span>
                        ) : (
                            <FormattedMessage id="editor.untitled" defaultMessage="Untitled-{id}" values={{ id: props.id }} />
                        )
                    }
                </div>
                <div className="tab-badge" />
                <div className="tab-close" onClick={onClose}>
                    <img src={imgClose} />
                </div>
            </button>
        </li>
    );
};

const StyledEditorTab = styled(EditorTab) `
    position: relative;
    background: #ddd;
    color: #7a899c;
    display: inline-block;
    margin-right: 1px;
    text-align: left;
    min-width: 80px;

    &.active, &.active:hover {
        background: #fff;
        color: #4970a2;

        .tab-label {
            color: #4970a2;
        }

        .tab-close {
            display: block;
        }

        .tab-badge {
            display: none;
        }
    }

    &.emphasis {
        .tab-label {
            font-style: italic;
        }

        .tab-badge {
            background: #ff8700;
        }
    }

    &:hover {
        background: #eee;

        .tab-close {
            display: block;
        }

        .tab-badge {
            display: none;
        }
    }

    button {
        padding: 0 26px 0 40px;
        border: none;
        background: 0;
        outline: 0;
        cursor: pointer;
        height: 35px;
        line-height: 25px;

        .icon {
            position: absolute;
            top: 3px;
            left: 5px;
            width: 24px;
            height: 24px;
            margin-right: 5px;
        }

        .tab-badge {
            position: absolute;
            top: 14px;
            right: 11px;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            z-index: 5;
        }

        .tab-close {
            position: absolute;
            top: 10px;
            right: 7px;
            width: 16px;
            height: 16px;
            padding: 3px;
            text-align: center;
            line-height: 6px;
            font-weight: bold;
            font-size: 16px;
            color: #666;
            z-index: 10;
            display: none;
            opacity: 0.5;
            transition: opacity .17s ease-in-out;

            &:hover {
                opacity: 1;
            }

            > img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .tab-label {
            color: #a2aab3;
            max-width: 105px;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
            white-space: nowrap;
        }
    }
`;

export default StyledEditorTab;