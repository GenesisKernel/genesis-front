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
import backDarkImg from 'images/backDark.png';

import themed from 'components/Theme/themed';
import SideButton from './SideButton';

const StyledSidebar = themed.div`
    background: url(${backDarkImg});
    background-attachment: fixed;
    width: ${props => props.theme.menuWidth}px;
    height: 100%;
    position: relative;

    .sidebar-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    &.sidebar-active {
        width: 150px;
    }
`;

export interface ISidebarProps {
    collapsed?: boolean;
    onCollapseToggle: () => void;
}

const Sidebar: React.SFC<ISidebarProps> = props => (
    <StyledSidebar>
        <SideButton>
            <em className="icon-menu" />
        </SideButton>
        <SideButton active>
            <em className="icon-compass" />
        </SideButton>
        <SideButton>
            <em className="icon-flag" />
        </SideButton>
        <div className="sidebar-bottom">
            <SideButton>
                <em className="icon-user" />
            </SideButton>
        </div>
    </StyledSidebar>
);

export default Sidebar;