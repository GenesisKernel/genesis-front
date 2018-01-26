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
    vde?: boolean;
    protypo: Protypo;
    navigatePage: (params: { name: string, params: any, vde?: boolean }) => void;
}

const LinkPage: React.SFC<ILinkPageProps> = (props, context: ILinkPageContext) => {
    const onNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        context.navigatePage({
            name: props.page,
            params: context.protypo.resolveParams(props.pageparams),
            vde: context.vde
        });
        return false;
    };

    return (
        <a href={props.page ? `/${context.vde ? 'vde/page' : 'page'}/${props.page}` : ''} className={[props.class, props.className].join(' ')} onClick={onNavigate}>
            {props.children}
        </a>
    );
};

LinkPage.contextTypes = {
    protypo: propTypes.object.isRequired,
    navigatePage: propTypes.func.isRequired,
    vde: propTypes.bool
};

export default StyledComponent(LinkPage);