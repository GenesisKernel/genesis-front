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
import { IMenu } from 'genesis/content';

import StackGroup from 'components/Animation/StackGroup';
import themed from 'components/Theme/themed';
import Protypo from 'containers/Widgets/Protypo';
import ResizeHandle from 'containers/Main/Navigation/ResizeHandle';
import ScrollView from 'components/ScrollView';

const StyledNavigation = themed.aside`
    position: relative;
    z-index: 10000;
    
    .scrollarea {
        height: 100%;
        
        .scrollbar-container {
            opacity: 0;
        }
    }

    > nav {
        background-attachment: fixed;
        height: 100%;
    }

    .navigation-controls {
        background: ${props => props.theme.headerBackground};
        padding: 0 10px;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
    }
`;

const StyledBackButton = themed.button`
    position: relative;
    display: block;
    width: 100%;
    height: 58px;
    padding: 10px 25px;
    color: ${props => props.theme.menuPrimaryForeground};
    font-weight: 300;
    text-decoration: none;
    outline: none;
    border: none;
    text-align: left;
    background: transparent;
    
    &.disabled {
        &:hover {
            color: ${props => props.theme.menuPrimaryForeground};
        }
    }

    &:hover {
        color: ${props => props.theme.menuPrimaryActive};
    }

    .icon {
        vertical-align: top;
        display: inline-block;
        width: 30px;
    }

    em {
        font-size: 15px;
    }

    span {
        font-size: 21px;
        font-weight: 300;
    }
`;

const StyledMenu = themed.div`
    overflow: hidden;
    position: relative;
    height: 100%;
`;

const StyledMenuContent = themed.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    .title-wrap {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export interface INavigationProps {
    width: number;
    menus: IMenu[];
    section: string;
    menuPop: () => void;
}

// TODO: refactoring
const Navigation: React.SFC<INavigationProps> = props => (
    <StyledNavigation style={{ width: props.width }}>
        <nav>
            <div className="navigation-controls">&lt;&lt;&lt; Collapse</div>
            <StyledMenu>
                <StackGroup
                    items={(props.menus || []).map((menu, index) => (
                        <ScrollView disableHorizontal>
                            <StyledMenuContent>
                                {index > 0 && (
                                    <StyledBackButton onClick={props.menuPop} disabled={1 >= props.menus.length}>
                                        <div className="title-wrap">
                                            <span className="icon">
                                                <em className="icon-arrow-left" />
                                            </span>
                                            <span>{menu.name}</span>
                                        </div>
                                    </StyledBackButton>
                                )}
                                <Protypo
                                    context="menu"
                                    content={menu.content}
                                    section={props.section}
                                    menu={menu.name}
                                />
                            </StyledMenuContent>
                        </ScrollView>
                    ))}
                />
            </StyledMenu>
        </nav>
        <ResizeHandle />
    </StyledNavigation>
);

export default Navigation;