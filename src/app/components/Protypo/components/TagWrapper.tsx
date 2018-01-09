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
    padding: 8px;
    border: 2px solid transparent;
    position: relative;
    
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
    
    .b-can-drop-position_after {
        bottom: -2px;
        border-top: 2px solid rgba(97, 178, 254, 0.5);
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
        margin-left: -3px;
    }
    
    .b-can-drop-position_before .b-can-drop-position__arrow > i {
        top: -15px;
    }
    
    .b-can-drop-position_after .b-can-drop-position__arrow > i {
        bottom: -11px;
    }
    
    .b-selected {
        background-color: #E9ECFF;        
    }
    
    .b-controls {
        position: absolute;
        top: -15px;
        left: -2px;
        height: 15px;
        display: inline-block;
        background-color: #55ADFF;
        min-width: 10px;
        line-height: 15px;
        font-size: 10px;
        color: #FFFFFF;
    }
    
    .b-control {
        margin: 0 3px;
        cursor: pointer;
    }
    
`;

export interface ITagWrapperProps {
    selected: boolean;
    canDrop: boolean;
    canDropPosition: string;
    onBlur?: any;
    onClick?: any;
    removeTag?: any;
    connectDragSource: any;
}

interface ITagWrapperState {
    hover: boolean;
}

class TagWrapper extends React.Component<ITagWrapperProps, ITagWrapperState> {
    constructor(props: ITagWrapperProps) {
        super(props);
        this.state = {
            hover: false
        };
    }

    setOver(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        this.setState({
            hover: true
        });
    }

    setOut(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        this.setState({
            hover: false
        });
    }

    render() {
        const classes = classnames({
            'b-selected-wrapper': this.props.selected,
            'b-hover': this.state.hover || this.props.canDrop, // (this.state.hover && !this.props.canDrop) || (this.props.canDrop && this.props.canDropPosition === 'inside')
            //['can-drop-position-' + this.props.canDropPosition]: true
        });

        return (
            <Wrapper
                className={classes}
                onBlur={this.props.onBlur.bind(this)}
                onClick={this.props.onClick.bind(this)}
                onMouseMove={this.setOver.bind(this)}
                onMouseOut={this.setOut.bind(this)}
            >
                { this.props.selected &&
                    <div className="b-controls">
                        {this.props.connectDragSource(<span className="b-control fa fa-arrows"/>)} <span className="b-control fa fa-times" onClick={this.props.removeTag.bind(this)}/> <span className="b-control fa fa-clone"/>
                    </div>
                }
                {this.props.canDrop && this.props.canDropPosition === 'before' &&
                    <div className="b-can-drop-position b-can-drop-position_before">
                        <div className="b-can-drop-position__arrow">
                            <i className="fa fa-caret-up"/>
                        </div>
                    </div>
                }
                {this.props.canDrop && this.props.canDropPosition === 'after' &&
                    <div className="b-can-drop-position b-can-drop-position_after">
                        <div className="b-can-drop-position__arrow">
                            <i className="fa fa-caret-down"/>
                        </div>
                    </div>
                }
                {this.props.children}
            </Wrapper>
        );
    }
}

export default TagWrapper;
