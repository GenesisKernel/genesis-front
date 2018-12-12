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

import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { changeValue, connectEmitter, disconnectEmitter } from 'modules/forms/actions';
import { TValidationResult, IValidator } from 'services/forms/validation';
import connectInput, { IInputProps, TInputOwnProps } from 'services/forms/connectInput';

export interface IInputContainerProps<T> {
    name: string;
    defaultValue?: T;
    validate?: IValidator<T> | IValidator<T>[];
}

export type TInputContainerProps<TComponent> =
    TComponent extends ComponentType<infer TProps> ?
    TProps extends IInputProps<infer TValue> ?
    TInputOwnProps<TComponent> & IInputContainerProps<TValue> : unknown : unknown;

const connectFormInput = <TProps, TValue>(component: ComponentType<TProps & IInputProps<TValue>>) => {
    const ConnectedComponent = connectInput(component);
    const ComponentContainer = connect((state: IRootState) =>
        ({
            formValues: state.forms
        }),
        {
            connectEmitter,
            disconnectEmitter,
            changeValue
        },
        (state, dispatch, props: IInputContainerProps<TValue>) => ({
            ...state,
            ...props,
            onChange: (form: string, value: TValidationResult<TValue>) => form ? dispatch.changeValue({ form, name: props.name, value }) : undefined,
            connectInput: (form: string, value: TValidationResult<TValue>) => form ? dispatch.connectEmitter({ form, name: props.name, value }) : undefined,
            disconnectInput: (form: string) => form ? dispatch.disconnectEmitter({ form, name: props.name }) : undefined
        })
    )(ConnectedComponent as any);
    return ComponentContainer as unknown as ComponentType<TInputContainerProps<typeof component>>;
};

export default connectFormInput;