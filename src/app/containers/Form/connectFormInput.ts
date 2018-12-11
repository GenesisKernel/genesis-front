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
import connectInput, { IInputProps } from 'services/forms/connectInput';

export interface IInputContainerProps<T> extends IInputProps<T> {
    name: string;
    defaultValue?: T;
    validate?: IValidator<T> | IValidator<T>[];
}

const connectFormInput = <T>(component: ComponentType<IInputProps<T>>) => {
    const mapStateToProps = (state: IRootState, _props: IInputContainerProps<T>) => ({
        formValues: state.forms
    });

    const InputEmitter = connectInput(component);

    const ConnectedFormInput = connect(mapStateToProps, {
        changeValue,
        connectEmitter,
        disconnectEmitter

    }, (state, dispatch, props) => ({
        name: props.name,
        formValues: state.formValues,
        validate: props.validate,
        defaultValue: props.defaultValue,
        onChange: (form: string, value: TValidationResult<any>) => dispatch.changeValue({
            form,
            name: props.name,
            value
        }),
        connectInput: (form: string, value: TValidationResult<any>) => dispatch.connectEmitter({
            form,
            name: props.name,
            value
        }),
        disconnectInput: (form: string) => dispatch.disconnectEmitter({
            form,
            name: props.name
        })
    }))(InputEmitter);

    return ConnectedFormInput;
};

export default connectFormInput;