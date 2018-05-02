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
import styled from 'styled-components';

export interface IToolbarButton {
    icon: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IToolbarProps {
    className?: string;
}

const Toolbar: React.SFC<IToolbarProps> = props => (
    <ul className={props.className}>
        {props.children}
    </ul>
);

const StyledToolbar = styled(Toolbar) `
    background: #f3f3f3;
    height: 40px;
    border-bottom: solid 2px #e5e5e5;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 0;
`;

export default StyledToolbar;