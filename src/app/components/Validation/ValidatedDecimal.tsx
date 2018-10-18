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
import { MONEY_POWER } from 'lib/tx/convert';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedDecimalProps extends FormControlProps {
    name: string;
    validators?: Validator[];
}

interface IValidatedDecimalState {
    value: string;
}

export default class ValidatedDecimal extends React.Component<IValidatedDecimalProps, IValidatedDecimalState> implements IValidatedControl {
    constructor(props: IValidatedDecimalProps) {
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

    componentWillReceiveProps(props: IValidatedDecimalProps) {
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value === null ? '' : props.value as string
            });
            (this.context.form as ValidatedForm).updateState(props.name, props.value);
        }
    }

    getValue() {
        return this.state.value;
    }

    validateValue(value: string) {
        if (value === '') {
            return true;
        }

        value = value.replace(',', '.');

        if (!/^(0|[1-9]+[0-9]*)\.?\d*$/.test(value)) {
            return false;
        }

        const dotCount = (value.match(/\./g) || []).length;
        // alert(dotCount);

        if (dotCount > 1) {
            return false;
        }

        if (dotCount === 1 && value.split('.')[1].length > MONEY_POWER) {   // check precision
            return false;
        }

        return true;
    }

    onChange = (e: React.ChangeEvent<FormControl>) => {
        const value = (e.target as any).value.replace(',', '.');

        if (!this.validateValue(value)) {
            return;
        }

        this.setState({
            value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        (this.context.form as ValidatedForm).emitUpdate(this.props.name, value);
    }

    onBlur = (e: React.FocusEvent<FormControl>) => {
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
                onChange={this.onChange}
                onBlur={this.onBlur}
                bsClass={this.props.bsClass}
                bsSize={this.props.bsSize}
                step={this.props.step}
                componentClass={this.props.componentClass}
                id={this.props.id}
                name={this.props.name}
                inputRef={this.props.inputRef}
                placeholder={this.props.placeholder}
                value={this.state.value}
                noValidate
            >
                {this.props.children}
            </FormControl>
        );
    }
}

(ValidatedDecimal as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};