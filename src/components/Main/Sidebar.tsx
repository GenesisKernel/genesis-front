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
import imgLogo from 'images/logoInverse.svg';
import { Link } from 'react-router-dom';
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';
import { menuPop, menuPush } from 'modules/content/actions';

import Protypo from 'containers/Widgets/Protypo';
import { IProtypoElement } from 'components/Protypo/Protypo';

export const style = {
    sidebarWidth: 300,
    collapseTransition: '0.3s ease-in-out !important'
};

const StyledSidebar = styled.aside`
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    width: ${style.sidebarWidth}px !important;
    transition: margin-left ${style.collapseTransition};

    .aside-inner {
        width: ${style.sidebarWidth}px !important;
    }
`;

const StyledBackButton = styled.button`
    position: relative;
    display: block;
    width: ${style.sidebarWidth}px;
    height: 45px;
    line-height: 45px;
    padding: 0 14px;
    color: #b2b2b2;
    text-decoration: none;
    outline: none;
    border: none;
    border-bottom: solid 1px #e5e5e5;
    text-align: center;
    background: transparent;
    transition: background-color .1s ease-in-out;

    &:active {
        background-color: rgba(0,0,0,0.05);
    }

    > .icon {
        position: absolute;
        left: 15px;
        color: #b2b2b2;
        line-height: 45px;
    }

    > .backbutton-label {
        height: 100%;
    }
`;

const StyledLogo = styled(Link) `
    width: ${style.sidebarWidth}px;
    height: 55px;
    text-align: center;
    border-bottom: solid 1px #e5e5e5;
    display: block;
    text-tecoration: none;

    > img {
        max-height: 100%;
        max-width: 100%;
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
        margin: 0 auto;
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

export interface ISidebarProps {
    collapsed: boolean;
    intl?: InjectedIntl;
    menus: {
        name: string;
        content: IProtypoElement[];
    }[];
    menuPop: typeof menuPop;
    menuPush: typeof menuPush;
}

const Sidebar: React.SFC<ISidebarProps> = (props) => {
    const menu = props.menus.length && props.menus[props.menus.length - 1];

    // TODO: This function is a stub. In future, admin menu will be reworked to show through the API call
    const onAdminTools = () => {
        props.menuPush({
            name: 'adminTools',
            content: [
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-screen-desktop',
                        _systemPageHook: '/admin/interface',
                        title: props.intl.formatMessage({ id: 'admin.interface', defaultMessage: 'Interface' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-docs',
                        _systemPageHook: '/admin/tables',
                        title: props.intl.formatMessage({ id: 'admin.tables', defaultMessage: 'Tables' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-briefcase',
                        _systemPageHook: '/admin/contracts',
                        title: props.intl.formatMessage({ id: 'admin.contracts', defaultMessage: 'Smart contracts' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-settings',
                        _systemPageHook: '/admin/parameters',
                        title: props.intl.formatMessage({ id: 'admin.parameters', defaultMessage: 'Ecosystem parameters' })
                    }
                },
                {
                    tag: 'menuitem',
                    attr: {
                        icon: 'icon-globe',
                        _systemPageHook: '/admin/languages',
                        title: props.intl.formatMessage({ id: 'admin.languages', defaultMessage: 'Language resources' })
                    }
                }
            ]
        });
    };

    return (
        <StyledSidebar className="aside" style={{ marginLeft: props.collapsed ? -style.sidebarWidth : 0 }}>
            <nav>
                <StyledLogo to="/">
                    <img src={imgLogo} />
                </StyledLogo>
                <StyledBackButton onClick={() => props.menuPop()} disabled={1 >= props.menus.length}>
                    {props.menus.length > 1 && (<em className="icon icon-arrow-left" />)}
                    <div className="backbutton-label">{menu && menu.name}</div>
                </StyledBackButton>
                <StyledMenuContent>
                    <Protypo
                        payload={menu && menu.content}
                    />
                </StyledMenuContent>
                <StyledDevButton>
                    <button id="mainAdminTools" onClick={onAdminTools}>
                        <em className="icon fa fa-cog" />
                        <FormattedMessage id="admin.tools" defaultMessage="Admin tools" />
                    </button>
                </StyledDevButton>
                {/*<ul className="nav">
                        {<li className="nav-heading text-center pr0 pl0 pb0 m0">
                            <span>Account</span>
                            <hr />
                        </li>
                        <li className="nav-heading">
                            <span><FormattedMessage id="general.account" defaultMessage="Account" /></span>
                        </li>
                        <LinkButton to="/">
                            <em className="icon-speedometer" />
                            <span><FormattedMessage id="general.dashboard" defaultMessage="Dashboard" /></span>
                        </LinkButton>
                        <LinkButton to="/transfer">
                            <em className="icon-wallet" />
                            <span><FormattedMessage id="money.transfer" defaultMessage="Money transfer" /></span>
                        </LinkButton>
                        <LinkButton to="/history">
                            <em className="icon-book-open" />
                            <span><FormattedMessage id="general.history" defaultMessage="History" /></span>
                        </LinkButton>
                        <LinkButton to="/backup">
                            <em className="icon-shield" />
                            <span><FormattedMessage id="general.backup" defaultMessage="Backup" /></span>
                        </LinkButton>
                        <LinkButton to="/create-ecosystem">
                            <em className="icon-layers" />
                            <span><FormattedMessage id="ecosystem.create" defaultMessage="Create ecosystem" /></span>
                        </LinkButton>
                        <LinkButton to="/request-membership">
                            <em className="icon-user-follow" />
                            <span><FormattedMessage id="ecosystem.membership.request" defaultMessage="Request membership" /></span>
                        </LinkButton>

                        <li className="nav-heading">
                            <span><FormattedMessage id="general.system" defaultMessage="System" /></span>
                        </li>
                        <LinkButton to="/system-info">
                            <em className="icon-info" />
                            <span><FormattedMessage id="general.info" defaultMessage="Information" /></span>
                        </LinkButton>
                        <LinkButton to="/block-exporer">
                            <em className="icon-magnifier" />
                            <span><FormattedMessage id="general.blockexplorer" defaultMessage="Block explorer" /></span>
                        </LinkButton>

                        <li className="nav-heading">
                            <span>Debug</span>
                        </li>
                        <LinkButton to="/debug">
                            <em className="icon-speedometer" />
                            <span>Debug page</span>
                        </LinkButton>

                        <li className="nav-heading">
                            <span>Admin tools</span>
                        </li>
                        <LinkButton to="/admin/tables">
                            <em className="icon-speedometer" />
                            <span>Tables</span>
                        </LinkButton>
                        <LinkButton to="/admin/interface">
                            <em className="icon-speedometer" />
                            <span>Interface</span>
                        </LinkButton>
                    </ul>
                    */}
            </nav>
        </StyledSidebar>
    );
};

export default injectIntl(Sidebar);