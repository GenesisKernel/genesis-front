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

import Wrapper from 'components/Wrapper';
import HistoryViewer from 'containers/Main/containers/Admin/HistoryViewer';

export interface IHistoryProps {
    id: string;
    name: string;
}

const History: React.SFC<IHistoryProps> = (props) => (
    <Wrapper
        type="fullscreen"
        title={{
            title: 'admin.contracts',
            defaultTitle: 'Smart contracts'
        }}
        heading={{
            content: (
                <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
            ),
        }}
        breadcrumbs={[
            {
                url: '/admin/contracts',
                title: (
                    <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
                )
            },
            {
                title: (
                    <FormattedMessage id="admin.tables.history" defaultMessage="History" />
                )
            },
            {
                title: props.name || props.id
            }
        ]}
    >
        <HistoryViewer id={props.id} table="contracts" />
    </Wrapper >
);

export default History;