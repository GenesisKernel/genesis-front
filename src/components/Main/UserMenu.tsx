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
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import imgAvatar from 'images/avatar.svg';

const StyledUserMenu = styled.div`
    line-height: 55px;
    margin-left: 15px;
    
    > button.user-menu {
        background: none;
        padding: 0 10px;
        margin: 0;
        outline: 0;
        border: 0;

        .title {
            font-weight: 600;
            color: #fff;
            margin: 0 10px;

            .fa {
                margin-left: 8px;
            }
        }

        &:hover .title {
            color: #117391;
        }
    }
`;

const UserMenu: React.SFC = (props) => (
    <StyledUserMenu>
        <button className="user-menu">
            <img src={imgAvatar} className="img-thumbnail img-circle" style={{ width: 32 }} />
            <span className="title">
                <span>
                    <FormattedMessage id="general.user.anonymous" defaultMessage="Anonymous" />
                </span>
                <em className="fa fa-chevron-down" />
            </span>
        </button>
    </StyledUserMenu>
);

export default UserMenu;