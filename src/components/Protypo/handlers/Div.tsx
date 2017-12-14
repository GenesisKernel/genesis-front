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
import { OnPasteStripFormatting, startHoverTimer } from 'lib/constructor';
import StyledComponent from './StyledComponent';
import * as classnames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom'

const Source = {
    beginDrag(props: IDivProps, monitor: any, component: any) {
        return {
            element: props.tag,
            component: component
        };
    }
};

const Target = {
    drop(props: IDivProps, monitor: any, component: any) {
        if (monitor.didDrop()) {
            return;
        }

        const droppedItem = monitor.getItem();

        // monitor.getClientOffset().y - относительно окна

        alert('drop!' + JSON.stringify(droppedItem.element) + ' to ' + props.tag.id + ", y: " + monitor.getClientOffset().y);
    },
    hover(props: IDivProps, monitor: any, component: any) {
        if (!monitor.isOver({ shallow: true })) {
            return;
        }
        if (!startHoverTimer()) {
            return;
        }
        const gap: number = 5;

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;


        if (hoverClientY < gap || hoverClientX < gap) {
            // insert before
            // alert('insert before');
            props.changePage({ canDropPosition: 'before', tagID: props.tag.id });
            return;
        }

        if (hoverClientY > hoverBoundingRect.height - gap || hoverClientX > hoverBoundingRect.width - gap) {
            props.changePage({ canDropPosition: 'after', tagID: props.tag.id });
            return;
        }

        props.changePage({ canDropPosition: 'inside', tagID: props.tag.id });
    }
};

function collectSource(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function collectTarget(connect?: any, monitor?: any) {
    let x = 0;
    let y = 0;

    // const sourceItem = monitor.getItem();
    //const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // if(monitor && monitor.getClientOffset()) {
    //     x = monitor.getClientOffset().x;
    //     y = monitor.getClientOffset().y;
    // }
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        x,
        y
    };
}

const ItemTypes = {
    SOURCE: 'element'
};

export interface IDivProps {
    'className'?: string;
    'class'?: string;
    'children': any;
    'editable'?: boolean;
    'changePage'?: any;
    'setTagCanDropPosition'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    isDragging?: boolean;

    x?: number;
    y?: number;
}

interface IDivState {
    contentEditable: boolean;
}

class Div extends React.Component<IDivProps, IDivState> {
    constructor(props: IDivProps) {
        super(props);
        this.state = {
            contentEditable: false
        };
    }

    onPaste(e: any) {
        OnPasteStripFormatting(this, e);
    }

    onClick(e: any) {
        this.props.selectTag({ tag: this.props.tag });
        this.setState({
            contentEditable: true
        });
    }

    onBlur(e: any) {
        this.props.changePage({ text: e.target.textContent, tagID: this.props.tag.id });
        this.setState({
            contentEditable: false
        });
    }

    render() {
        if (this.props.editable) {
            const { connectDropTarget, isOver } = this.props;
            const { connectDragSource, isDragging } = this.props;

            const classes = classnames({
                [this.props.class]: true,
                [this.props.className]: true,
                'editable': this.props.selected,
                'can-drop': isOver,
                ['can-drop_' + this.props.canDropPosition]: true,
                'is-dragging': isDragging
            });

            // <div style={{ position: 'absolute', width: '10px', height: '10px', left: 0, top: 0, ba }}></div>

            return connectDragSource(connectDropTarget(
                <div
                    className={classes}
                    contentEditable={this.state.contentEditable}
                    onPaste={this.onPaste.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onClick={this.onClick.bind(this)}
                >
                    {this.props.children}
                </div>
            ));
        }
        return (
            <div
                className={[this.props.class, this.props.className].join(' ')}
            >
                {this.props.children}
            </div>
        );
    }
}

export default
DragSource(ItemTypes.SOURCE, Source, collectSource) (
    DropTarget(ItemTypes.SOURCE, Target, collectTarget)(
        StyledComponent(Div)
    )
);