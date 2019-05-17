/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import themed from 'components/Theme/themed';
import Protypo, { IParamsSpec } from '../Protypo';
import PageLink from 'containers/Routing/PageLink';

export interface IMenuItemProps {
    'title'?: string;
    'page'?: string;
    'icon'?: string;
    'params'?: IParamsSpec;
}

export const StyledMenuItem = themed.div`
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
        background: ${props => props.theme.menuBackgroundActive};
    }

    .link-body {
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 25px;
        color: ${props => props.theme.menuForeground};
        font-size: 14px;
        font-weight: 200;
        text-align: left;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .icon {
            margin-right: 14px;
            color: ${props => props.theme.menuIconColor};
            font-size: 17px;
            position: relative;
            top: 3px;
        }
    }
`;

interface IMenuItemContext {
    protypo: Protypo;
}

const MenuItem: React.SFC<IMenuItemProps> = (props, context: IMenuItemContext) => {
    const isActive = context.protypo.getCurrentPage() === props.page;
    const classes = classnames({
        active: isActive
    });

    return (
        <StyledMenuItem className={classes}>
            <PageLink page={props.page} params={context.protypo.resolveParams(props.params)}>
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
    navigatePage: propTypes.func.isRequired
};

export default MenuItem;