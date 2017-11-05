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
import * as propTypes from 'prop-types';

import StyledComponent from './StyledComponent';

export interface ILinkPageProps {
    'class'?: string;
    'className'?: string;
    'page'?: string;
    'pageparams'?: { [key: string]: string };
}

interface ILinkPageContext {
    navigatePage: (params: { name: string, params: any }) => void;
}

const LinkPage: React.SFC<ILinkPageProps> = (props, context: ILinkPageContext) => {
    const onNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        context.navigatePage({ name: props.page, params: props.pageparams });
        return false;
    };

    return (
        <a href={props.page ? `/page/${props.page}` : ''} className={[props.class, props.className].join(' ')} onClick={onNavigate}>
            {props.children}
        </a>
    );
};

LinkPage.contextTypes = {
    navigatePage: propTypes.func.isRequired
};

export default StyledComponent(LinkPage);