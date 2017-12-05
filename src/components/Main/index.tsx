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
import * as classnames from 'classnames';
import ReduxToastr from 'react-redux-toastr';
import { setCollapsed } from 'modules/engine/actions';
import { menuPop, menuPush } from 'modules/content/actions';
import { OrderedMap } from 'immutable';
import styled from 'styled-components';

import { IProtypoElement } from 'components/Protypo/Protypo';
import Sidebar, { style as sidebarStyle } from 'components/Main/Sidebar';
import Header from 'components/Main/Header';

const StyledWrapper = styled.div`
    background: #f5f7fa;
`;

const StyledContent = styled.section`
    margin-left: ${props => props.style.marginLeft || 0}px;
    transition: margin-left ${props => props.style.transition};
`;

export interface IMainProps {
    session: string;
    isCollapsed: boolean;
    isEcosystemOwner: boolean;
    pending: boolean;
    stylesheet: string;
    menus: { name: string, content: IProtypoElement[], vde: boolean }[];
    pendingTransactions: OrderedMap<string, { uuid: string, block: string, error: string, contract: string }>;
    transactionsCount: number;
    menuPop: typeof menuPop;
    menuPush: typeof menuPush;
    setCollapsed: typeof setCollapsed;
}

export default class Main extends React.Component<IMainProps> {
    onSidebarToggle(e: React.MouseEvent<HTMLLinkElement>) {
        e.preventDefault();
        this.props.setCollapsed(!this.props.isCollapsed);
        return false;
    }

    render() {
        const classes = classnames({
            'wrapper': true,
            'component-main': true,
            'aside-collapsed': this.props.isCollapsed
        });
        return (
            <StyledWrapper className={classes}>
                <style type="text/css">
                    {this.props.stylesheet}
                </style>
                <Sidebar
                    isEcosystemOwner={this.props.isEcosystemOwner}
                    menus={this.props.menus}
                    collapsed={this.props.isCollapsed}
                    menuPop={this.props.menuPop.bind(this)}
                    menuPush={this.props.menuPush.bind(this)}
                />
                <StyledContent style={{ marginLeft: this.props.isCollapsed ? 0 : sidebarStyle.sidebarWidth, transition: sidebarStyle.collapseTransition }}>
                    <Header
                        toggleCollapsed={this.onSidebarToggle.bind(this)}
                        leftOffset={this.props.isCollapsed ? 0 : sidebarStyle.sidebarWidth}
                        collapseTransition={sidebarStyle.collapseTransition}
                        pendingTransactions={this.props.pendingTransactions}
                        transactionsCount={this.props.transactionsCount}
                    />
                    <ReduxToastr
                        timeOut={3000}
                        newestOnTop
                        position="top-center"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                    />
                    {this.props.children}
                </StyledContent>
            </StyledWrapper>
        );
    }
}