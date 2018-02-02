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
import ReduxToastr from 'react-redux-toastr';
import LoadingBar from 'react-redux-loading-bar';
import { OrderedMap } from 'immutable';
import styled from 'styled-components';
import platform from 'lib/platform';
import { history } from 'store';
import url from 'url';

import Titlebar from './Titlebar';
import UserMenu from 'containers/Widgets/UserMenu';
import Navigation from 'containers/Main/Navigation';
import { apiUrl } from 'lib/api';
import NotificationsMenu from 'containers/Widgets/NotificationsMenu';
import { TSection } from 'genesis/content';
import * as _ from 'lodash';
// import TransactionsMenu from './TransactionsMenu';

export const styles = {
    headerHeight: platform.select({ desktop: 28, web: 0 }),
    menuHeight: 40,
    toolbarHeight: 40,
    mainColor: '#4c7dbd'
};

const StyledWrapper = styled.div`
    background-color: #f6f8fa;
`;

export interface IMainProps {
    session: string;
    isAuthorized: boolean;
    isEcosystemOwner: boolean;
    pending: boolean;
    section: string;
    sections: { [name: string]: TSection };
    stylesheet: string;
    navigationSize: number;
    navigationVisible: boolean;
    pendingTransactions: OrderedMap<string, { uuid: string, block: string, error?: { type: string, error: string }, contract: string }>;
    transactionsCount: number;
    onRefresh: () => void;
    onNavigateHome: () => void;
    onNavigationToggle: () => void;
    onSwitchSection: (section: string) => void;
}

const StyledControls = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
`;

const StyledTitlebar = styled.div`
    background: ${styles.mainColor};
    height: ${styles.headerHeight}px;
    line-height: ${styles.headerHeight}px;
    font-size: 15px;
    color: #fff;
    text-align: center;
`;

const StyledMenu = styled.ul`
    background: ${styles.mainColor};
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: ${styles.menuHeight}px;
    position: relative;

    > li {
        margin-top: 6px;
        height: 34px;
        line-height: 34px;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        -webkit-app-region: no-drag;
        user-select: none;

        &.user-menu {
            margin-top: 0;
            height: ${styles.menuHeight}px;
            line-height: normal;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }

        button {
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
        }

        &.active {
            > button {
                background: #eeeeee;
                color: #000;
            }
        }
    }
`;

const StyledContent = styled.section`
    margin-top: ${styles.headerHeight + styles.menuHeight + styles.toolbarHeight}px !important;
    transition: none !important;
`;

const StyledLoadingBar = styled(LoadingBar) `
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
`;

const MenuItem: React.SFC<{ active?: boolean, onClick?: () => void }> = props => (
    <li className={props.active ? 'active' : ''}>
        <button onClick={props.onClick}>
            {props.children}
        </button>
    </li>
);

const StyledToolbar = styled.ul`
    background: #eeeeee;
    height: ${styles.toolbarHeight}px;
    border-bottom: solid 2px #e5e5e5;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 0;

    > li {
        display: inline-block;
        vertical-align: top;

        &.separator {
            width: 2px;
            height: 40px;
            background: #e5e5e5;
        }

        > button {
            text-align: center;
            border-radius: 0;
            min-width: 30px;
            height: 30px;
            outline: 0;
            border: 0;
            background: 0;
            margin: 5px;
            padding: 0;
            color: #757e8a;
            font-size: 14px;
            font-weight: 300;
            line-height: 30px;
            transition: background .15s;

            > span {
                margin-left: 10px;
            }

            &:hover {
                background: rgba(0,0,0,0.03);
            }
        }
    }
`;

const ToolButton: React.SFC<{ icon: string, right?: boolean, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }> = props => (
    <li style={{ float: props.right ? 'right' : null }}>
        <button onClick={props.onClick}>
            <em className={`icon ${props.icon}`} />
            {props.children && (<span>{props.children}</span>)}
        </button>
    </li>
);

/*const ToolSeparator: React.SFC = props => (
    <li className="separator">
        <div />
    </li>
);*/

class Main extends React.Component<IMainProps> {
    onBack() {
        history.goBack();
    }

    onForward() {
        history.goForward();
    }

    render() {
        const apiUrlTokens = url.parse(apiUrl);
        const appTitle = `Genesis (${apiUrlTokens.protocol}//${apiUrlTokens.host})`;

        return (
            <StyledWrapper className="wrapper component-main">
                <style type="text/css">
                    {this.props.stylesheet}
                </style>
                <StyledControls>
                    <StyledTitlebar className="drag">
                        <Titlebar>{appTitle}</Titlebar>
                    </StyledTitlebar>
                    <StyledMenu className="drag">
                        <MenuItem onClick={this.props.onNavigationToggle}>
                            <em className="icon-menu" />
                        </MenuItem>
                        {_.map(this.props.sections, l => l.visible ? (
                            <MenuItem
                                key={l.name}
                                active={this.props.section === l.name}
                                onClick={this.props.onSwitchSection.bind(this, l.name)}
                            >
                                {l.title}
                            </MenuItem>
                        ) : null)}
                        <li className="user-menu">
                            <NotificationsMenu />
                            {/*<TransactionsMenu />*/}
                            <UserMenu />
                        </li>
                    </StyledMenu>
                    <StyledToolbar>
                        <ToolButton icon="icon-arrow-left" onClick={this.onBack} />
                        <ToolButton icon="icon-arrow-right" onClick={this.onForward} />
                        <ToolButton icon="icon-refresh" onClick={this.props.onRefresh} />
                        <ToolButton icon="icon-home" onClick={this.props.onNavigateHome} />
                        {this.props.isAuthorized && (
                            <ToolButton right icon="icon-key" />
                        )}
                    </StyledToolbar>
                    <StyledLoadingBar
                        showFastActions
                        style={{
                            backgroundColor: '#c6d2da',
                            width: 'auto',
                            height: 2
                        }}
                    />
                </StyledControls>
                <Navigation topOffset={styles.headerHeight + styles.menuHeight + styles.toolbarHeight} />
                <StyledContent style={{ marginLeft: this.props.navigationVisible ? this.props.navigationSize : 0 }}>
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

export default Main;