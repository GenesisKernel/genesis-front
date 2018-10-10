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
import StyledComponent from 'components/Protypo/handlers/StyledComponent';
import DnDComponent from './DnDComponent';
import EditableBlock, { IEditableBlockProps } from './EditableBlock';
import Switch from 'components/Main/Editor/Designer/Switch';

export class If extends EditableBlock {
    protected logic = true;
    protected editableDisplay = 'block';
    protected editable = false;
    constructor(props: IEditableBlockProps) {
        super(props);
        this.state = {
            condition: true
        };
    }

    toggleCondition() {
        this.setState({
            condition: !this.state.condition
        });
    }

    renderSwitch(tag: string) {
        return (
            <span style={{'backgroundColor': '#FFCC66'}}>{tag}
                <Switch
                    initialValue={this.state.condition}
                    onValue={true}
                    offValue={false}
                    onChange={this.toggleCondition.bind(this)}
                /> &#123;
            </span>
        );
    }

    renderChildren(classes: string) {
        return (
            <div
                className={classes}
            >
                {this.renderSwitch('If')}
                {this.state.condition && (<div>{this.props.children} </div>) || (<span>...</span>)}
                <span style={{'backgroundColor': '#FFCC66'}}>&#125;</span>
                {!this.state.condition && this.props.tail}
            </div>
        );
    }
}

export default DnDComponent(StyledComponent(If));