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
import * as propTypes from 'prop-types';

import Protypo from '../';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';

export interface IDBFindProps {
    columns: string[];
    types: string[];
    data: string[][];
    name: string;
    source: string;

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

interface IDBFindContext {
    protypo: Protypo;
}

const DBFind: React.SFC<IDBFindProps> = (props, context: IDBFindContext) => {

    if (props.editable) {
        const onClick = (e: any) => {
            e.stopPropagation();
            props.selectTag({tag: props.tag});
        };

        const removeTag = () => {
            props.removeTag({tag: props.tag});
        };

        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = props;

        return connectDragPreview(connectDropTarget(
            <span style={{display: 'inline-block'}}>
                <TagWrapper
                    display="inline"
                    selected={props.selected}
                    canDrop={isOver}
                    canDropPosition={props.canDropPosition}
                    onClick={onClick}
                    removeTag={removeTag}
                    connectDragSource={connectDragSource}
                >
                    <span style={{'backgroundColor': '#FFCC66'}}>
                        DBFind
                    </span>
                </TagWrapper>
            </span>
        ));
    }

    context.protypo.registerSource(props.source, {
        columns: props.columns,
        types: props.types,
        data: props.data
    });
    return null;
};

DBFind.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default DBFind;
export const DBFindDnD = DnDComponent(DBFind);