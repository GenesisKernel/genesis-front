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
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import sidebarStyle from './Sidebar/style';

import Protypo from 'containers/Widgets/Protypo';
import { IProtypoElement } from 'components/Protypo/Protypo';

export const style = {
    contentWidth: sidebarStyle.fullSize - sidebarStyle.collapsedSize,
    collapseTransition: '0.3s ease-in-out !important'
};

const StyledNavigation = styled.aside`
    position: relative;
    width: ${style.contentWidth}px !important;
    margin-left: ${sidebarStyle.collapsedSize}px;
    background: #fefefe !important;
    padding-right: 2px;
    
    .aside-inner {
        width: ${style.contentWidth}px !important;
    }

    .resize-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        right: -3px;
        text-align: center;
        width: 10px;
        
        > div {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: 0 3px;
            width: 2px;
            background: #e5e4e5;
        }

        &:hover > div {
            width: 6px;
            margin: 0 1px;
        }
    }
`;

const StyledBackButton = styled.button`
    position: relative;
    display: block;
    width: ${style.contentWidth}px;
    height: 45px;
    line-height: 45px;
    padding: 0 14px;
    color: #999;
    font-size: 16px;
    font-weight: 200;
    text-decoration: none;
    outline: none;
    border: none;
    border-bottom: solid 1px #e5e5e5;
    text-align: left;
    background: transparent;

    &:hover .back-button {
        color: #6ebcff;
    }

    .back-button {
        color: #0089ff;
        font-size: 14px;
        float: right;
        line-height: 45px;

        em {
            font-size: 12px;
            margin-right: 5px;
        }

        span {
            font-size: 16px;
        }
    }
`;

const StyledLogo = styled.div`
    background: #f5f5f5;
    width: ${style.contentWidth}px;
    text-align: center;
    display: block;

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

const ResizeHandle: React.SFC<{}> = (props) => (
    <div className="resize-handle" onMouseMove={e => console.log(e)}>
        <div />
    </div>
);

export interface INavigationProps {
    preloading: boolean;
    menus: {
        name: string;
        content: IProtypoElement[];
    }[];
    menuPop: () => void;
    menuPush: (menu: { name: string, content: IProtypoElement[] }) => void;
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
        this.props.menuPush({
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
                        icon: 'icon-share-alt',
                        _systemPageHook: '/admin/export',
                        title: this.props.intl.formatMessage({ id: 'admin.export', defaultMessage: 'Export' })
                    }
                }
            ]
        });
    }

    render() {
        const menu = this.props.menus.length && this.props.menus[this.props.menus.length - 1];
        return (
            <StyledNavigation className="aside">
                <nav>
                    <StyledLogo>
                        <Link to="/">
                            <img src={imgLogo} />
                        </Link>
                        <StyledBackButton onClick={() => this.props.menuPop()} disabled={1 >= this.props.menus.length}>
                            {this.props.menus.length > 1 && (
                                <span className="back-button">
                                    <em className="icon-arrow-left" />
                                    <span>Back</span>
                                </span>
                            )}
                            <div className="backbutton-label">{menu && menu.name}</div>
                        </StyledBackButton>
                    </StyledLogo>
                    <StyledMenuContent>
                        <Protypo
                            payload={menu && menu.content}
                        />
                    </StyledMenuContent>
                    <StyledDevButton>
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