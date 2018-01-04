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
import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import imgAvatar from 'images/avatar.svg';

const StyledAccountButton = styled.div`
    margin-top: 8px;

    &.active {
        button.account-main {
            border: solid 1px #8eb7ec;
        }
    }

    button {
        border: solid 1px transparent;
        padding: 0;
        height: 46px;
        overflow: hidden;

        .avatar {
            max-width: 44px;
            max-height: 44px;
        }
    }
`;

export interface IAccountButtonProps {
    active: boolean;
    avatar: string;
    keyID: string;
    address: string;
    type: string;
    ecosystemID: string;
    ecosystemName: string;
    onSelect: () => void;
    onRemove: () => void;
}

const AccountButton: React.SFC<IAccountButtonProps> = props => (
    <StyledAccountButton className={props.active && 'active'}>
        <Row>
            <Col xs={10} className="p0">
                <Button className="account-main" block bsStyle="default" onClick={props.onSelect}>
                    <div className="media-box text-left">
                        <div className="pull-left">
                            <img src={props.avatar || imgAvatar} className="avatar" />
                        </div>
                        <div className="media-box-body clearfix">
                            <p className="m0">
                                <b>{props.ecosystemName || props.ecosystemID}</b>
                                <span className="ml">({props.type || props.keyID})</span>
                            </p>
                            <p className="m0">
                                <small>{props.address}</small>
                            </p>
                        </div>
                    </div>
                </Button>
            </Col>
            <Col xs={2} className="p0 pl">
                <Button block bsStyle="default" onClick={props.onRemove}>
                    <em className="icon icon-trash text-muted" />
                </Button>
            </Col>
        </Row>
    </StyledAccountButton>
);

export default AccountButton;