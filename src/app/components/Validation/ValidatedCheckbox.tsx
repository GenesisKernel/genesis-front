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

import React from 'react';
import propTypes from 'prop-types';
import { Validator } from './Validators';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedCheckboxProps {
    validators?: Validator[];
    name: string;
    title?: string;
    className?: string;
    defaultChecked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    checked?: boolean;
    disabled?: boolean;
}

interface IValidatedCheckboxState {
    checked: boolean;
}

export default class ValidatedCheckbox extends React.Component<IValidatedCheckboxProps, IValidatedCheckboxState> implements IValidatedControl {
    static contextTypes = {
        form: propTypes.instanceOf(ValidatedForm)
    };

    constructor(props: IValidatedCheckboxProps) {
        super(props);

        this.state = {
            checked: props.checked || props.defaultChecked || false
        };
    }

    componentDidMount() {
        if ((this as any).context.form) {
            ((this as any).context.form as ValidatedForm)._registerElement(this);
        }
    }

    componentWillUnmount() {
        if ((this as any).context.form) {
            ((this as any).context.form as ValidatedForm)._unregisterElement(this);
        }
    }

    componentWillReceiveProps(props: IValidatedCheckboxProps) {
        if (this.props.checked !== props.checked) {
            this.setState({
                checked: !!props.checked
            });
            ((this as any).context.form as ValidatedForm).updateState(props.name, props.checked);
        }
    }

    getValue() {
        return this.state.checked;
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            checked: e.target.checked
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        ((this as any).context.form as ValidatedForm).emitUpdate(this.props.name, String(e.target.checked));
    }

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        ((this as any).context.form as ValidatedForm).updateState(this.props.name);

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render() {
        return (
            <div className={`checkbox c-checkbox ${this.props.className || ''}`}>
                <label>
                    <input
                        type="checkbox"
                        name={this.props.name}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        checked={this.state.checked}
                        disabled={this.props.disabled}
                    />
                    <em className="fa fa-check" />
                    <span>{this.props.title}</span>
                </label>
            </div>
        );
    }
}