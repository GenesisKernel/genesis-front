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
    constructor(props: IValidatedCheckboxProps) {
        super(props);

        this.state = {
            checked: props.checked || props.defaultChecked || false
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

    componentWillReceiveProps(props: IValidatedCheckboxProps) {
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

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            checked: e.target.checked
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    onBlur(e: React.FocusEvent<HTMLInputElement>) {
        (this.context.form as ValidatedForm).updateState(this.props.name);

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
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
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

(ValidatedCheckbox as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};