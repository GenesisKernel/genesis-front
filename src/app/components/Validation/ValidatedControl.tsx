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
import { FormControl, FormControlProps } from 'react-bootstrap';
import { Validator } from './Validators';
import * as propTypes from 'prop-types';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedControlProps extends FormControlProps {
    name: string;
    validators?: Validator[];
}

interface IValidatedControlState {
    value: string;
}

export default class ValidatedControl extends React.Component<IValidatedControlProps, IValidatedControlState> implements IValidatedControl {
    constructor(props: IValidatedControlProps) {
        super(props);

        this.state = {
            value: (props.value || props.defaultValue || '') as string
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

    componentWillReceiveProps(props: IValidatedControlProps) {
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value as string
            });
            (this.context.form as ValidatedForm).updateState(props.name, props.value);
        }
    }

    getValue() {
        return this.state.value;
    }

    onChange(e: React.ChangeEvent<FormControl>) {
        this.setState({
            value: (e.target as any).value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    onBlur(e: React.FocusEvent<FormControl>) {
        if (this.context.form) {
            (this.context.form as ValidatedForm).updateState(this.props.name);
        }

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render() {
        return (
            <FormControl
                style={this.props.style}
                className={this.props.className}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
                bsClass={this.props.bsClass}
                bsSize={this.props.bsSize}
                componentClass={this.props.componentClass}
                id={this.props.id}
                name={this.props.name}
                inputRef={this.props.inputRef}
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={this.state.value}
                noValidate
            >
                {this.props.children}
            </FormControl>
        );
    }
}

(ValidatedControl as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};