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
import PageLink from 'containers/Routing/PageLink';

export interface IToolButtonProps {
    title?: string;
    icon?: string;
    page?: string;
    pageparams?: IParamsSpec;
}

interface IToolButtonContext {
    protypo: Protypo;
    vde?: boolean;
}

const ToolButton: React.SFC<IToolButtonProps> = (props, context: IToolButtonContext) => (
    <PageLink className="ml btn-tool" page={props.page} params={context.protypo.resolveParams(props.pageparams)} vde={context.vde}>
        <em className={`icon ${props.icon}`} />
        <span>
            <span>{props.title}</span>
        </span>
    </PageLink>
);

ToolButton.contextTypes = {
    protypo: propTypes.object.isRequired,
    vde: propTypes.bool
};

export default ToolButton;