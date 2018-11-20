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
import * as propTypes from 'prop-types';

import Protypo from '../Protypo';
import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { Validator } from 'components/Validation/Validators';

export interface IRadioGroupProps {
    'className'?: string;
    'class'?: string;
    'source'?: string;
    'namecolumn'?: string;
    'valuecolumn'?: string;
    'value'?: string;
    'name'?: string;
    'validate'?: {
        [validator: string]: string
    };
}

interface IRadioGroupContext {
    protypo: Protypo;
}

const RadioGroup: React.SFC<IRadioGroupProps> = (props, context: IRadioGroupContext) => {
    const compiledValidators: Validator[] = [];
    _.forEach(props.validate, (value, name) => {
        const validator = (Validation.validators as any)[name];
        if (validator) {
            compiledValidators.push(validator(value));
        }
    });

    const source = props.source && context.protypo.resolveSource(props.source);
    let options: { name: string, value: string }[] = [];
    if (source) {
        const nameIndex = props.namecolumn ? source.columns.indexOf(props.namecolumn) : -1;
        const valueIndex = props.valuecolumn ? source.columns.indexOf(props.valuecolumn) : -1;
        const nameType = source.types[nameIndex];

        options = source.data.map(row => {
            let name: any = null;
            switch (nameType) {
                // Default is on top because of linter bug that is warning about break statement
                default:
                    name = ''; break;

                case 'text':
                    name = row[nameIndex]; break;

                case 'tags':
                    try {
                        const payload = JSON.parse(row[nameIndex]);
                        name = context.protypo.renderElements(payload);
                        break;
                    }
                    catch (e) {
                        break;
                    }
            }

            return {
                name,
                value: row[valueIndex]
            };
        });
    }

    return (
        <Validation.components.ValidatedRadioGroup
            className={[props.class, props.className].join(' ')}
            name={props.name || ''}
            validators={compiledValidators}
            defaultChecked={(props.value || (options && options.length && options[0].value)).toString()}
            values={options.map((l, index) => ({
                value: l.value,
                title: l.name
            }))}
        />
    );
};

RadioGroup.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default StyledComponent(RadioGroup);