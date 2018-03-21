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
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DocumentTitle, { IDocumentTitleProps } from '.';

export interface ILocalizedDocumentTitleProps extends IDocumentTitleProps {
    defaultTitle?: string;
}

const LocalizedDocumentTitle: React.SFC<ILocalizedDocumentTitleProps & InjectedIntlProps> = props => (
    <DocumentTitle
        title={props.intl.formatMessage({
            id: 'general.title.format',
            defaultMessage: '{title} | Genesis'
        }, {
                title: props.intl.formatMessage({
                    id: props.title,
                    defaultMessage: props.defaultTitle || props.title
                })
            }
        )}
    >
        {props.children}
    </DocumentTitle>
);

export default injectIntl(LocalizedDocumentTitle);