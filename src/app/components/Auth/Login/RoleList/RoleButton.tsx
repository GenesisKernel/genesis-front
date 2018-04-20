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
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export interface IRoleButtonProps {
    className?: string;
    id: number;
    name: string;
    notifications: number;
    onSelect: () => void;
}

const RoleButton: React.SFC<IRoleButtonProps> = props => (
    <Button className={props.className} block bsStyle="default" onClick={props.onSelect}>
        <div className="media-box text-left">
            <div>
                <p className="pl m0">
                    {props.name}
                </p>
            </div>
            {props.notifications ? (
                <div className="notifications">
                    {props.notifications}
                </div>
            ) : null}
        </div>
    </Button>
);

export default styled(RoleButton) `
    position: relative;
    border: solid 1px transparent;
    padding: 0;
    height: 46px;
    overflow: hidden;
    padding-right: 45px;
    position: relative;

    .notifications {
        text-align: center;
        position: absolute;
        right: 10px;
        top: 10px;
        bottom: 10px;
        width: 25px;
        line-height: 25px;
        background: #d87272;
        color: #fff;
    }
`;