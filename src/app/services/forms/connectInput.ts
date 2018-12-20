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
import { FormContext, IFormContext } from 'services/forms';
import { IValidator, validate, TValidationResult, TValidationState } from 'services/forms/validation';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IInputProps<T> {
    value?: T | null;
    validate?: IValidator<T> | IValidator<T>[];
    validationState?: TValidationState;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: T) => void;
}

export type TInputOwnProps<TComponent> =
    TComponent extends ComponentType<infer TProps> ?
    TProps extends IInputProps<infer TValue> ?
    Omit<TProps, keyof IInputProps<TValue>> : unknown : unknown;

export interface IConnectedInputProps<T> {
    name: string;
    defaultValue?: T;
    validate?: IValidator<T> | IValidator<T>[];
}

interface IConnectedInputState<TValue> {
    isPristine: boolean;
    value: TValue | undefined;
    validationState: TValidationState;
    validationResult?: TValidationResult<TValue>;
}

const connectInput = <TProps, TValue>(component: ComponentType<TProps & IInputProps<TValue>>) => {
    class FormEmitter extends Component<TProps & IInputProps<TValue> & IConnectedInputProps<TValue>, IConnectedInputState<TValue>> {
        static contextType = FormContext;
        context!: IFormContext<TValue>;
        state: IConnectedInputState<TValue> = {
            isPristine: true,
            value: undefined,
            validationState: 'VALID'
        };

        componentDidMount() {
            const result = validate(this.props.defaultValue, this.props.validate);
            this.setState({
                value: this.props.defaultValue,
                validationState: result.valid ? 'VALID' : 'INVALID',
                validationResult: result
            }, () => {
                this.context.connectEmitter(this.props.name, result);
            });
        }

        componentWillUnmount() {
            this.context.disconnectEmitter(this.props.name);
        }

        onBlur = () => {
            const isValid = !(this.state.validationResult && !this.state.validationResult.valid);
            this.setState({
                validationState: isValid ? 'VALID' : 'INVALID'
            });
        }

        onChange = (value: TValue) => {
            const result = validate(value, this.props.validate);
            this.setState({
                isPristine: false,
                value: value,
                validationState: result.valid ? 'VALID' : 'INVALID',
                validationResult: result
            }, () => {
                this.context.onChange(this.props.name, result);

                if (this.props.onChange) {
                    this.props.onChange(value);
                }
            });
        }

        isValid: () => TValidationState = () => {
            if (this.state.isPristine && !this.context.isSubmitting) {
                return 'VALID';
            }
            else {
                return this.state.validationState;
            }
        }

        render() {
            return createElement(component, {
                ...this.props,
                value: undefined === this.state.value ? null : this.state.value,
                validationState: this.isValid(),
                onBlur: this.onBlur,
                onChange: this.onChange
            });
        }
    }

    return FormEmitter;
};

export default connectInput;