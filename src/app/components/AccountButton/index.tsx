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
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import imgAvatar from 'images/avatar.svg';

const StyledAccountButton = styled.div`
    padding-right: 46px;
    margin-top: 8px;
    position: relative;

    button.account-main {
        border: solid 1px transparent;
        padding: 0;
        height: 46px;
        overflow: hidden;

        .avatar {
            max-width: 44px;
            max-height: 44px;
        }
    }

    button.account-delete {
        font-size: 19px;
        border: 0;
        background: 0;
        margin: 5px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        color: #999;

        &:hover {
            color: #666;
        }
    }
`;

export interface IAccountButtonProps {
    avatar: string;
    keyID: string;
    address: string;
    username: string;
    ecosystemID: string;
    ecosystemName: string;
    onSelect: () => void;
    onRemove: () => void;
}

const AccountButton: React.SFC<IAccountButtonProps> = props => (
    <StyledAccountButton>
        <Button className="account-main" block bsStyle="default" onClick={props.onSelect}>
            <div className="media-box text-left">
                <div className="pull-left">
                    <img src={props.avatar || imgAvatar} className="avatar" />
                </div>
                <div className="media-box-body clearfix">
                    <p className="m0">
                        <b>{props.username || props.keyID}</b>
                        <span className="ml">({props.ecosystemName || props.ecosystemID})</span>
                    </p>
                    <p className="m0">
                        <small>{props.address}</small>
                    </p>
                </div>
            </div>
        </Button>
        <button className="account-delete" onClick={props.onRemove}>x</button>
    </StyledAccountButton>
);

export default AccountButton;