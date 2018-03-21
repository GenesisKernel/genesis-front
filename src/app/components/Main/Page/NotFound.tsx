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
import { FormattedMessage } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Center from 'components/Center';

const NotFound: React.SFC = (props) => (
    <LocalizedDocumentTitle title="general.error" defaultTitle="Error">
        <Center>
            <div className="text-muted">
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">404</div>
                    <p className="lead m0">
                        <FormattedMessage id="general.error" defaultMessage="Error" />
                    </p>
                    <p>
                        <FormattedMessage id="general.error.notfound" defaultMessage="The page you are looking for does not exists" />
                    </p>
                </div>
            </div>
        </Center>
    </LocalizedDocumentTitle>
);

export default NotFound;