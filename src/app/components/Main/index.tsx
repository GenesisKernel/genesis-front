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

import React from 'react';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { INetworkEndpoint } from 'apla/auth';
import { TSection } from 'apla/content';
import { history } from 'store';
import platform from 'lib/platform';

import themed from 'components/Theme/themed';
import Titlebar from './Titlebar';
import UserMenu from 'containers/Widgets/UserMenu';
import Navigation from 'containers/Main/Navigation';
import NotificationsMenu from 'containers/Widgets/NotificationsMenu';
import Toolbar from './Toolbar';
import SectionButton from 'components/Main/SectionButton';
import ToolButton from 'components/Main/Toolbar/ToolButton';
import EditorToolbar from 'containers/Main/Toolbar/EditorToolbar';
import ToolIndicator from 'components/Main/Toolbar/ToolIndicator';
import LoadingBar from './LoadingBar';

const StyledWrapper = themed.div`
    background-color: #f6f8fa;
`;

export interface IMainProps {
    network: INetworkEndpoint;
    isAuthorized: boolean;
    pending: boolean;
    section: string;
    sections: { [name: string]: TSection };
    stylesheet: string;
    navigationSize: number;
    navigationVisible: boolean;
    transactionsCount: number;
    onRefresh: () => void;
    onNavigateHome: () => void;
    onNavigationToggle: () => void;
    onSwitchSection: (section: string) => void;
    onCloseSection: (section: string) => void;
}

const StyledControls = themed.div`
    position: fixed;
    top: ${platform.select({ win32: '1px' }) || 0};
    left: ${platform.select({ win32: '1px' }) || 0};
    right: ${platform.select({ win32: '1px' }) || 0};
    z-index: 10000;
`;

const StyledTitlebar = themed.div`
    background: ${props => props.theme.headerBackground};
    height: ${props => props.theme.headerHeight}px;
    line-height: ${props => props.theme.headerHeight}px;
    font-size: 15px;
    color: #fff;
    text-align: center;
`;

const StyledMenu = themed.ul`
    background: ${props => props.theme.headerBackground};
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: ${props => props.theme.menuHeight}px;
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
            height: ${props => props.theme.menuHeight}px;
            line-height: normal;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
`;

const StyledContent = themed.section`
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    margin-top: ${props => props.theme.headerHeight + props.theme.menuHeight + props.theme.toolbarHeight}px !important;
    transition: none !important;
`;

class Main extends React.Component<IMainProps> {
    onBack() {
        history.goBack();
    }

    onForward() {
        history.goForward();
    }

    render() {
        const appTitle = `Apla ${this.props.network ? '(' + this.props.network.apiHost + ')' : ''}`;

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
                        <li>
                            <SectionButton onClick={this.props.onNavigationToggle}>
                                <em className="icon-menu" />
                            </SectionButton>
                        </li>
                        {_.map(this.props.sections, l => l.visible ? (
                            <li key={l.name}>
                                <SectionButton
                                    active={this.props.section === l.name}
                                    closeable={l.closeable}
                                    onClick={this.props.onSwitchSection.bind(this, l.name)}
                                    onClose={this.props.onCloseSection.bind(this, l.name)}
                                >
                                    {l.title}
                                </SectionButton>
                            </li>
                        ) : null)}
                        <li className="user-menu">
                            <NotificationsMenu />
                            {/*<TransactionsMenu />*/}
                            <UserMenu />
                        </li>
                    </StyledMenu>
                    <Toolbar>
                        {this.props.isAuthorized && (
                            <ToolIndicator
                                right
                                icon="icon-key"
                                title={<FormattedMessage id="privileged" defaultMessage="Privileged mode" />}
                                titleDesc={<FormattedMessage id="privileged.desc" defaultMessage="You will not be prompted to enter your password when executing transactions" />}
                            />
                        )}
                        {'editor' === this.props.section ?
                            (
                                <EditorToolbar />
                            ) : (
                                <div>
                                    <ToolButton icon="icon-arrow-left" onClick={this.onBack}>
                                        <FormattedMessage id="navigation.back" defaultMessage="Back" />
                                    </ToolButton>
                                    <ToolButton icon="icon-arrow-right" onClick={this.onForward}>
                                        <FormattedMessage id="navigation.forward" defaultMessage="Forward" />
                                    </ToolButton>
                                    <ToolButton icon="icon-home" onClick={this.props.onNavigateHome}>
                                        <FormattedMessage id="navigation.home" defaultMessage="Home" />
                                    </ToolButton>
                                    <ToolButton icon="icon-refresh" onClick={this.props.onRefresh}>
                                        <FormattedMessage id="navigation.refresh" defaultMessage="Refresh" />
                                    </ToolButton>
                                </div>
                            )
                        }
                    </Toolbar>
                    <LoadingBar />
                </StyledControls >
                <Navigation />
                <StyledContent style={{ marginLeft: this.props.navigationVisible ? this.props.navigationSize : 0 }}>
                    {this.props.children}
                </StyledContent>
            </StyledWrapper >
        );
    }
}

export default Main;