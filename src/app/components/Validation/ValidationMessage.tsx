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

import React from 'react';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ValidatedForm from './ValidatedForm';

interface IValidationMessageProps {
    className?: string;
    for: string;
    messages?: {
        [validator: string]: string;
    };
}

interface IValidationMessageContext {
    form: ValidatedForm;
}

const ValidationMessage: React.SFC<IValidationMessageProps> = (props, context: IValidationMessageContext) => {
    let result = null;

    if (context.form) {
        const value = !context.form.getState(props.for) && context.form.validate(props.for);
        if (value && value.error && value.validator) {
            const message = props.messages && props.messages[value.validator.name];
            if (!message) {
                result = (
                    <FormattedMessage id={`validation.${value.validator.name}`} defaultMessage="This field contains invalid data" />
                );
            }
            else if ('string' === typeof message) {
                result = message;
            }
            else {
                result = (
                    <FormattedMessage id="validation.field.invalid" defaultMessage="This field contains invalid data" />
                );
            }
        }
    }

    return (
        <span className={props.className === undefined ? 'text-danger' : props.className}>
            {result && (
                <span>
                    <span>* </span>
                    {result}
                </span>
            )}
        </span>
    );
};

ValidationMessage.contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};

export default ValidationMessage;