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
import { columnDisplayRules } from './View';

import Wrapper from 'components/Wrapper';
import Table, { ICellRenderer } from 'components/Table';

export interface IHistoryProps {
    id: string;
    table: string;
    columns: {
        name: string;
        type: string;
        perm: string;
        index: string;
    }[];
    data: {
        [key: string]: string;
    }[];
}

const renderValue: ICellRenderer = (value: { type: string, value: any }, rowData) => {
    const displayRule = columnDisplayRules[value.type];
    if (displayRule) {
        return (
            <div>{displayRule.render(value.value)}</div>
        );
    }
    else {
        return (
            <div>{value.value && value.value.toString()}</div>
        );
    }
};

const History: React.SFC<IHistoryProps> = (props) => (
    <Wrapper
        type="fullscreen"
        title={{
            title: 'admin.tables',
            defaultTitle: 'Tables'
        }}
        heading={{
            content: (
                <FormattedMessage id="admin.tables" defaultMessage="Tables" />
            )
        }}
        breadcrumbs={[
            {
                title: (
                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                ),
                url: '/admin/tables'
            },
            {
                title: props.table,
                url: `/admin/tables/${props.table}`
            },
            {
                title: props.id
            },
            {
                title: (
                    <FormattedMessage id="admin.tables.history" defaultMessage="History" />
                )
            }
        ]}
    >
        <Table
            striped
            renderCell={renderValue}
            columns={props.columns.map(column => ({
                title: column.name,
                sortable: false
            }))}
            data={
                props.data.map(row =>
                    props.columns.map(column => ({
                        type: column.type,
                        value: row[column.name]
                    }))
                )
            }
        />
    </Wrapper >
);

export default History;