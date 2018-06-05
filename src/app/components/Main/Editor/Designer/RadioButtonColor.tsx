// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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

interface IRadioButtonColorProps {
    src?: any;
    value: string;
    selectedValue?: string;
    onClick?: any;
}

interface IRadioButtonColorState {

}

const BulletColor = styled.div`
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    border: 1px solid #9aa7b3;
    margin-left: 1px;
    margin-right: 1px;
    cursor: pointer;
    
    &.basic {
        background-color: #DDD;
    }
    
    &.default {
        background-color: #FFF;
    }
    
    &.muted {
        background-color: #777;
    }
    
    &.primary {
        background-color: #337ab7;;
    }
    
    &.success {
        background-color: #3c763d;
    }
    
    &.info {
        background-color: #31708f;
    }
    
    &.warning {
        background-color: #8a6d3b;
    }
    
    &.danger {
        background-color: #a94442;
    }
    
    &.link {
        background-color: #23527c;
    }
    
    &.selected {
        border-color: #62b2fc;
    }
        
    &.selected:after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        margin-top: -5px;
        background-color: #FFF;
        border-radius: 5px;
        border: 1px solid #000;
    }
`;

export default class RadioButtonColor extends React.Component<IRadioButtonColorProps, IRadioButtonColorState> {

    constructor(props: IRadioButtonColorProps) {
        super(props);
    }

    render() {
        // alert(this.props.value + ' selected: ' + this.props.selectedValue);
        const classes = classnames({
            [this.props.value]: true,
            'selected': this.props.value === this.props.selectedValue
        });
        return (
            <BulletColor className={classes} onClick={this.props.onClick.bind(this, this.props.value)} title={this.props.value}>
                {this.props.children}
            </BulletColor>
        );
    }
}