// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
            template: props.template,
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
    element?: string;
    template?: string;
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