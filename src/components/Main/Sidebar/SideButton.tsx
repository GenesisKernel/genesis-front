// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import styled from 'styled-components';
import sidebarStyle from './style';

const StyledButton = styled.button`
    background-color: rgba(255,255,255,0);
    transition: background-color ease-in-out .15s, color ease-in-out .15s;
    padding: 0;
    margin: 0;
    font-size: 17px;
    outline: none;
    width: 100%;
    height: ${sidebarStyle.collapsedSize}px;
    line-height: ${sidebarStyle.collapsedSize}px;
    color: rgba(255,255,255,0.8);
    text-align: left;
    white-space: nowrap;
    border: 0;

    em {
        border: solid 1px transparent;
        width: ${sidebarStyle.collapsedSize}px;
        height: ${sidebarStyle.collapsedSize}px;
        line-height: ${sidebarStyle.collapsedSize}px;
        text-align: center;
        display: block;
        float: left;
    }

    &:hover {
        background-color: rgba(255,255,255,0.1);
        color: #fff;
    }

    &:active {
        background-color: rgba(255,255,255,0.2);
    }

    &:focus em {
        border: solid 1px transparent;
    }

    &.collapsed {
        max-width: ${sidebarStyle.collapsedSize}px;

        &:focus em {
            border: dashed 1px #2c83c0;        
        }
    }

    .label {
        font-size: 18px;
        font-weight: 200;
    }

    > div {
        position:relative;
        top: 0;
        left: 0;
    }
`;

export interface ISideButtonProps {
    icon: string;
    collapsed: boolean;
    onClick?: () => void;
}

const SideButton: React.SFC<ISideButtonProps> = (props) => (
    <div>
        <StyledButton className={props.collapsed ? 'collapsed' : null} onClick={props.onClick} style={{ maxWidth: props.collapsed ? sidebarStyle.collapsedSize : '100%' }}>
            <div>
                <em className={`icon-${props.icon}`} />
                <div className="label">{props.children}</div>
            </div>
        </StyledButton>
    </div>
);

export default SideButton;