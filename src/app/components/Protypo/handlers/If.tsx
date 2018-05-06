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

import React from 'react';
import StyledComponent from './StyledComponent';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import classnames from 'classnames';
import Switch from 'components/Main/Editor/Designer/Switch';
import { IConstructorElementProps } from 'genesis/editor';

export interface IIfProps extends IConstructorElementProps {
    className?: string;
    class?: string;
    tail?: any;
}

interface IIfState {
    condition: boolean;
}

class If extends React.Component<IIfProps, IIfState> {
    constructor(props: IIfProps) {
        super(props);
        this.state = {
            condition: true
        };
    }

    onClick(e: any) {
        e.stopPropagation();
        this.props.selectTag(this.props.tag);
    }

    removeTag() {
        this.props.removeTag({ tag: this.props.tag });
    }

    toggleCondition() {
        this.setState({
            condition: !this.state.condition
        });
    }

    render() {
        if (!this.props.logic) {
            return null;
        }
        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;

        const classes = classnames({
            'b-selected': this.props.selected
        });

        return connectDragPreview(connectDropTarget(
            <span>
                <TagWrapper
                    display="block"
                    selected={this.props.selected}
                    canDrop={isOver}
                    canDropPosition={this.props.canDropPosition}
                    onClick={this.onClick.bind(this)}
                    removeTag={this.removeTag.bind(this)}
                    connectDragSource={connectDragSource}
                    canMove={true}
                >
                    <div
                        className={classes}
                    >
                        <span style={{ 'backgroundColor': '#FFCC66' }}>If
                        <Switch
                            initialValue={this.state.condition}
                            onValue={true}
                            offValue={false}
                            onChange={this.toggleCondition.bind(this)}
                        /> &#123;
                    </span>
                        {this.state.condition && (<div>{this.props.children} </div>) || (<span>...</span>)}
                        <span style={{ 'backgroundColor': '#FFCC66' }}>&#125;</span>
                        {!this.state.condition && this.props.tail}
                    </div>
                </TagWrapper>
            </span>
        ));
    }
}

export default DnDComponent(StyledComponent(If));
