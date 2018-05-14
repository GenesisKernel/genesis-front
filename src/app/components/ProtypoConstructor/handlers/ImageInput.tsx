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
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import EditableBlock from './EditableBlock';

class ImageInput extends EditableBlock {
    render() {
        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;

        const classes = classnames({
            'b-selected': this.props.selected,
            'input-group': true
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
                        <input type="text" className="form-control" readOnly={true}/>
                        <div className="group-span-filestyle input-group-btn">
                            <button className="btn btn-default" type="button">
                                <span className="icon-span-filestyle glyphicon glyphicon-folder-open" />
                                <span className="buttonText" />
                            </button>
                        </div>
                    </div>
                </TagWrapper>
            </span>
        ));
    }
}

export default DnDComponent(ImageInput);