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

interface IRadioButtonProps {
    src?: any;
    value: string;
    title?: string;
    selectedValue?: string;
    onClick?: any;

}

interface IRadioButtonState {

}

const Wrapper = styled.div`
    display: inline-block;
    
    .b-bullet {
        display: inline-block;
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid #9aa7b3;
        margin-left: 1px;
        margin-right: 1px;
        cursor: pointer;
    }
    
    .b-bullet_selected {
        border-color: #62b2fc;
        background-color: #62b2fc;
    }
    
    .b-bullet>img, .b-bullet>span {
        line-height: 100%;
        text-align: center;
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 2px;
        box-sizing: border-box;
        vertical-align: top;
    }
    
    
`;

export default class RadioButton extends React.Component<IRadioButtonProps, IRadioButtonState> {

    constructor(props: IRadioButtonProps) {
        super(props);
    }

    render() {
        const classes = classnames({
            'b-bullet': true,
            'b-bullet_selected': this.props.value === this.props.selectedValue
        });
        return (
            <Wrapper>
                <div className={classes} onClick={this.props.onClick.bind(this, this.props.value)} title={this.props.title || ''}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}