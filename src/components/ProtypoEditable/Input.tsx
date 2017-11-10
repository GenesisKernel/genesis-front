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
import * as _ from 'lodash';

import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { IValidator } from 'components/Validation/Validators';

export interface IInputProps {
    'className'?: string;
    'class'?: string;
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
    const compiledValidators: IValidator[] = [];
    const className = [props.class, props.className].join(' ');
    _.forEach(props.validate, (value, name) => {
        const validator = Validation.validators[name];
        if (validator) {
            compiledValidators.push(validator(value));
        }
    });

    switch (props.type) {
        case 'textarea':
            return (
                <textarea
                    className={className}
                    name={props.name}
                    placeholder={props.placeholder}
                    defaultValue={props.value}
                />
            );

        default:
            return (
                <input
                    className={className}
                    name={props.name}
                    placeholder={props.placeholder}
                    type={props.type}
                    defaultValue={props.value}
                />
            );
    }
};

export default StyledComponent(Input);