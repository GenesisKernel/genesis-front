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
import { Validator } from './Validators';
import * as propTypes from 'prop-types';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedRadioProps {
    validators?: Validator[];
    name: string;
    values: {
        title: string;
        value: string;
        disabled?: boolean;
    }[];
    className?: string;
    defaultChecked?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    checked?: string;
    disabled?: boolean;
}

interface IValidatedRadioState {
    checked: string;
}

export default class ValidatedRadioGroup extends React.Component<IValidatedRadioProps, IValidatedRadioState> implements IValidatedControl {
    constructor(props: IValidatedRadioProps) {
        super(props);

        this.state = {
            checked: props.checked || props.defaultChecked || null
        };
    }

    componentDidMount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._registerElement(this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this);
        }
    }

    componentWillReceiveProps(props: IValidatedRadioProps) {
        if (this.props.checked !== props.checked) {
            this.setState({
                checked: props.checked
            });
            (this.context.form as ValidatedForm).updateState(props.name, props.checked);
        }
    }

    getValue() {
        return this.state.checked;
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            checked: e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        (this.context.form as ValidatedForm).updateState(this.props.name);

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render() {
        return (
            <div>
                {this.props.values.map(value => (
                    <div className={`radio c-radio c-radio-nofont ${this.props.className || ''}`} key={value.value}>
                        <label>
                            <input
                                type="radio"
                                name={this.props.name}
                                value={value.value}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                checked={this.state.checked === value.value}
                                disabled={value.disabled}
                            />
                            <em className="fa fa-circle" />
                            {value.title}
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

(ValidatedRadioGroup as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};