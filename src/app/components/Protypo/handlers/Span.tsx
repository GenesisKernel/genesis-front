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
import { OnPasteStripFormatting } from 'lib/constructor';
import StyledComponent from './StyledComponent';
import DnDComponent from './DnDComponent';
import * as classnames from 'classnames';

export interface ISpanProps {
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

interface ISpanState {
}

class Span extends React.Component<ISpanProps, ISpanState> {

    constructor(props: ISpanProps) {
        super(props);
    }

    onPaste(e: any) {
        OnPasteStripFormatting(this, e);
    }

    onClick(e: any) {
        e.stopPropagation();
        this.props.selectTag({ tag: this.props.tag });
    }

    onBlur(e: any) {
        e.stopPropagation();
        this.props.changePage({ text: e.target.innerHTML, tagID: this.props.tag.id });
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

            return connectDragSource(connectDropTarget(
                <span
                    className={classes}
                    contentEditable={this.props.selected}
                    onPaste={this.onPaste.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onClick={this.onClick.bind(this)}
                >
                    {this.props.children}
                </span>
            ));
        }
        return (
            <p
                className={[this.props.class, this.props.className].join(' ')}
            >
                {this.props.children}
            </p>
        );

    }
}

export default DnDComponent(StyledComponent(Span));