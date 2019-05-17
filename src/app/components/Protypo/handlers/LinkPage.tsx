/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import * as propTypes from 'prop-types';

import Protypo, { IParamsSpec } from '../Protypo';
import StyledComponent from './StyledComponent';

export interface ILinkPageProps {
    'class'?: string;
    'className'?: string;
    'page'?: string;
    'pageparams'?: IParamsSpec;
}

interface ILinkPageContext {
    protypo: Protypo;
    navigatePage: (params: { name: string, params: any, force?: boolean }) => void;
}

const LinkPage: React.SFC<ILinkPageProps> = (props, context: ILinkPageContext) => {
    const onNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        context.navigatePage({
            name: props.page,
            params: context.protypo.resolveParams(props.pageparams),
            force: true
        });
        return false;
    };

    return (
        <a href="#" className={[props.class, props.className].join(' ')} onClick={onNavigate}>
            {props.children}
        </a>
    );
};

LinkPage.contextTypes = {
    protypo: propTypes.object.isRequired,
    navigatePage: propTypes.func.isRequired
};

export default StyledComponent(LinkPage);