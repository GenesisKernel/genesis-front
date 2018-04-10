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
import { OnPasteStripFormatting } from 'lib/constructor';
import StyledComponent from './StyledComponent';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import * as classnames from 'classnames';
import { IConstructorElementProps } from 'genesis/editor';
import ContentEditable from 'react-contenteditable';

export interface ISpanProps extends IConstructorElementProps {
    'className'?: string;
    'class'?: string;
    'childrenText'?: string;
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
        this.props.selectTag(this.props.tag);
    }

    handleChange(e: any) {
        this.props.changePage({text: e.target.value, tagID: this.props.tag.id});
    }

    removeTag() {
        this.props.removeTag({ tag: this.props.tag });
    }

    render() {
        if (this.props.editable) {
            const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;

            const classes = classnames({
                [this.props.class]: true,
                [this.props.className]: true,
                'b-selected': this.props.selected
            });

            return connectDragPreview(connectDropTarget(
                <span style={{display: 'inline-block'}}>
                    <TagWrapper
                        display="inline"
                        selected={this.props.selected}
                        canDrop={isOver}
                        canDropPosition={this.props.canDropPosition}
                        onClick={this.onClick.bind(this)}
                        removeTag={this.removeTag.bind(this)}
                        connectDragSource={connectDragSource}
                        canMove={true}
                    >
                    {(this.props.selected && this.props.childrenText !== null && this.props.childrenText.length >= 0) ? (
                        <ContentEditable
                            tagName="span"
                            className={classes}
                            html={this.props.childrenText}
                            onChange={this.handleChange.bind(this)}
                        />
                    ) : (
                        <span
                            className={classes}
                        >
                            {this.props.children}
                        </span>
                    )}
                    </TagWrapper>
                </span>
            ));
        }
        return (
            <span className={[this.props.class, this.props.className].join(' ')}>
                {this.props.children}
            </span>
        );

    }
}

export default StyledComponent(Span);
export const SpanDnD = DnDComponent(StyledComponent(Span));