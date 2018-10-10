// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
                            <Link to="/wallet/create">
                                <FormattedMessage id="wallet.create" defaultMessage="Create wallet" />
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </Center>
    </LocalizedDocumentTitle>
);

export default NotFound;