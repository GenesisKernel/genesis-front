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
import { DragSource } from 'react-dnd';

const ItemTypes = {
    SOURCE: 'element'
};

const Source = {
    beginDrag(props: ISourceElementProps) {
        return {
            new: true,
            element: props.element,
            text: props.text
        };
    }
};

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

interface ISourceElementProps {
    text: string;
    element: string;
    connectDragSource?: any;
    connectDragPreview?: any;
    isDragging?: boolean;
}

interface ISourceElementState {
    collapsed: boolean;
}

class SourceElement extends React.Component<ISourceElementProps, ISourceElementState> {
    constructor(props: ISourceElementProps) {
        super(props);
    }
    render() {
        const { connectDragSource, connectDragPreview, isDragging } = this.props;
        return connectDragPreview(connectDragSource(
            <li>
                {this.props.text} {isDragging ? '' : ''}
            </li>
            ),
            { offsetY: -10 }
        );
    }
}

// export default SourceElement;
export default DragSource(ItemTypes.SOURCE, Source, collect)(SourceElement);