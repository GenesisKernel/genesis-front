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
import { IProtypoElement } from '../Protypo';
import { StyledLinkButton } from './MenuItem';
import * as propTypes from 'prop-types';

export interface IMenuGroupProps {
    'title'?: string;
    'icon'?: string;
    'params'?: { [key: string]: any };
    'childrenTree'?: IProtypoElement[];
}

const MenuGroup: React.SFC<IMenuGroupProps> = (props, context) => (
    <StyledLinkButton>
        <a href="#" onClick={() => context.menuPush({ name: props.title, content: props.childrenTree })}>
            <div className="link-body">
                {props.icon && (<em className={`icon ${props.icon}`} />)}
                <span>{props.title}</span>
            </div>
        </a>
    </StyledLinkButton>
);

MenuGroup.contextTypes = {
    menuPush: propTypes.func.isRequired
};

export default MenuGroup;