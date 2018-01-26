// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { Validator } from './Validators';
import * as propTypes from 'prop-types';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    validators?: Validator[];
}

interface IValidatedTextareaState {
    value: string;
}

export default class ValidatedTextarea extends React.Component<IValidatedTextareaProps, IValidatedTextareaState> implements IValidatedControl {
    constructor(props: IValidatedTextareaProps) {
        super(props);

        this.state = {
            value: (props.value || props.defaultValue || '') as string
        };
    }

    componentDidMount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._registerElement(this.props.name, this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this.props.name);
        }
    }

    componentWillReceiveProps(props: IValidatedTextareaProps) {
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

    onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            value: (e.target as any).value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    onBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
        (this.context.form as ValidatedForm).updateState(this.props.name);

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render() {
        return (
            <textarea
                id={this.props.id}
                className={`form-control ${this.props.className || ''}`}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
            />
        );
    }
}

(ValidatedTextarea as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};