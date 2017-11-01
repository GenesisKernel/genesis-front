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
import * as propTypes from 'prop-types';

import Protypo from './Protypo';
import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { IValidator } from 'components/Validation/Validators';

export interface ISelectProps {
    'className'?: string;
    'class'?: string;
    'source'?: string;
    'column'?: string;
    'name'?: string;
    'validate'?: {
        [validator: string]: string
    };
}

interface ISelectContext {
    protypo: Protypo;
}

const Select: React.SFC<ISelectProps> = (props, context: ISelectContext) => {
    const compiledValidators: IValidator[] = [];
    _.forEach(props.validate, (value, name) => {
        const validator = Validation.validators[name];
        if (validator) {
            compiledValidators.push(validator(value));
        }
    });

    const source = context.protypo.resolveSource(props.source);
    let options: string[] = [];
    if (source) {
        const columnIndex = source.columns.indexOf(props.column);
        options = source.data.map(row => row[columnIndex]);
    }

    return (
        <Validation.components.ValidatedSelect
            className={[props.class, props.className].join(' ')}
            name={props.name}
            validators={compiledValidators}
        >
            {options.map((l, index) => (
                <option key={index} value={l}>
                    {l}
                </option>
            ))}
        </Validation.components.ValidatedSelect>
    );
};

Select.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default StyledComponent(Select);