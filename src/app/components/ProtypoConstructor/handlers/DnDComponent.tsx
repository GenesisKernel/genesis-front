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
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';
import { startHoverTimer, getDropPosition } from 'lib/constructor';

const Source = {
    beginDrag(props: any, monitor: any, component: any) {
        let dropEffect = 'move';
        const el = findDOMNode(component);
        if (el) {
            const re = /data\-dropeffect="([a-z]+)"/i;
            if (re) {
                const res = el.innerHTML.match(re);
                if (res) {
                    dropEffect = res[1];
                }
            }
        }
        return {
            tag: props.tag,
            dropEffect
        };
    }
};

const isSameTag = (droppedItem: any, id: string): boolean => {
    return droppedItem.tag && droppedItem.tag.id && droppedItem.tag.id === id;
};

const Target = {
    drop(props: any, monitor: any, component: any) {
        if (monitor.didDrop()) {
            return;
        }

        const droppedItem = monitor.getItem();

        if (isSameTag(droppedItem, props.tag.id)) {
            return;
        }

        if (droppedItem.new) {
            props.addTag({
                tag: droppedItem,
                destinationTagID: props.tag.id,
                position: getDropPosition(monitor, component, props.tag)
            });
        }
        else {
            const tagInfo = {
                tag: droppedItem.tag,
                destinationTagID: props.tag.id,
                position: getDropPosition(monitor, component, props.tag)
            };
            switch (droppedItem.dropEffect) {
                case 'move':
                    props.moveTag(tagInfo);
                    break;
                case 'copy':
                    props.copyTag(tagInfo);
                    break;
                default:
                    break;
            }
        }
    },
    hover(props: any, monitor: any, component: any) {
        if (!monitor.isOver({ shallow: true })) {
            return;
        }
        if (!startHoverTimer()) {
            return;
        }
        const droppedItem = monitor.getItem();

        if (isSameTag(droppedItem, props.tag.id)) {
            return;
        }
        props.setTagCanDropPosition({ position: getDropPosition(monitor, component, props.tag), tagID: props.tag.id });
    }
};

function collectSource(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

function collectTarget(connect?: any, monitor?: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true })
    };
}

const ItemTypes = {
    SOURCE: 'element'
};

type TComponentConstructor<T> = React.ComponentClass<T> | React.SFC<T>;

export default function dndComponent<T>(Component: TComponentConstructor<T>) {
    return DragSource<T>(ItemTypes.SOURCE, Source, collectSource)(
        DropTarget<T>(ItemTypes.SOURCE, Target, collectTarget)(Component)
    );
}