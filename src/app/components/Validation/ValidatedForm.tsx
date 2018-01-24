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
import { Form, FormProps } from 'react-bootstrap';
import { Validator } from './Validators';
import * as propTypes from 'prop-types';

export interface IValidatedFormProps extends FormProps {
    pending?: boolean;
    onSubmitSuccess?: (payload: { [key: string]: string }) => void;
    onSubmitError?: (payload: { [key: string]: IValidationResult }) => void;
}

export interface IValidatedFormState {
    payload: {
        [key: string]: {
            dirty: boolean;
            invalid: boolean;
        };
    };
}

export interface IValidationResult {
    name: string;
    error: boolean;
    validator?: Validator;
    value?: any;
}

export interface IValidatedControl {
    getValue: () => any;
    props: { validators?: Validator[] };
}

interface IValidationElement {
    name: string;
    node: React.ReactNode & IValidatedControl;
    validators: Validator[];
}

export default class ValidatedForm extends React.Component<IValidatedFormProps, IValidatedFormState> {
    private _elements: { [name: string]: IValidationElement } = {};

    constructor(props: IValidatedFormProps) {
        super(props);
        this.state = {
            payload: {}
        };
    }

    getChildContext() {
        return {
            form: this
        };
    }

    _registerElement(name: string, node: IValidatedControl) {
        this._elements[name] = {
            name,
            node,
            validators: node.props.validators
        };
    }

    _unregisterElement(name: string) {
        delete this._elements[name];
    }

    private _onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payload = this.validateAll();

        if (payload.valid && this.props.onSubmitSuccess) {
            const values = {};
            for (let itr in payload.payload) {
                if (payload.payload.hasOwnProperty(itr)) {
                    values[itr] = payload.payload[itr] && payload.payload[itr].value;
                }
            }
            this.props.onSubmitSuccess(values);
        }
        else if (!payload.valid && this.props.onSubmitError) {
            this.props.onSubmitError(payload.payload);
        }
    }

    isPending() {
        return this.props.pending;
    }

    updateState(name: string, value?: any) {
        const result = this.validate(name, value);
        this.setState({
            payload: {
                ...this.state.payload,
                [name]: {
                    dirty: true,
                    invalid: result.error
                }
            }
        });
    }

    getState(name: string) {
        const value = this.state.payload[name];
        return (!value || !value.dirty || !value.invalid);
    }

    validate(name: string, withValue?: any): IValidationResult {
        const element = this._elements[name];
        if (!element) {
            return {
                name,
                error: false,
                value: null
            };
        }

        const value = withValue || element.node.getValue();

        if (element.validators) {
            for (let i = 0; i < element.validators.length; i++) {
                const validator = element.validators[i];

                if (!validator.validate(value)) {
                    return {
                        name,
                        error: true,
                        validator
                    };
                }
            }
        }

        return {
            name,
            error: false,
            value
        };
    }

    validateAll(): { valid: boolean, payload: { [key: string]: IValidationResult } } {
        const values = {
            valid: true,
            payload: {}
        };
        const payload = {
            ...this.state.payload
        };

        for (let itr in this._elements) {
            if (this._elements.hasOwnProperty(itr)) {
                const error = this.validate(itr);
                values.payload[itr] = error;
                if (error) {
                    if (error.error) {
                        values.valid = false;
                    }
                    payload[itr] = {
                        dirty: true,
                        invalid: error.error
                    };
                }
            }
        }
        this.setState({
            payload
        });
        return values;
    }

    render() {
        return (
            <Form
                autoComplete="off"
                className={this.props.className}
                onSubmit={this._onSubmit.bind(this)}
                bsClass={this.props.bsClass}
                componentClass={this.props.componentClass}
                horizontal={this.props.horizontal}
                inline={this.props.inline}
            >
                {this.props.children}
            </Form>
        );
    }
}

(ValidatedForm as React.ComponentClass).childContextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};