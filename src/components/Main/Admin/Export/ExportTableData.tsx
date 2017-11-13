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
import * as _ from 'lodash';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Set } from 'immutable';

import Checkbox from 'components/Checkbox';

const StyledTableRow = styled.tr`
    &:hover td {
        cursor: pointer;
        background-color: rgba(0,0,0,0.05);
    }
`;

export interface IExportTableDataProps {
    payload: {
        [key: string]: any;
    }[];
    dataKey: string;
    onSelect?: (values: { [key: string]: any }[]) => void;
    onDataSelect?: (values: { [key: string]: any }[]) => void;
}

interface IExportTableDataState {
    selected: Set<string>;
    selectedData: Set<string>;
}

class ExportTableData extends React.Component<IExportTableDataProps, IExportTableDataState> {
    constructor(props: IExportTableDataProps) {
        super(props);
        this.state = {
            selected: Set(),
            selectedData: Set()
        };
    }

    onSelect(values: string[]) {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.payload.filter(l => -1 !== values.indexOf(l[this.props.dataKey])));
        }
    }

    onDataSelect(values: string[]) {
        if (this.props.onDataSelect) {
            this.props.onDataSelect(this.props.payload.filter(l => -1 !== values.indexOf(l[this.props.dataKey])));
        }
    }

    onToggleSelect(key: string, e: React.ChangeEvent<HTMLInputElement>) {
        const selected = !e.target.checked ? this.state.selected.remove(key) : this.state.selected.add(key);
        this.setState({
            selected
        });

        this.onSelect(selected.toArray());
    }

    onToggleSelectData(key: string, e: React.ChangeEvent<HTMLInputElement>) {
        const selectedData = !e.target.checked ? this.state.selectedData.remove(key) : this.state.selectedData.add(key);
        this.setState({
            selectedData
        });

        this.onDataSelect(selectedData.toArray());
    }

    isSelected(key: string) {
        return this.state.selected.contains(key);
    }

    isDataSelected(key: string) {
        return this.state.selectedData.contains(key);
    }

    isAllSelected() {
        return this.state.selected.count() === this.props.payload.length;
    }

    isAllDataSelected() {
        return this.state.selectedData.count() === this.props.payload.length;
    }

    isSelectable(table: string) {
        return [
            'blocks',
            'contracts',
            'history',
            'keys',
            'languages',
            'menu',
            'pages',
            'signatures'
        ].indexOf(table) === -1;
    }

    render() {
        return (
            <table className="table table-striped m0 bt0">
                <thead>
                    <tr>
                        <th style={{ width: '100%' }}>
                            <FormattedMessage id="admin.export.key" defaultMessage="Key" />
                        </th>
                        <th className="text-center">Structure</th>
                        <th className="text-center">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.payload.filter(row => this.isSelectable(row[this.props.dataKey])).map(row => (
                        <StyledTableRow key={row[this.props.dataKey]}>
                            {_.map(row, (value, key) => (
                                <td key={key}>{value}</td>
                            ))}
                            <td className="text-center">
                                <Checkbox checked={this.isSelected(row[this.props.dataKey])} onChange={this.onToggleSelect.bind(this, row[this.props.dataKey])} />
                            </td>
                            <td className="text-center">
                                <Checkbox checked={this.isDataSelected(row[this.props.dataKey])} onChange={this.onToggleSelectData.bind(this, row[this.props.dataKey])} />
                            </td>
                        </StyledTableRow>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default ExportTableData;