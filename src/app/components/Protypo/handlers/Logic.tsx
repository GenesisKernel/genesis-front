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
import * as propTypes from 'prop-types';
import StyledComponent from './StyledComponent';

import Protypo from '../';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import { IConstructorElementProps } from 'genesis/editor';

export interface ILogicProps extends IConstructorElementProps {

}

interface ILogicContext {
    protypo: Protypo;
}

const Logic: React.SFC<ILogicProps> = (props, context: ILogicContext) => {
    if (!props.logic) {
        return null;
    }
    const onClick = (e: any) => {
        e.stopPropagation();
        props.selectTag(props.tag);
    };

    const removeTag = () => {
        props.removeTag({tag: props.tag});
    };

    const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = props;

    return connectDragPreview(connectDropTarget(
        <span style={{display: 'inline-block'}}>
            <TagWrapper
                display="inline"
                selected={props.selected}
                canDrop={isOver}
                canDropPosition={props.canDropPosition}
                onClick={onClick}
                removeTag={removeTag}
                connectDragSource={connectDragSource}
                canMove={true}
            >
                <span style={{'backgroundColor': '#FFCC66'}}>
                    {props.tag.tag}
                </span>
            </TagWrapper>
        </span>
    ));

};

Logic.contextTypes = {
    protypo: propTypes.object.isRequired
};

const LogicDnD = DnDComponent(StyledComponent(Logic));
export default LogicDnD;