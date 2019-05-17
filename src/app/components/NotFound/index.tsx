/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Center from 'components/Center';

export interface INotFoundProps {
    main?: boolean;
}

const NotFound: React.SFC<INotFoundProps> = (props) => (
    <LocalizedDocumentTitle title="general.notfound" defaultTitle="Not found">
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
                                <FormattedMessage id="wallet.login" defaultMessage="Login" />
                            </Link>
                        </li>
                        <li >|</li>
                        <li>
                            <Link to="/account/create">
                                <FormattedMessage id="wallet.create" defaultMessage="Create account" />
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </Center>
    </LocalizedDocumentTitle>
);

export default NotFound;