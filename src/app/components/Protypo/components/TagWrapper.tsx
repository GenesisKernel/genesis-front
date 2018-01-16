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
import * as classnames from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: block;
    padding: 0px;
    border: 2px solid transparent;
    position: relative;
    
    &.b-display-inline {
        display: inline-block;
    }
    
    &.b-hover { 
        border: 2px dotted #fec3fd;
    }
    
    &.b-selected-wrapper {
        border: 2px solid #55ADFF;
        z-index: 100;
    }
    
    .b-can-drop-position {
        display: block;
        position: absolute;        
        left: 0;
        width: 100%;        
    }
    
    .b-can-drop-position_before {
        top: -2px;        
        border-top: 2px solid rgba(97, 178, 254, 0.5);
    }
    
    .b-can-drop-position_left {
        width: auto;
        height: 100%;
        left: -2px;        
        border-left: 2px solid rgba(97, 178, 254, 0.5);
    }
    
    .b-can-drop-position_after {
        bottom: -2px;
        border-top: 2px solid rgba(97, 178, 254, 0.5);
    }
    
    .b-can-drop-position_right {
        width: auto;
        height: 100%;
        right: -2px;        
        border-right: 2px solid rgba(97, 178, 254, 0.5);
    }
    
    .b-can-drop-position_left .b-can-drop-position__arrow,
    .b-can-drop-position_right .b-can-drop-position__arrow{
        height: 100%;
    }
    
    .b-can-drop-position__arrow {
        position: relative;
        display: block;        
    }
    
    .b-can-drop-position__arrow > i {
        position: absolute;
        font-size: 16px;
        color: #61B2FE;
        left: 50%;
        margin-left: -7px;
    }
    
    .b-can-drop-position_before .b-can-drop-position__arrow > i {
        top: -15px;
    }
    
    .b-can-drop-position_after .b-can-drop-position__arrow > i {
        bottom: -11px;
    }
    
    .b-can-drop-position_left .b-can-drop-position__arrow > i {
        left: -10px;
        top: 50%;
        margin-left: 0px;
        margin-top: -8px;
    }
    
    .b-can-drop-position_right .b-can-drop-position__arrow > i {
        left: auto;
        right: -10px; 
        top: 50%;
        margin-left: 0px;
        margin-top: -8px;
    }
    
    .b-selected {
        background-color: #E9ECFF;        
    }
    
    .b-controls {
        position: absolute;
        top: -15px;
        right: -2px;
        height: 15px;
        display: inline-block;
        background-color: #55ADFF;
        min-width: 50px;
        line-height: 15px;
        font-size: 10px;
        color: #FFFFFF;
    }
    
    .b-control {
        margin: 0 3px;
        cursor: pointer;
    }
    
    .b-control_move {
        cursor: move;
    }
    
`;

export interface ITagWrapperProps {
    display: string;
    selected: boolean;
    canDrop: boolean;
    canDropPosition: string;
    onClick?: any;
    removeTag?: any;
    connectDragSource: any;
    dropEffect?: string;

}

interface ITagWrapperState {
    hover: boolean;
    dropEffect: string;
}

class TagWrapper extends React.Component<ITagWrapperProps, ITagWrapperState> {

    constructor(props: ITagWrapperProps) {
        super(props);
        this.state = {
            hover: false,
            dropEffect: 'move'
        };
    }

    setOver(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        const state = Object.assign(this.state, { hover: true });
        this.setState(state);
    }

    setOut(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        const state = Object.assign(this.state, { hover: false });
        this.setState(state);
    }

    setDropEffect(effect: string) {
        const props = Object.assign(this.state, { dropEffect: effect });
        this.setState(props);
    }

    render() {
        const classes = classnames({
            'b-selected-wrapper': this.props.selected,
            'b-hover': this.state.hover || this.props.canDrop, // (this.state.hover && !this.props.canDrop) || (this.props.canDrop && this.props.canDropPosition === 'inside')
            ['b-display-' + this.props.display]: true
        });

        return (
            <Wrapper
                className={classes}
                onClick={this.props.onClick.bind(this)}
                onMouseMove={this.setOver.bind(this)}
                onMouseOut={this.setOut.bind(this)}
                data-dropeffect={this.state.dropEffect}
            >
                { this.props.selected &&
                    <div className="b-controls">
                        {this.props.connectDragSource(<span><span className="b-control fa fa-arrows b-control_move" onMouseDown={this.setDropEffect.bind(this, 'move')}/> <span className="b-control fa fa-clone" onMouseDown={this.setDropEffect.bind(this, 'copy')}/></span>)} <span className="b-control fa fa-times" onClick={this.props.removeTag.bind(this)}/>
                    </div>
                }
                {this.props.canDrop && this.props.canDropPosition === 'before' && this.props.display === 'block' &&
                    <div className="b-can-drop-position b-can-drop-position_before">
                        <div className="b-can-drop-position__arrow">
                            <i className="fa fa-caret-up"/>
                        </div>
                    </div>
                }
                {this.props.canDrop && this.props.canDropPosition === 'before' && this.props.display === 'inline' &&
                    <div className="b-can-drop-position b-can-drop-position_left">
                        <div className="b-can-drop-position__arrow">
                            <i className="fa fa-caret-left"/>
                        </div>
                    </div>
                }
                {this.props.canDrop && this.props.canDropPosition === 'after' && this.props.display === 'block' &&
                    <div className="b-can-drop-position b-can-drop-position_after">
                        <div className="b-can-drop-position__arrow">
                            <i className="fa fa-caret-down"/>
                        </div>
                    </div>
                }
                {this.props.canDrop && this.props.canDropPosition === 'after' && this.props.display === 'inline' &&
                    <div className="b-can-drop-position b-can-drop-position_right">
                        <div className="b-can-drop-position__arrow">
                            <i className="fa fa-caret-right"/>
                        </div>
                    </div>
                }
                {this.props.children}
            </Wrapper>
        );
    }
}

export default TagWrapper;
