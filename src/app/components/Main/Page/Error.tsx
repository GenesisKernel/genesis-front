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
import { FormattedMessage } from 'react-intl';

import DocumentTitle from 'components/DocumentTitle';
import Center from 'components/Center';

export interface IErrorProps {
    error: string;
}

const Error: React.SFC<IErrorProps> = (props) => (
    <DocumentTitle title="general.error" defaultTitle="Error">
        <Center>
            <div className="text-muted">
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">500</div>
                    <p className="lead m0">
                        <FormattedMessage id="general.error.timeout" defaultMessage="Internal server error" />
                    </p>
                    <p>
                        <div><FormattedMessage id="general.error.timeout.desc" defaultMessage="The page you are looking for could not be processed" /></div>
                        <div>{props.error}</div>
                    </p>
                </div>
            </div>
        </Center>
    </DocumentTitle>
);

export default Error;