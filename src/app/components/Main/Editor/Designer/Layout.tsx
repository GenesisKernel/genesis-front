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
import * as classnames from 'classnames';
import { DropTarget } from 'react-dnd';

const layoutTarget = {
    drop(props: ILayoutProps, monitor: any) {
        if (monitor.didDrop()) {
            return;
        }
        const droppedItem = monitor.getItem();

        if (droppedItem.new) {
            props.addTag({
                tag: droppedItem
            });
        }
        else {
            switch (droppedItem.dropEffect) {
                case 'move':
                    props.moveTag({
                        tag: droppedItem.tag
                    });
                    break;
                case 'copy':
                    props.copyTag({
                        tag: droppedItem.tag
                    });
                    break;
                default:
                    break;
            }

        }
    }
};

function collect(connect?: any, monitor?: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true })
    };
}

const ItemTypes = {
    SOURCE: 'element'
};

interface ILayoutProps {
    grid: boolean;
    connectDropTarget?: any;
    isOver?: boolean;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
}

interface ILayoutState {
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);
    }
    render() {
        const { connectDropTarget, isOver } = this.props;

        const classes = classnames({
            'b-constructor-layout': true,
            'b-constructor-layout_grid': this.props.grid,
            'b-constructor-layout_can-drop': isOver
        });

        return connectDropTarget(
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.SOURCE, layoutTarget, collect)(Layout);