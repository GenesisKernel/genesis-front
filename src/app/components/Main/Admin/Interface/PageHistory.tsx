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

export interface IPageHistoryProps {
    id: string;
    name: string;
}

const PageHistory: React.SFC<IPageHistoryProps> = (props) => (
    <Wrapper
        type="fullscreen"
        title={{
            title: 'admin.interface',
            defaultTitle: 'Interface'
        }}
        heading={{
            content: (
                <FormattedMessage id="admin.interface" defaultMessage="Interface" />
            ),
        }}
        breadcrumbs={[
            {
                url: '/admin/interface',
                title: (
                    <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                )
            },
            {
                title: (
                    <FormattedMessage id="admin.interface.pages" defaultMessage="Pages" />
                )
            },
            {
                title: (
                    <FormattedMessage id="admin.interface.history" defaultMessage="History" />
                )
            },
            {
                title: props.name || props.id
            }
        ]}
    >
        <HistoryViewer id={props.id} table="pages" />
    </Wrapper >
);

export default PageHistory;