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

import Validation from 'components/Validation';
import * as classnames from 'classnames';
import TagWrapper from '../components/TagWrapper';

export interface IInputProps {
    'format'?: string;
    'name'?: string;
    'width'?: string;
    'ratio'?: string;

    'editable'?: boolean;
    'changePage'?: any;
    'setTagCanDropPosition'?: any;
    'addTag'?: any;
    'moveTag'?: any;
    'copyTag'?: any;
    'removeTag'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    connectDragPreview?: any;
    isDragging?: boolean;
}

const ImageInput: React.SFC<IInputProps> = (props) => {
    const matches = /^ *(\d*) *\/ *(\d*) *$/.exec(props.ratio);
    let ratio: number = null;
    let width: number = null;

    if (matches) {
        const left = parseInt(matches[1], 10);
        const right = parseInt(matches[2], 10);
        ratio = left / right;
    }

    try {
        width = parseInt(props.width, 10);

        // Check if value is NaN, otherwise cropper will throw
        if (width !== width) {
            width = null;
        }
    }
    catch (e) {
        width = null;
    }

    const onClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        props.selectTag({ tag: props.tag });
    };

    const removeTag = () => {
        props.removeTag({ tag: props.tag });
    };

    if (props.editable) {

        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = props;

        const classes = classnames({
            'b-selected': props.selected,
            'input-group': true
        });

        return connectDragPreview(connectDropTarget(
            <span>
                <TagWrapper
                    display="block"
                    selected={props.selected}
                    canDrop={isOver}
                    canDropPosition={props.canDropPosition}
                    onClick={onClick}
                    removeTag={removeTag}
                    connectDragSource={connectDragSource}
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

    return (
        <Validation.components.ValidatedImage
            format={props.format as any}
            name={props.name}
            aspectRatio={ratio}
            width={width}
        />
    );
};

export default ImageInput;