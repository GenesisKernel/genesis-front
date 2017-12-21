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
import { OnPasteStripFormatting, startHoverTimer, getDropPosition } from 'lib/constructor';
import StyledComponent from './StyledComponent';
import * as classnames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';

const Source = {
    beginDrag(props: IDivProps, monitor: any, component: any) {
        return {
            tag: props.tag
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

        // alert('drop ' + ' tag ' + props.tag.id);

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
    hover(props: IDivProps, monitor: any, component: any) {
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

export interface IDivProps {
    'className'?: string;
    'class'?: string;
    'children': any;
    'editable'?: boolean;
    'changePage'?: any;
    'setTagCanDropPosition'?: any;
    'addTag'?: any;
    'moveTag'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    isDragging?: boolean;
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

export default DragSource(ItemTypes.SOURCE, Source, collectSource)(
    DropTarget(ItemTypes.SOURCE, Target, collectTarget)(
        StyledComponent(Div)
    )
);