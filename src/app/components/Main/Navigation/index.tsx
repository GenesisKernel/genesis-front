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
import styled from 'styled-components';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import StackGroup from 'components/Animation/StackGroup';

import Protypo from 'containers/Widgets/Protypo';
import ResizeHandle from 'containers/Main/Navigation/ResizeHandle';
import { TMenu } from 'genesis/content';
import ScrollArea from 'react-scrollbar';

const StyledNavigation = styled.aside`
    &.navigation-collapsed {
        overflow: hidden;
        width: 0;
    }
    
    .scrollarea {
        height: 100%;
        .scrollbar-container {
            opacity: 0;
        }
    }

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 150;
    background: #fff;
`;

const StyledBackButton = styled.button`
    position: relative;
    display: block;
    width: 100%;
    height: 58px;
    padding: 10px 25px;
    color: #2886ff;
    font-weight: 300;
    text-decoration: none;
    outline: none;
    border: none;
    text-align: left;
    background: transparent;
    
    &.disabled {
        &:hover {
            color: #2886ff;
        }
    }

    &:hover {
        color: #7bb0f5;
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

const StyledMenu = styled.div`
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    top: 80px;
`;

const StyledMenuContent = styled.div`
    background: #fff;
    
    .title-wrap {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export interface INavigationProps {
    preloading: boolean;
    preloadingError: string;
    visible: boolean;
    topOffset: number;
    width: number;
    menus: TMenu[];
    menuPop: () => void;
    ecosystemInit: (nullArg: null) => void;
}

class Navigation extends React.Component<INavigationProps & InjectedIntlProps> {
    render() {
        return (
            <StyledNavigation className={this.props.visible ? '' : 'navigation-collapsed'} style={{ width: this.props.visible ? this.props.width : 0 }}>
                <nav>
                    <StyledMenu style={{ top: this.props.topOffset }}>
                        <StackGroup
                            items={this.props.menus.map((menu, index) => (
                                <ScrollArea
                                       horizontal={false}
                                       speed={0.2}
                                >
                                    <StyledMenuContent>
                                        <StyledBackButton onClick={() => this.props.menuPop()} disabled={1 >= this.props.menus.length} className={index === 0 ? 'disabled' : ''}>
                                            <div className="title-wrap">
                                                {index > 0 && (
                                                    <span className="icon">
                                                        <em className="icon-arrow-left" />
                                                    </span>
                                                )}
                                                <span>{menu.name}</span>
                                            </div>
                                        </StyledBackButton>
                                        <Protypo
                                            context="menu"
                                            content={menu.content}
                                        />
                                    </StyledMenuContent>
                                </ScrollArea>
                            ))}
                        />
                    </StyledMenu>
                </nav>
                <ResizeHandle />
            </StyledNavigation>
        );
    }
}

export default injectIntl(Navigation);