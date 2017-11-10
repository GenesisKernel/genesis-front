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
import * as propTypes from 'prop-types';

import Protypo from './';
import StyledComponent from './StyledComponent';

export interface ITableProps {
    id: string;
    className?: string;
    source?: string;
    columns?: { Name: string, Title: string }[];
}

interface ITableContext {
    protypo: Protypo;
}

const Table: React.SFC<ITableProps> = (props, context: ITableContext) => {
    const source = context.protypo.resolveSource(props.source);

    if (!source) {
        return null;
    }

    let columns: { title: string, index: number }[] = [];
    if (props.columns) {
        props.columns.forEach(col => {
            const index = source.columns.indexOf(col.Name);
            if (-1 !== index) {
                columns.push({
                    title: col.Title,
                    index
                });
            }
        });
    }
    else {
        columns = source.columns.map((col, index) => ({
            title: col,
            index
        }));
    }

    // TODO: Move this handler to Protypo. We'll maybe need to use it in the future
    // for now it's just an exception
    const renderValue = (value: any, type: string) => {
        switch (type) {
            // Default is on top because of linter bug that is warning about break statement
            default:
                return null;

            case 'text':
                return value;

            case 'tags':
                try {
                    const payload = JSON.parse(value);
                    return context.protypo.renderElements(payload, props.id);
                }
                catch (e) {
                    return null;
                }
        }
    };

    return (
        <table className={['table', props.className].join(' ')}>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {source.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col) => (
                            <td key={col.index}>
                                {renderValue(row[col.index], source.types[col.index])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default StyledComponent(Table);