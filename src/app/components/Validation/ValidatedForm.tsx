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
    index?: number;
    error: boolean;
    validator?: Validator;
    value?: any;
}

export interface IValidatedControl {
    getValue: () => any;
    props: {
        name: string;
        validators?: Validator[];
    };
}

interface IValidationElement {
    name: string;
    node: React.ReactNode & IValidatedControl;
    validators: Validator[];
}

interface IFormListener {
    (e: IValidationResult): void;
}

export default class ValidatedForm extends React.Component<IValidatedFormProps, IValidatedFormState> {
    private _elements: {
        [name: string]: IValidationElement[];
    } = {};
    private _listeners: IFormListener[] = [];

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

    _registerElement(node: IValidatedControl) {
        const name = node.props.name;

        if (!this._elements[name]) {
            this._elements[name] = [];
        }

        this._elements[name].push({
            name,
            node,
            validators: node.props.validators
        });
    }

    _unregisterElement(node: IValidatedControl) {
        const name = node.props.name;

        if (this._elements[name]) {
            const index = this._elements[name].findIndex(l => l.node === node);
            if (-1 !== index) {
                this._elements[name].splice(index);
            }

            if (0 === this._elements[name].length) {
                delete this._elements[name];
            }
        }
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

    onUpdate(listener: IFormListener) {
        this._listeners.push(listener);
    }

    isPending() {
        return this.props.pending;
    }

    updateState(name: string, value?: any) {
        const result = this.emitUpdate(name, value);
        this._listeners.forEach(l => l(result));
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

    emitUpdate(name: string, value?: any) {
        const result = this.validate(name, value);
        this._listeners.forEach(l => l(result));
        return result;
    }

    getState(name: string) {
        const value = this.state.payload[name];
        return (!value || !value.dirty || !value.invalid);
    }

    validate(name: string, withValue?: any): IValidationResult {
        const elements = this._elements[name];
        if (!elements) {
            return {
                name,
                error: false,
                value: null
            };
        }

        const results: any[] = [];
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const value = withValue || element.node.getValue();

            if (element.validators) {
                for (let v = 0; v < element.validators.length; v++) {
                    const validator = element.validators[v];

                    if (!validator.validate(value)) {
                        return {
                            name,
                            index: v,
                            error: true,
                            validator
                        };
                    }
                }
            }
            results.push(value);
        }

        if (1 < results.length) {
            return {
                name,
                error: false,
                value: results
            };
        }
        else {
            return {
                name,
                error: false,
                value: results[0]
            };
        }
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