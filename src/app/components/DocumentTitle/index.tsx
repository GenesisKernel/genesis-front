/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import NativeDocumentTitle from 'react-document-title';

export interface IDocumentTitleProps {
    title: string;
}

const DocumentTitle: React.SFC<IDocumentTitleProps & InjectedIntlProps> = props => {
    const staticTitle = props.intl.formatMessage({
        id: 'general.title',
        defaultMessage: 'Apla'
    });

    return (
        <NativeDocumentTitle title={props.title || staticTitle}>
            {props.children}
        </NativeDocumentTitle>
    );
};

export default injectIntl(DocumentTitle);