// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as React from 'react';
import * as classnames from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.span`
    display: block;
    padding: 0px;
    border: 2px solid transparent;
    margin: -2px;
    position: relative;
    min-height: 0px;
    
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
        /* background-color: #E9ECFF; */        
    }
    
    .b-controls {
        position: absolute;
        top: -15px;
        right: -2px;
        height: 15px;
        display: inline-block;
        background-color: #55ADFF;
        line-height: 15px;
        font-size: 10px;
        color: #FFFFFF;
        white-space: nowrap;
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
    canMove?: boolean;
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

    setPos(e: React.MouseEvent<HTMLElement>, hover: boolean) {
        e.stopPropagation();
        const state = Object.assign(this.state, { hover });
        this.setState(state);
    }

    setOver(e: React.MouseEvent<HTMLElement>) {
        this.setPos(e, true);
    }

    setOut(e: React.MouseEvent<HTMLElement>) {
        this.setPos(e, false);
    }

    setDropEffect(effect: string) {
        const props = Object.assign(this.state, { dropEffect: effect });
        this.setState(props);
    }

    getCaret() {
        const posAndDisplay = this.props.canDropPosition + '_' + this.props.display;
        switch (posAndDisplay) {
            case 'before_block':
                return 'up';
            case 'before_inline':
                return 'left';
            case 'after_block':
                return 'down';
            case 'after_inline':
                return 'right';
            default:
                return '';
        }
    }

    getPosition(caret: string) {
        switch (caret) {
            case 'up':
                return 'before';
            case 'left':
                return 'left';
            case 'down':
                return 'after';
            case 'right':
                return 'right';
            default:
                return null;
        }
    }

    getCaretPosition() {
        if (!this.props.canDrop || this.props.canDropPosition === 'inside') {
            return null;
        }
        const caret = this.getCaret();
        const position = this.getPosition(caret);
        return {
            position,
            caret
        };
    }

    renderCanDropPosition() {
        const caretPosition = this.getCaretPosition();
        if (caretPosition === null) {
            return null;
        }
        const positionClass = 'b-can-drop-position b-can-drop-position_' + caretPosition.position;
        const caretClass = 'fa fa-caret-' + caretPosition.caret;
        return (
            <div className={positionClass}>
                <div className="b-can-drop-position__arrow">
                    <i className={caretClass}/>
                </div>
            </div>
        );
    }

    render() {
        const classes = classnames({
            'b-selected-wrapper': this.props.selected,
            'b-hover': this.state.hover || this.props.canDrop,
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
                        {this.props.canMove && this.props.connectDragSource(<span><span className="b-control fa fa-arrows b-control_move" onMouseDown={this.setDropEffect.bind(this, 'move')}/> <span className="b-control fa fa-clone" onMouseDown={this.setDropEffect.bind(this, 'copy')}/></span>)} <span className="b-control fa fa-times" onClick={this.props.removeTag.bind(this)}/>
                    </div>
                }
                {this.renderCanDropPosition()}
                {this.props.children}
            </Wrapper>
        );
    }
}

export default TagWrapper;
