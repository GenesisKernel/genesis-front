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
import * as classnames from 'classnames';

import Protypo from '../';
import StyledComponent from './StyledComponent';

import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';

export interface ITableProps {
    id: string;
    className?: string;
    source?: string;
    columns?: { Name: string, Title: string }[];

    'editable'?: boolean;
    'changePage'?: any;
    'setTagCanDropPosition'?: any;
    'addTag'?: any;
    'moveTag'?: any;
    'copyTag'?: any;
    'removeTag'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    connectDragPreview?: any;
    isDragging?: boolean;
}

interface ITableContext {
    protypo: Protypo;
}

const Table: React.SFC<ITableProps> = (props, context: ITableContext) => {

    if (props.editable) {
        const onClick = (e: any) => {
            e.stopPropagation();
            props.selectTag({ tag: props.tag });
        };

        const removeTag = () => {
            props.removeTag({ tag: props.tag });
        };

        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = props;

        const classes = classnames({
            'table': true,
            [props.className]: true,
            'b-selected': props.selected
        });

        return connectDragPreview(connectDropTarget(
            <span>
                <TagWrapper
                    display="block"
                    selected={props.selected}
                    canDrop={isOver}
                    canDropPosition={props.canDropPosition}
                    onClick={onClick}
                    removeTag={removeTag}
                    connectDragSource={connectDragSource}
                >
                    <table
                        className={classes}
                    >
                        <thead>
                        <tr>
                            <th>Column 1</th>
                            <th>Column 2</th>
                            <th>Column 3</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                Row 1
                            </td>
                            <td>
                                Value
                            </td>
                            <td>
                                Value
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Row 2
                            </td>
                            <td>
                                Value
                            </td>
                            <td>
                                Value
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </TagWrapper>
            </span>
        ));
    }

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

export default DnDComponent(StyledComponent(Table));