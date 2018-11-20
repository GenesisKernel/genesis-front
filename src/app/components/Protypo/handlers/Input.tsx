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
import * as _ from 'lodash';

import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { Validator, IValidatorGenerator } from 'components/Validation/Validators';

export interface IInputProps {
    'className'?: string;
    'class'?: string;
    'disabled'?: string;
    'name'?: string;
    'placeholder'?: string;
    'type'?: string;
    'value'?: string;
    'validate'?: {
        [validator: string]: string
    };
}

// TODO: type is not handled correctly
const Input: React.SFC<IInputProps> = (props) => {
    const compiledValidators: Validator[] = [];
    const className = [props.class, props.className].join(' ');
    _.forEach(props.validate, (value, name) => {
        const validator = (Validation.validators as any)[name];
        if (validator) {
            if (validator instanceof Validator) {
                compiledValidators.push(validator);
            }
            else {
                const validatorGenerator: IValidatorGenerator = validator;
                compiledValidators.push(validatorGenerator(value));
            }
        }
    });

    switch (props.type) {
        case 'file':
            return (
                <Validation.components.ValidatedFile
                    disabled={!!props.disabled}
                    name={props.name || ''}
                    placeholder={props.placeholder}
                    validators={compiledValidators}
                />
            );

        case 'checkbox':
            return (
                <Validation.components.ValidatedCheckbox
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name || ''}
                    title={props.placeholder}
                    defaultChecked={'true' === props.value}
                    validators={compiledValidators}
                />
            );

        case 'textarea':
            return (
                <Validation.components.ValidatedTextarea
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name || ''}
                    placeholder={props.placeholder}
                    defaultValue={props.value}
                    validators={compiledValidators}
                />
            );

        default:
            return (
                <Validation.components.ValidatedControl
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name || ''}
                    placeholder={props.placeholder}
                    type={props.type}
                    defaultValue={props.value}
                    validators={compiledValidators}
                />
            );
    }
};

export default StyledComponent(Input);