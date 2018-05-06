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
import * as classnames from 'classnames';

import StyledComponent from './StyledComponent';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import EditableBlock from './EditableBlock';

class Input extends EditableBlock {
    render() {
        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;

        const classes = classnames({
            [this.props.class]: true,
            [this.props.className]: true,
            'b-selected': this.props.selected
        });

        return connectDragPreview(connectDropTarget(
            <span style={{ display: 'inline-block' }}>
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
                    <input
                        name={this.props.name}
                        className={classes}
                        disabled={!!this.props.disabled}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                    />
                </TagWrapper>
            </span>
        ));
    }
}

export default DnDComponent(StyledComponent(Input));