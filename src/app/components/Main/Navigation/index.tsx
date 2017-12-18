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
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import Protypo from 'containers/Widgets/Protypo';
import ResizeHandle from 'containers/Main/Navigation/ResizeHandle';
import { IProtypoElement } from 'components/Protypo/Protypo';

const StyledNavigation = styled.aside`
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

        .icon {
            width: 0;
            opacity: 0;
        }
    }

    &:hover {
        color: #7bb0f5;
    }

    .icon {
        vertical-align: top;
        display: inline-block;
        width: 30px;
        overflow: hidden;
        opacity: 1;
        transition: width ease-in-out .15s, opacity ease-in-out .15s;
    }

    em {
        font-size: 15px;
    }

    span {
        font-size: 21px;
        font-weight: 300;
    }
`;

const StyledMenuContent = styled.div`
    padding-bottom: 50px;
`;

const StyledDevButton = styled.div`
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;

    > button {
        background: transparent;
        outline: none;
        border: none;
        display: block;
        margin: 10px auto;
        font-weight: bold;
        color: #888;
        font-size: 14px;

        > .icon {
            vertical-align: middle;
            margin-right: 8px;
            margin-top: -0.1em;
        }

        &:hover {
            color: #999;
        }
    }
`;

export interface INavigationProps {
    isEcosystemOwner: boolean;
    preloading: boolean;
    visible: boolean;
    topOffset: number;
    width: number;
    menus: {
        name: string;
        content: IProtypoElement[];
    }[];
    menuPop: () => void;
    menuPush: (menu: { name: string, vde?: boolean, content: IProtypoElement[] }) => void;
    ecosystemInit: (nullArg: null) => void;
}

class Navigation extends React.Component<INavigationProps & InjectedIntlProps> {
    componentDidMount() {
        this.preloadMenu(this.props);
    }

    componentWillReceiveProps(props: INavigationProps) {
        this.preloadMenu(props);
    }

    preloadMenu(props: INavigationProps) {
        if (!props.preloading && !props.menus.find(l => l.name === 'default_menu')) {
            this.props.ecosystemInit(null);
        }
    }

    // TODO: This function is a stub. In future, admin menu will be reworked to show through the API call
    onDeveloperTools() {
        const menuStack = {
            name: 'adminTools',
            content: [
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-screen-desktop',
                        _systemPageHook: '/admin/interface',
                        title: this.props.intl.formatMessage({ id: 'admin.interface', defaultMessage: 'Interface' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-docs',
                        _systemPageHook: '/admin/tables',
                        title: this.props.intl.formatMessage({ id: 'admin.tables', defaultMessage: 'Tables' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-briefcase',
                        _systemPageHook: '/admin/contracts',
                        title: this.props.intl.formatMessage({ id: 'admin.contracts', defaultMessage: 'Smart contracts' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-settings',
                        _systemPageHook: '/admin/parameters',
                        title: this.props.intl.formatMessage({ id: 'admin.parameters', defaultMessage: 'Ecosystem parameters' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-globe',
                        _systemPageHook: '/admin/languages',
                        title: this.props.intl.formatMessage({ id: 'admin.languages', defaultMessage: 'Language resources' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-cloud-upload',
                        _systemPageHook: '/admin/import',
                        title: this.props.intl.formatMessage({ id: 'admin.import', defaultMessage: 'Import' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-cloud-download',
                        _systemPageHook: '/admin/export',
                        title: this.props.intl.formatMessage({ id: 'admin.export', defaultMessage: 'Export' })
                    }
                }
            ]
        };

        if (!this.props.isEcosystemOwner) {
            menuStack.content.push({
                tag: 'menuitem',
                attr: {
                    icon: 'icon-lock',
                    _systemPageHook: '/admin/vde',
                    title: this.props.intl.formatMessage({ id: 'admin.vde.short', defaultMessage: 'Dedicated Ecosystem' })
                }
            });
        }

        this.props.menuPush(menuStack);
    }

    // TODO: This function is a stub. In future, admin menu will be reworked to show through the API call
    onVDETools() {
        this.props.menuPush({
            name: 'vde_tools',
            vde: false,
            content: [
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-screen-desktop',
                        _systemPageHook: '/vde/interface',
                        title: this.props.intl.formatMessage({ id: 'admin.interface', defaultMessage: 'Interface' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-docs',
                        _systemPageHook: '/vde/tables',
                        title: this.props.intl.formatMessage({ id: 'admin.tables', defaultMessage: 'Tables' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-briefcase',
                        _systemPageHook: '/vde/contracts',
                        title: this.props.intl.formatMessage({ id: 'admin.contracts', defaultMessage: 'Smart contracts' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-settings',
                        _systemPageHook: '/vde/parameters',
                        title: this.props.intl.formatMessage({ id: 'admin.parameters', defaultMessage: 'Ecosystem parameters' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-globe',
                        _systemPageHook: '/vde/languages',
                        title: this.props.intl.formatMessage({ id: 'admin.languages', defaultMessage: 'Language resources' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-cloud-upload',
                        _systemPageHook: '/vde/import',
                        title: this.props.intl.formatMessage({ id: 'admin.import', defaultMessage: 'Import' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-cloud-download',
                        _systemPageHook: '/vde/export',
                        title: this.props.intl.formatMessage({ id: 'admin.export', defaultMessage: 'Export' })
                    }
                }
            ]
        });
    }

    render() {
        const menu = this.props.menus.length && this.props.menus[this.props.menus.length - 1];
        return (
            <StyledNavigation style={{ width: this.props.visible ? this.props.width : 0, paddingTop: this.props.topOffset }}>
                <nav>

                    <StyledBackButton onClick={() => this.props.menuPop()} disabled={1 >= this.props.menus.length} className={this.props.menus.length > 1 ? '' : 'disabled'}>
                        <div>
                            <span className="icon">
                                <em className="icon-arrow-left" />
                            </span>
                            <span>{menu.name}</span>
                        </div>
                    </StyledBackButton>
                    <StyledMenuContent>
                        <Protypo
                            context="menu"
                            payload={menu && menu.content}
                        />
                    </StyledMenuContent>
                    <StyledDevButton>
                        <button id="mainVDETools" onClick={this.onVDETools.bind(this)}>
                            <em className="icon fa fa-wrench" />
                            <FormattedMessage id="admin.vde.tools" defaultMessage="VDE tools" />
                        </button>
                        <button id="mainAdminTools" onClick={this.onDeveloperTools.bind(this)}>
                            <em className="icon fa fa-cog" />
                            <FormattedMessage id="admin.tools" defaultMessage="Admin tools" />
                        </button>
                    </StyledDevButton>
                </nav>
                <ResizeHandle />
            </StyledNavigation>
        );
    }
}

export default injectIntl(Navigation);