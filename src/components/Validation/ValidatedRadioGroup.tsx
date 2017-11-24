// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { IValidator } from './Validators';
import * as propTypes from 'prop-types';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedRadioProps {
    validators?: IValidator[];
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
            (this.context.form as ValidatedForm)._registerElement(this.props.name, this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this.props.name);
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

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            checked: e.target.value
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
            <div>
                {this.props.values.map(value => (
                    <div className={`radio c-radio c-radio-nofont ${this.props.className || ''}`} key={value.value}>
                        <label>
                            <input
                                type="radio"
                                name={this.props.name}
                                value={value.value}
                                onChange={this.onChange.bind(this)}
                                onBlur={this.onBlur.bind(this)}
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