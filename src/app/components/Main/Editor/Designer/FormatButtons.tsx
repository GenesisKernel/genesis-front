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
import RadioButton from './RadioButton';

import imgItalic from 'images/constructor/group-15.svg';
import imgBold from 'images/constructor/group-16.svg';

interface IFormatButtonsProps {
    tag: string;
    onClick?: any;
}

export default class FormatButtons extends React.Component<IFormatButtonsProps> {
    render() {
        return (
            <div>
                {this.props.tag !== 'strong' && (
                    <RadioButton onClick={this.props.onClick.bind(this, 'bold')} value="bold" title="make selected text bold">
                        <img src={imgBold}/>
                    </RadioButton>
                )}

                {this.props.tag !== 'em' && (
                    <RadioButton onClick={this.props.onClick.bind(this, 'italic')} value="italic" title="make selected text italic">
                        <img src={imgItalic}/>
                    </RadioButton>
                )}

                <RadioButton onClick={this.props.onClick.bind(this, 'removeFormat')} value="removeFormat" title="remove formatting on selected text">
                    <span>&times;</span>
                </RadioButton>
            </div>
        );
    }
}