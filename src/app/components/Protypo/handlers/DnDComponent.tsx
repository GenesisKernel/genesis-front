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
import { DropTarget, DragSource } from 'react-dnd';
import { startHoverTimer, getDropPosition } from 'lib/constructor';

const Source = {
    beginDrag(props: any, monitor: any, component: any) {
        return {
            tag: props.tag
        };
    }
};

const Target = {
    drop(props: any, monitor: any, component: any) {
        if (monitor.didDrop()) {
            return;
        }

        const droppedItem = monitor.getItem();

        if (droppedItem.new) {
            props.addTag({
                tag: droppedItem,
                destinationTagID: props.tag.id,
                position: getDropPosition(monitor, component)
            });
        }
        else {
            props.moveTag({
                tag: droppedItem.tag,
                destinationTagID: props.tag.id,
                position: getDropPosition(monitor, component)
            });
        }
    },
    hover(props: any, monitor: any, component: any) {
        if (!monitor.isOver({ shallow: true })) {
            return;
        }
        if (!startHoverTimer()) {
            return;
        }

        props.changePage({ canDropPosition: getDropPosition(monitor, component), tagID: props.tag.id });
    }
};

function collectSource(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
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

type TComponentConstructor<T> = React.ComponentClass<T & IStyledComponentProps> | React.SFC<T & IStyledComponentProps>;

interface IStyledComponentProps {

}

export default function dndComponent<T>(Component: TComponentConstructor<T & IStyledComponentProps>) {
    return DragSource(ItemTypes.SOURCE, Source, collectSource)(
        DropTarget(ItemTypes.SOURCE, Target, collectTarget)(Component)
    );
}
