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
import { FormattedMessage } from 'react-intl';

export interface IAddAccountButtonProps {
    className?: string;
    onClick: () => void;
}

const AddAccountButton: React.SFC<IAddAccountButtonProps> = props => (
    <button className={props.className} onClick={props.onClick}>
        <div className="button-icon">
            <em className="icon-plus" />
        </div>
        <div className="button-label">
            <FormattedMessage id="account.createimport" defaultMessage="Create or import account" />
        </div>
    </button>
);

export default styled(AddAccountButton) `
    display: block;
    width: 100%;
    height: 40px;
    color: #4085dc;
    border: 0;
    background: 0;
    padding: 0;
    margin: 10px 0;
    text-align: left;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        vertical-align: top;
        text-align: center;
        float: left;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        margin-right: 5px;
    }

    .button-label {
        font-size: 16px;
        line-height: 36px;
    }
`;