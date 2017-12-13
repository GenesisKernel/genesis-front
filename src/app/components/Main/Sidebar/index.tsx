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
import backImg from 'images/back.png';
import sidebarStyle from './style';

import SideButton from './SideButton';

const StyledSidebar = styled.div`
    background: url(${backImg}) -650px no-repeat;
    position: fixed;
    z-index: 10000;
    height: 1px;
    min-height: 100%;
    font-size: 0;
    transition: width .2s;
    overflow: hidden;
    
    &.collapsed {
        width: ${sidebarStyle.collapsedSize}px;
    }
`;

const StyledBottomButtons = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export interface ISidebarProps {
    collapsed: boolean;
    navigationWidth: number;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.SFC<ISidebarProps> = (props) => (
    <StyledSidebar className={props.collapsed ? 'collapsed' : ''} style={{ width: props.collapsed ? sidebarStyle.collapsedSize : props.navigationWidth }}>
        <SideButton icon="menu" collapsed={props.collapsed} onClick={props.setCollapsed.bind(null, !props.collapsed)} />
        <SideButton icon="user" collapsed={props.collapsed}>Accounts</SideButton>
        <SideButton icon="bubble" collapsed={props.collapsed}>Notifications</SideButton>
        <SideButton icon="hourglass" collapsed={props.collapsed}>Transactions</SideButton>
        <StyledBottomButtons>
            <SideButton icon="settings" collapsed={props.collapsed} />
            <SideButton icon="logout" collapsed={props.collapsed} />
        </StyledBottomButtons>
    </StyledSidebar>
);

export default Sidebar;