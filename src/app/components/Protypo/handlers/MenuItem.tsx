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
import classnames from 'classnames';
import propTypes from 'prop-types';

import themed from 'components/Theme/themed';
import Protypo, { IParamsSpec } from '../Protypo';
import PageLink from 'components/Routing/PageLink';

export interface IMenuItemProps {
    'title'?: string;
    'page'?: string;
    'icon'?: string;
    'params'?: IParamsSpec;
}

export const StyledMenuItem = themed.div`
    position: relative;

    > a, > a:hover {
        text-decoration: none !important;
    }

    &.active {
        .link-active-decorator {
            opacity: 1;
        }
    }

    .link-active-decorator {
        display: block;
        opacity: 0;
        background: ${props => props.theme.menuActive};
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 3px;
        width: 2px;
        transition: opacity .2s ease-in-out;
    }

    &:hover {
        background: ${props => props.theme.menuBackgroundActive};
    }

    .link-body {
        border-bottom: solid 1px ${props => props.theme.menuSeparator};
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 19px;
        color: ${props => props.theme.menuForeground};
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .icon {
            margin-right: 14px;
            color: ${props => props.theme.menuIconColor};
            font-size: 22px;
            position: relative;
            top: 5px;
        }
    }
`;

interface IMenuItemContext {
    protypo: Protypo;
}

const MenuItem: React.SFC<IMenuItemProps> = (props, context: IMenuItemContext) => {
    const classes = classnames({
        active: context.protypo.props.page === props.page
    });

    return (
        <StyledMenuItem className={classes}>
            <PageLink
                page={props.page || ''}
                section={context.protypo.props.section}
                params={props.params ? context.protypo.resolveParams(props.params) : {}}
                from={context.protypo.props.menu ? {
                    type: 'MENU',
                    name: context.protypo.props.menu
                } : undefined}
            >
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
    protypo: propTypes.object.isRequired
};

export default MenuItem;