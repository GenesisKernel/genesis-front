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
import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { IContract } from 'lib/api';

import Wrapper from 'components/Wrapper';
import Table, { ICellRenderer } from 'components/Table';

export interface IContractsProps {
    vde?: boolean;
    contracts: IContract[];
}

const renderCell: ICellRenderer = (data, rowData) => {
    switch (rowData.colIndex) {
        case 0: return (
            <div className="text-bold">
                {data}
            </div>
        );

        case 3: return (
            <div className="text-center">
                {'1' === data ?
                    (
                        <em className="fa fa-check" />
                    ) : (
                        <span className="text-muted">-</span>
                    )
                }
            </div>
        );

        case 4: return (
            <div>
                <Link to={`/${rowData.rowData[4] ? 'vde' : 'admin'}/contracts/${rowData.rowData[0]}-${rowData.rowData[1]}`} className="btn btn-link">
                    <FormattedMessage id="admin.contracts.edit" defaultMessage="Edit" />
                </Link>
                {!rowData.rowData[4] && (
                    <Link to={`/admin/contracts/history/${rowData.rowData[0]}-${rowData.rowData[1]}`} className="btn btn-link">
                        <FormattedMessage id="admin.contracts.edit" defaultMessage="History" />
                    </Link>
                )}
            </div>
        );

        default: return data;
    }
};

const Contracts: React.SFC<IContractsProps & InjectedIntlProps> = (props) => (
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
            toolButtons: [
                {
                    url: props.vde ? '/vde/contracts/create' : '/admin/contracts/create',
                    icon: 'icon-plus',
                    title: (
                        <FormattedMessage id="admin.contracts.create" defaultMessage="Create contract" />
                    )
                }
            ]
        }}
        description={
            <FormattedMessage id="admin.contracts.description" defaultMessage="This section is used to create or modify Smart-Contracts. They are used to create or modify data stored in database tables. Access rights for all operations are also managed by Smart-Contracts" />
        }
    >
        <Table
            striped
            renderCell={renderCell}
            data={props.contracts.map(contract => [contract.id, contract.name, contract.address, contract.active, props.vde])}
            columns={[
                { title: 'ID', sortable: true, width: 80 },
                { title: props.intl.formatMessage({ id: 'admin.contracts.name', defaultMessage: 'Name' }), sortable: true },
                { title: props.intl.formatMessage({ id: 'admin.contracts.wallet', defaultMessage: 'Wallet' }), sortable: true, width: 200 },
                { title: props.intl.formatMessage({ id: 'admin.contracts.active', defaultMessage: 'Active' }), sortable: true, width: 1 },
                { width: 100 }
            ]}
        />
    </Wrapper>
);

export default injectIntl(Contracts);