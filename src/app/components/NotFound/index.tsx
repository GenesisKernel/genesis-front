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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import DocumentTitle from 'components/DocumentTitle';
import Center from 'components/Center';

export interface INotFoundProps {
    main?: boolean;
}

const NotFound: React.SFC<INotFoundProps> = (props) => (
    <DocumentTitle title="general.notfound" defaultTitle="Not found">
        <Center>
            <div className={props.main ? 'text-muted' : 'text-white'}>
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">404</div>
                    <p className="lead m0">
                        <FormattedMessage id="general.notfound.page" defaultMessage="We couldn't find this page" />
                    </p>
                    <p>
                        <FormattedMessage id="general.notfound.page.notexists" defaultMessage="The page you are looking for does not exists" />
                    </p>
                </div>
                {!props.main && (
                    <ul className="list-inline text-center text-sm mb-xl">
                        <li>
                            <Link to="/">
                                <FormattedMessage id="general.home" defaultMessage="Home" />
                            </Link>
                        </li>
                        <li>|</li>
                        <li>
                            <Link to="">
                                <FormattedMessage id="account.login" defaultMessage="Login" />
                            </Link>
                        </li>
                        <li >|</li>
                        <li>
                            <Link to="/account/create">
                                <FormattedMessage id="account.create" defaultMessage="Create account" />
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </Center>
    </DocumentTitle>
);

export default NotFound;