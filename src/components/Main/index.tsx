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
import { IStoredKey } from 'lib/storage';
import * as classnames from 'classnames';
import { setCollapsed } from 'modules/engine/actions';
import styled from 'styled-components';

import { IProtypoElement } from 'components/Protypo/Protypo';
import Sidebar from 'components/Main/Sidebar';
import Header from 'components/Main/Header';

const StyledWrapper = styled.div`
    background: #f5f7fa;
`;

export interface IMainProps {
    account: IStoredKey;
    isCollapsed: boolean;
    loading: number;
    menu: { name: string, content: IProtypoElement[] };
    setCollapsed?: typeof setCollapsed;
}

export default class extends React.Component<IMainProps> {
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
                <Sidebar menu={this.props.menu} />
                <Header toggleCollapsed={this.onSidebarToggle.bind(this)} loading={this.props.loading} />
                <section>
                    {this.props.children}
                </section>
            </StyledWrapper>
        );
    }
}