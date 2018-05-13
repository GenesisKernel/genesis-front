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

import React from 'react';
import styled from 'styled-components';

export interface INotificationButtonProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NotificationButton: React.SFC<INotificationButtonProps> = props => (
    <button className={props.className} onClick={props.onClick}>
        {props.children}
    </button>
);

export default styled(NotificationButton) `
    flex: 1;
    background: rgba(255, 255, 255, 0.15);
    height: 30px;
    border: 0;
    color: #fff;
    text-transform: uppercase;
    margin-right: 5px;
    font-size: 13px;
    transition: background ease-in-out .2s;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    &:active {
        background: rgba(255, 255, 255, 0.1);
    }
`;