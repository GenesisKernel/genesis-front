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

export interface IImportTableDataProps {
    payload: {
        Table: string;
        Columns: string[];
        Data: any[][]
    }[];
    onPrune: (table: string, index: number) => void;
}

const ImportTableData: React.SFC<IImportTableDataProps> = props => (
    <div>
        {props.payload.sort((a, b) => a.Table > b.Table ? 1 : -1).filter(l => l.Data.length).map(table => (
            <table key={table.Table} className="table table-striped table-bordered m0 bt0">
                <thead>
                    <tr>
                        {table.Columns.map((col, colIndex) => (
                            <th key={colIndex}>{col}</th>
                        ))}
                        <th style={{ width: 1 }} />
                        <th style={{ width: 1 }} />
                    </tr>
                </thead>
                <tbody>
                    {table.Data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                            <td>
                                <Button className="btn-labeled btn-icon" disabled>
                                    <span className="btn-label">
                                        <em className="fa fa-edit" />
                                    </span>
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-labeled btn-icon" onClick={() => props.onPrune(table.Table, rowIndex)}>
                                    <span className="btn-label">
                                        <em className="fa fa-trash" />
                                    </span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ))}
    </div>
);

export default ImportTableData;