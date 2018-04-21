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
import classNames from 'classnames';
import styled from 'styled-components';

import DropdownButton, { IDropdownButtonProps } from 'components/DropdownButton';

export interface ISystemButtonProps extends IDropdownButtonProps {
    warning?: boolean;
}

const SystemButton: React.SFC<ISystemButtonProps> = props => (
    <DropdownButton
        className={classNames(props.className, {
            _warning: props.warning
        })}
        content={props.content}
        leftMost={props.leftMost}
        rightMost={props.rightMost}
        align={props.align}
        width={props.width}
        badge={props.badge}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </DropdownButton>
);

const StyledSystemButton = styled(SystemButton) `
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    transition: background ease-in-out .17s;

    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &._warning {
        background: #ffa500;
    }
`;

export default StyledSystemButton;