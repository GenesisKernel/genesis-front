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
        // if (droppedItem.tag && droppedItem.tag.id && props.tag.id === droppedItem.tag.id) {
        //     return;
        // }

        if (droppedItem.new) {
            props.addTag({
                tag: droppedItem,
                destinationTagID: props.tag.id,
                position: getDropPosition(monitor, component, props.tag)
            });
        }
        else {
            switch (droppedItem.dropEffect) {
                case 'move':
                    props.moveTag({
                        tag: droppedItem.tag,
                        destinationTagID: props.tag.id,
                        position: getDropPosition(monitor, component, props.tag)
                    });
                    break;
                case 'copy':
                    props.copyTag({
                        tag: droppedItem.tag,
                        destinationTagID: props.tag.id,
                        position: getDropPosition(monitor, component, props.tag)
                    });
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