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

import { ComponentType, Component, createElement, ReactNode } from 'react';
import { IFormContext, FormContext } from 'services/forms';
import { IValidator, validate } from 'services/forms/validation';

export interface IFormEmitterProps<T> {
    name: string;
    defaultValue?: T;
    validate?: IValidator<T> | IValidator<T>[];
    children?: ReactNode;
}

export interface IFormEmitterInjectedProps<T> {
    value: T | null;
    onChange: (value: T) => void;
}

export interface IFormInputProps<T> extends IFormEmitterProps<T>, IFormEmitterInjectedProps<T> {

}

export interface IConnectedFormInputProps<T> extends IFormEmitterProps<T> {

}

type TFormInput<T> = ComponentType<IFormInputProps<T>>;

type TConnectedFormInput<T> = ComponentType<IConnectedFormInputProps<T>>;

const connectInput: <T>(component: TFormInput<T>) => TConnectedFormInput<T> = <T>(component: TFormInput<T>) => {
    class FormEmitter extends Component<IConnectedFormInputProps<T>> {
        static contextType = FormContext;
        context!: IFormContext;

        componentDidMount() {
            this.context.connectInput(this.props.name, validate(this.props.defaultValue, this.props.validate));
        }

        componentWillUnmount() {
            this.context.disconnectInput(this.props.name);
        }

        onChange = (value: T) => {
            this.context.onFieldChange(this.props.name, validate(value, this.props.validate));
        }

        render() {
            const formValue = this.context.valueOf<T>(this.props.name);
            return createElement(component, {
                ...this.props,
                value: undefined === formValue ? null : formValue,
                onChange: this.onChange
            });
        }
    }

    return FormEmitter;
};

export default connectInput;