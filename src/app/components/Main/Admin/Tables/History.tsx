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

import Wrapper from 'components/Wrapper';
import HistoryViewer from 'containers/Main/containers/Admin/HistoryViewer';

export interface IHistoryProps {
    id: string;
    table: string;
}

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
        <HistoryViewer {...props} />
    </Wrapper >
);

export default History;