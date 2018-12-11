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

import { ComponentType, Component, createElement } from 'react';
import { FormContext, IFormValuesCollection } from 'services/forms';
import { IValidator, validate, TValidationResult } from 'services/forms/validation';

export interface IInputProps<T> {
    value?: T | null;
    defaultValue?: T;
    validate?: IValidator<T> | IValidator<T>[];
    onChange?: (value: T) => void;
}

export interface IConnectedInputProps<T> {
    defaultValue?: T;
    validate?: IValidator<T> | IValidator<T>[];

    name: string;
    formValues: { [form: string]: IFormValuesCollection };
    connectInput: (form: string, initialValue: TValidationResult<T>) => void;
    disconnectInput: (form: string) => void;
    onChange: (form: string, value: TValidationResult<T>) => void;
}

type TFormInput<T> = ComponentType<IInputProps<T>>;

const valueOf = (values: { [form: string]: IFormValuesCollection }, params: { form: string, name: string }) => {
    if (!(params.form in values)) {
        return undefined;
    }

    if (!(params.name in values[params.form])) {
        return undefined;
    }

    return values[params.form][params.name];
};

const connectInput = <T>(component: TFormInput<T>) => {
    class FormEmitter extends Component<IConnectedInputProps<T>> {
        static contextType = FormContext;
        context!: string;

        componentDidMount() {
            this.props.connectInput(this.context, validate(this.props.defaultValue, this.props.validate));
        }

        componentWillUnmount() {
            this.props.disconnectInput(this.context);
        }

        onChange = (value: T) => {
            this.props.onChange(this.context, validate(value, this.props.validate));
        }

        render() {
            const formValue = valueOf(this.props.formValues, {
                form: this.context,
                name: this.props.name
            });

            const plainValue = formValue && formValue.value;

            return createElement(component, {
                value: undefined === plainValue ? null : plainValue,
                onChange: this.onChange
            });
        }
    }

    return FormEmitter;
};

export default connectInput;