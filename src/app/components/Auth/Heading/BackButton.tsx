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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import platform from 'lib/platform';

export interface IBackButtonProps {
    className?: string;
    returnUrl?: string;
    onClick?: () => void;
}

const BackButton: React.SFC<IBackButtonProps> = props => props.returnUrl ?
    (
        <Link to={props.returnUrl} className={props.className}>
            <em className="button-icon icon-arrow-left" />
            <div className="button-title">
                <FormattedMessage id="general.back" defaultMessage="Back" />
            </div>
        </Link>
    ) : (
        <button type="button" className={props.className} onClick={props.onClick}>
            <em className="button-icon icon-arrow-left" />
            <div className="button-title">
                <FormattedMessage id="general.back" defaultMessage="Back" />
            </div>
        </button>
    );

export default styled(BackButton) `
    text-decoration: none !important;
    border: 0;
    background: 0;
    padding: 0;
    color: ${platform.select({ desktop: '#4085dc', web: '#fff' })};
    font-size: 14px;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        margin-right: 5px;
    }

    .button-title {
        vertical-align: top;
        display: inline-block;
        line-height: 40px;
    }
`;