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
import { Button } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';

import Wrapper from 'components/Wrapper';
import PageLink from 'containers/Routing/PageLink';
import Table, { ICellRenderer } from 'components/Table';

export interface ILanguagesProps {
    vde?: boolean;
    resources: {
        id: string;
        res: any;
        name: string;
        conditions: string;
    }[];
}

const renderLocale: ICellRenderer = (value, rowData) => {
    switch (rowData.colIndex) {
        case 0: return (
            <div className="text-bold">
                {value}
            </div>
        );

        case 3: return (
            <PageLink page="edit-lang" params={{ id: rowData.rowData[0] }} vde={!!rowData.rowData[4]}>
                <Button bsStyle="default" className="btn-labeled btn-icon">
                    <span className="btn-label">
                        <em className="icon-pencil" />
                    </span>
                </Button>
            </PageLink>
        );

        default: return value;
    }
};

const Languages: React.SFC<ILanguagesProps & InjectedIntlProps> = (props) => (
    <Wrapper
        type="fullscreen"
        title={{
            title: 'admin.languages',
            defaultTitle: 'Language resources'
        }}
        heading={{
            content: (
                <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
            ),
            toolButtons: [
                {
                    url: props.vde ? '/vdeadmin/create-lang' : '/admin/create-lang',
                    icon: 'icon-plus',
                    title: (
                        <FormattedMessage id="admin.languages.create" defaultMessage="Create localization" />
                    )
                }
            ]
        }}
        description={
            <FormattedMessage id="admin.languages.description" defaultMessage="This section is used to configure string localizations. You can use it to translate your application to different languages" />
        }
    >
        <Table
            striped
            renderCell={renderLocale}
            columns={[
                { title: 'ID', sortable: true, width: 80 },
                { title: props.intl.formatMessage({ id: 'admin.languages.name', defaultMessage: 'Name' }), sortable: true, width: 200 },
                { title: props.intl.formatMessage({ id: 'admin.languages.resources', defaultMessage: 'Resources' }) },
                { width: 1 }
            ]}
            data={props.resources.map(p => [p.id, p.name, p.res, p.conditions, props.vde])}
        />
    </Wrapper>
);

export default injectIntl(Languages);