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

import imgLowercase from 'images/constructor/tt-lower.svg';
import imgUppercase from 'images/constructor/tt-upper.svg';

interface IRadioButtonsProps {
    onSelect?: any;
    initialValue?: string;
}

interface IRadioButtonsState {
    value: string;
    initialValue?: string;
}

export default class RadioButtons extends React.Component<IRadioButtonsProps, IRadioButtonsState> {

    constructor(props: IRadioButtonsProps) {
        super(props);
        this.state = {
            value: props.initialValue || ''
        };
    }

    componentWillReceiveProps(props: IRadioButtonsProps) {
        if (this.state.value !== props.initialValue) {
            this.setState({
                value: props.initialValue
            });
        }
    }

    render() {
        return (
            <div>
                <RadioButton value="uppercase" onClick={this.selectRadio.bind(this, 'uppercase')} selectedValue={this.state.value}>
                    <img src={imgUppercase} title="UPPERCASE" />
                </RadioButton>
                <RadioButton value="lowercase" onClick={this.selectRadio.bind(this, 'lowercase')} selectedValue={this.state.value}>
                    <img src={imgLowercase} title="lowercase" />
                </RadioButton>
            </div>
        );
    }
    selectRadio(value: string) {
        let newValue: string = (value === this.state.value ? '' : value);
        this.setState({
            value: newValue
        });
        if (this.props.onSelect) {
            this.props.onSelect(newValue);
        }
    }
}
