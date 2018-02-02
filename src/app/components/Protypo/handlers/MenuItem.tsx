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
import * as classnames from 'classnames';
import styled from 'styled-components';
import * as propTypes from 'prop-types';

import Protypo, { IParamsSpec } from '../Protypo';
import PageLink from 'containers/Routing/PageLink';

export interface IMenuItemProps {
    'title'?: string;
    'page'?: string;
    'icon'?: string;
    'params'?: IParamsSpec;
    'vde'?: string;

    // TODO: Stub value
    '_systemPageHook'?: string;
}

export const StyledMenuItem = styled.div`
    > a, > a:hover {
        text-decoration: none !important;
    }

    &.active {
        > .link-active-decorator {
            opacity: 1;
        }
    }

    > .link-active-decorator {
        display: block;
        opacity: 0;
        background: #4c7dbd;
        float: left;
        width: 4px;
        height: 50px;
        transition: opacity .2s ease-in-out;
    }

    &:hover {
        background: #ececec;
    }

    .link-body {
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 25px;
        color: #0a1d33;
        font-size: 14px;
        font-weight: 200;
        text-align: left;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .icon {
            margin-right: 14px;
            color: #3577cc;
            font-size: 17px;
            position: relative;
            top: 3px;
        }
    }
`;

interface IMenuItemContext {
    vde?: boolean;
    protypo: Protypo;
    navigatePage: (params: { name: string, params: any, force?: boolean, vde?: boolean }) => void;
}

const MenuItem: React.SFC<IMenuItemProps> = (props, context: IMenuItemContext) => {
    const isVDE = props.vde === 'true' ? true : props.vde === 'false' ? false : context.vde;
    const isActive = context.protypo.getCurrentPage() === props.page;
    const classes = classnames({
        active: isActive
    });

    return (
        <StyledMenuItem className={classes}>
            <PageLink page={props.page} params={context.protypo.resolveParams(props.params)} vde={isVDE}>
                <span className="link-active-decorator" />
                <span className="link-body">
                    {props.icon && (<em className={`icon ${props.icon}`} />)}
                    <span>{props.title}</span>
                </span>
            </PageLink>
        </StyledMenuItem>
    );
};

MenuItem.contextTypes = {
    protypo: propTypes.object.isRequired,
    navigatePage: propTypes.func.isRequired,
    vde: propTypes.bool
};

export default MenuItem;