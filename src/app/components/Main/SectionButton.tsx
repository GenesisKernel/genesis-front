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

import * as React from 'react';
import * as classNames from 'classnames';
import styled from 'styled-components';
import imgClose from 'images/close.svg';

const StyledSectionButton = styled.button`
    position: relative;
    border-radius: 0;
    padding: 0 20px;
    margin: 0;
    outline: 0;
    border: 0;
    background: 0;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    transition: background .15s;

    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &.active {
        background: #f3f3f3;
        color: #292416;
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