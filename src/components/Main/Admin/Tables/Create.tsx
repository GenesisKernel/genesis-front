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
import { Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { createTable } from 'modules/admin/actions';

export interface ICreateProps {
    session: string;
    createTable: typeof createTable.started;
}

const Create: React.SFC<ICreateProps> = (props) => (
    <div className="content-wrapper">
        <div className="content-heading">
            <FormattedMessage id="admin.tables" defaultMessage="Tables" />
        </div>
        <ol className="breadcrumb">
            <li>
                <Link to="/admin/tables">
                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                </Link>
            </li>
            <li>
                <FormattedMessage id="admin.tables.create" defaultMessage="Create" />
            </li>
        </ol>
        <Panel bsStyle="default">
        </Panel>
    </div>
);

export default Create;