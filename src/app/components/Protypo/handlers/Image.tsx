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

import StyledComponent from './StyledComponent';
import * as classnames from 'classnames';
import DnDComponent from './DnDComponent';

export interface IImageProps {
    'className'?: string;
    'class'?: string;
    'src'?: string;
    'alt'?: string;

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

const Image: React.SFC<IImageProps> = (props) => {
    const onClick = (e: any) => {
        e.stopPropagation();
        props.selectTag({ tag: props.tag });
    };

    if (props.editable) {
        const { connectDropTarget, isOver } = props;
        const { connectDragSource, isDragging } = props;

        const classes = classnames({
            [props.class]: true,
            'editable': props.selected,
            'can-drop': isOver,
            ['can-drop_' + props.canDropPosition]: true,
            'is-dragging': isDragging
        });

        return connectDragSource(connectDropTarget(
            <img
                className={classes}
                onClick={onClick}
                src={props.src || ''}
                alt={props.alt}
            />
        ));
    }

    return (
        <img className={[props.class, props.className].join(' ')} src={props.src || ''} alt={props.alt} />
    );
};

export default DnDComponent(StyledComponent(Image));