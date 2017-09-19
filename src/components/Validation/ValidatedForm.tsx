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
import ValidatedFormGroup from './ValidatedFormGroup';
import ValidatedControl from './ValidatedControl';
import ValidatedTextarea from './ValidatedTextarea';
import ValidatedSelect from './ValidatedSelect';
import { IValidator } from './Validators';

export interface IValidatedFormProps extends FormProps {
    onSubmitSuccess?: (payload: { [key: string]: string }) => void;
    onSubmitError?: (payload: { [key: string]: IValidationResult }) => void;
}

export interface IValidatedFormState {
    payload: { [key: string]: boolean };
}

export interface IValidationResult {
    name: string;
    error: boolean;
    validator?: IValidator;
    value?: string;
}

interface IValidationElement {
    name: string;
    node: React.ReactNode;
    validators: IValidator[];
}

interface IFormControl {
    type: React.ReactNode;
    binding: string;
    events: { event: string, handler: (e: React.SyntheticEvent<any>) => any }[];
}

export default class ValidatedForm extends React.Component<IValidatedFormProps, IValidatedFormState> {
    private _elements: { [name: string]: IValidationElement } = {};
    private _payload: { [key: string]: IValidationResult } = {};

    static handlers: IFormControl[] = [];

    static registerHandler(handler: IFormControl) {
        ValidatedForm.handlers.push(handler);
    }

    constructor(props: IValidatedFormProps) {
        super(props);
        this.state = {
            payload: {}
        };
    }

    private _registerElement(name: string, node: React.ReactNode, validators?: IValidator[]) {
        this._elements[name] = {
            name,
            node,
            validators
        };
    }

    private _unregisterElement(name: string) {
        delete this._elements[name];
    }

    private _renderChildren(children: React.ReactNode) {
        if ('object' !== typeof children || null === children) {
            return children;
        }

        const childrenCount = React.Children.count(children);

        if (1 < childrenCount) {
            return React.Children.map(children, child => this._renderChild(child));
        }
        else if (1 === childrenCount) {
            return this._renderChild(Array.isArray(children) ? children[0] : children);
        }
        else {
            return null;
        }
    }

    private _renderChild(child: React.ReactNode): React.ReactNode {
        if ('object' !== typeof child || null === child) {
            return child;
        }

        const node = child as JSX.Element;
        const handler = ValidatedForm.handlers.find(l => l.type === node.type);

        if (ValidatedFormGroup === node.type) {
            const inputFor = node.props && node.props.for;
            const newProps = {
                error: this.state.payload[inputFor] === false
            };
            return React.cloneElement(node, newProps, this._renderChildren(node.props && node.props.children));
        }
        else if (handler) {
            const inputName = node.props && node.props.name;

            if (!inputName) {
                throw new Error('Validation input is missing "name" attribute');
            }

            const newProps = {
                _registerElement: (defaultValue: string) => {
                    if (defaultValue) {
                        this._payload[inputName] = this.validate(inputName, defaultValue);
                    }
                },
                _unregisterElement: this._unregisterElement.bind(this, inputName),
            };

            const validators = node.props.validators as IValidator[];

            handler.events.forEach(event => {
                newProps[event.event] = this._setListener(inputName, validators, event.handler, node.props[event.event]);
            });

            const element = React.cloneElement(node, newProps);
            this._registerElement(node.props.name, element, node.props.validators);

            return element;
        }
        else {
            return React.cloneElement(node, {}, this._renderChildren(node.props && node.props.children));
        }
    }

    private _setListener(name: string, validators: IValidator[], valueResolver: (e: React.SyntheticEvent<any>) => any, oldHandler?: Function) {
        return (e: React.SyntheticEvent<any>) => {
            const value = valueResolver(e);
            const result = this.validate(name, value);
            this.setState({
                payload: {
                    ...this.state.payload,
                    [name]: result && !result.error
                }
            });
            this._payload[name] = this.validate(name, value);
            return oldHandler && oldHandler(e);
        };
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

    validate(name: string, value: string): IValidationResult {
        const element = this._elements[name];
        if (!element) {
            return null;
        }

        if (element.validators) {
            for (let i = 0; i < element.validators.length; i++) {
                const validator = element.validators[i];
                if (!validator(value)) {
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
                const value = this._payload[itr] && this._payload[itr].value;
                const error = this.validate(itr, value);
                values.payload[itr] = error;
                if (error) {
                    if (error.error) {
                        values.valid = false;
                    }
                    payload[itr] = !error.error;
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
                className={this.props.className}
                onSubmit={this._onSubmit.bind(this)}
                bsClass={this.props.bsClass}
                componentClass={this.props.componentClass}
                horizontal={this.props.horizontal}
                inline={this.props.inline}
            >
                {this._renderChildren(this.props.children)}
            </Form>
        );
    }
}

ValidatedForm.registerHandler({
    type: ValidatedControl,
    binding: 'name',
    events: [
        {
            event: 'onChange',
            handler: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value
        },
        {
            event: 'onBlur',
            handler: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value
        }
    ]
});

ValidatedForm.registerHandler({
    type: ValidatedSelect,
    binding: 'name',
    events: [
        {
            event: 'onChange',
            handler: (e: React.ChangeEvent<HTMLSelectElement>) => e.target.value
        }
    ]
});

ValidatedForm.registerHandler({
    type: ValidatedTextarea,
    binding: 'name',
    events: [
        {
            event: 'onChange',
            handler: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value
        },
        {
            event: 'onBlur',
            handler: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value
        }
    ]
});