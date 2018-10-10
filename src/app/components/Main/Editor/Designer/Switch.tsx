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
import styled from 'styled-components';
import imgSwitchOn from 'images/constructor/group-18.svg';
import imgSwitchOff from 'images/constructor/group-29.svg';

interface ISwitchProps {
    onChange?: any;
    initialValue?: any;
    onValue: any;
    offValue: any;
}

interface ISwitchState {
    on: boolean;
}

const ImgSwitch = styled.img`
    width: 30px;
`;

export default class Switch extends React.Component<ISwitchProps, ISwitchState> {

    constructor(props: ISwitchProps) {
        super(props);
        this.state = {
            on: this.getBoolean(props.initialValue)
        };
    }

    getBoolean(value: string): boolean {
        return ((value === this.props.onValue) ? true : false);
    }

    componentWillReceiveProps(props: ISwitchProps) {
        if (this.state.on !== this.getBoolean(props.initialValue)) {
            this.setState({
                on: this.getBoolean(props.initialValue)
            });
        }
    }

    render() {
        return (
            <div className="b-switch" onClick={this.change.bind(this)}>
                <ImgSwitch src={this.state.on ? imgSwitchOn : imgSwitchOff} />
            </div>
        );
    }
    change() {
        let on: boolean = !this.state.on;
        this.setState({
            on
        });
        if (this.props.onChange) {
            this.props.onChange((on ? this.props.onValue : this.props.offValue));
        }
    }
}
