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
import { Button } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Link } from 'react-router-dom';
import { IParameterResponse } from 'lib/api';

import Wrapper from 'components/Wrapper';
import Table, { ICellRenderer } from 'components/Table';

export interface IParametersProps {
    vde?: boolean;
    parameters: IParameterResponse[];
}

const renderParameter: ICellRenderer = (value, rowData) => {
    switch (rowData.colIndex) {
        case 0: return (
            <div className="text-bold">
                {value}
            </div>
        );

        case 1: return value ? value : (
            <em className="text-muted">
                <FormattedMessage id="admin.parameters.empty" defaultMessage="Empty parameter" />
            </em>
        );

        case 3: return (
            <Link to={`/${rowData.rowData[3] ? 'vde' : 'admin'}/parameters/${rowData.rowData[0]}`}>
                <Button bsStyle="default" className="btn-labeled btn-icon">
                    <span className="btn-label">
                        <em className="icon-pencil" />
                    </span>
                </Button>
            </Link>
        );

        default: return value;
    }
};

const Parameters: React.SFC<IParametersProps & InjectedIntlProps> = (props) => (
    <Wrapper
        type="fullscreen"
        title={{
            title: 'admin.parameters',
            defaultTitle: 'Ecosystem parameters'
        }}
        heading={{
            content: (
                <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
            ),
            toolButtons: [
                {
                    url: props.vde ? '/vde/parameters/stylesheet' : '/admin/parameters/stylesheet',
                    icon: 'icon-picture',
                    title: (
                        <FormattedMessage id="admin.parameters.stylesheet" defaultMessage="Manage stylesheet" />
                    )
                },
                {
                    url: props.vde ? '/vde/parameters/create' : '/admin/parameters/create',
                    icon: 'icon-picture',
                    title: (
                        <FormattedMessage id="admin.parameters.create" defaultMessage="Create" />
                    )
                }
            ]
        }}
        description={
            <FormattedMessage id="admin.languages.description" defaultMessage="This section is used to configure stored reusable parameters. They are used to control basic ecosystem behavior, but you can create your own ones and use them in the template engine or smart-contracts" />
        }
    >
        <Table
            striped
            renderCell={renderParameter}
            columns={[
                { title: props.intl.formatMessage({ id: 'admin.parameters.name', defaultMessage: 'Name' }), sortable: true, width: 160 },
                { title: props.intl.formatMessage({ id: 'admin.parameters.value', defaultMessage: 'Value' }), sortable: true },
                { title: props.intl.formatMessage({ id: 'admin.parameters.conditions', defaultMessage: 'Conditions' }), sortable: true, width: 250 },
                { width: 1 }
            ]}
            data={props.parameters.map(p => [p.name, p.value, p.conditions, props.vde])}
        />
    </Wrapper>
);

export default injectIntl(Parameters);