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
import { columnDisplayRules } from '../Tables/View';

import Table, { ICellRenderer } from 'components/Table';
import Wrapper from 'components/Wrapper';
import ContractHistory from './ContractHistory';

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

const HistoryViewer: React.SFC<IHistoryProps> = props => {
    switch (props.table) {
        case 'contracts':
            return (
                <ContractHistory id={props.id} contracts={props.data.reverse() as any[]} />
            );

        default:
            return (
                <Table
                    striped
                    renderCell={renderValue}
                    columns={props.columns.map(column => ({
                        title: column.name,
                        sortable: false
                    }))}
                    data={
                        props.data.reverse().map(row =>
                            props.columns.map(column => ({
                                type: column.type,
                                value: row[column.name]
                            }))
                        )
                    }
                />
            );
    }
};

const History: React.SFC<IHistoryProps> = (props) => (
    <Wrapper
        type="fullscreen"
        title={{
            title: 'admin.history',
            defaultTitle: 'History'
        }}
        heading={{
            content: (
                <FormattedMessage id="admin.history" defaultMessage="History" />
            )
        }}
        breadcrumbs={[
            {
                url: '/admin/tables',
                title: (
                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                )
            },
            {
                url: `/admin/table?table=${props.table}`,
                title: props.table
            },
            {
                title: (
                    <FormattedMessage id="admin.history" defaultMessage="History" />
                )
            },
            {
                title: props.id
            }
        ]}
        description={
            <FormattedMessage id="admin.history.description" defaultMessage="This section is used to view changes that vere made to the specific entry of your table" />
        }
    >
        {props.data && props.data.length ?
            (
                <HistoryViewer {...props} />
            ) :
            (
                <div className="content-wrapper">
                    <FormattedMessage id="admin.tables.history.empty" defaultMessage="This element has no history" />
                </div>
            )
        }
    </Wrapper >
);

export default History;