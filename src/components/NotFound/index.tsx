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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Center from 'components/Center';

// <div className="abs-center wd-xl">
const NotFound: React.SFC = (props) => (
    <Center>
        <div className="text-center mb-xl">
            <div className="text-lg mb-lg">404</div>
            <p className="lead m0">We couldn't find this page.</p>
            <p>The page you are looking for does not exists.</p>
        </div>
        <ul className="list-inline text-center text-sm mb-xl">
            <li>
                <Link className="text-muted" to="/">
                    <FormattedMessage id="general.home" defaultMessage="Home" />
                </Link>
            </li>
            <li className="text-muted">|</li>
            <li>
                <Link className="text-muted" to="">
                    <FormattedMessage id="account.login" defaultMessage="Login" />
                </Link>
            </li>
            <li className="text-muted">|</li>
            <li>
                <Link className="text-muted" to="/account/create">
                    <FormattedMessage id="account.create" defaultMessage="Create account" />
                </Link>
            </li>
        </ul>
    </Center>
);

export default NotFound;