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
import * as propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ValidatedForm from './ValidatedForm';

type TLocalizedMessage = {
    id: string;
    defaultMessage?: string;
    values?: { [key: string]: any };
};

interface IValidationMessageProps {
    className?: string;
    for: string;
    messages: {
        [validator: string]: TLocalizedMessage | string;
    };
}

interface IValidationMessageContext {
    form: ValidatedForm;
}

const ValidationMessage: React.SFC<IValidationMessageProps> = (props, context: IValidationMessageContext) => {
    let result = null;

    if (context.form) {
        const value = !context.form.getState(props.for) && context.form.validate(props.for);
        if (value && value.error) {
            const message = props.messages[value.validator.name];
            if (!message) {
                result = (
                    <FormattedMessage id="validation.field.invalid" defaultMessage="This field contains invalid data" />
                );
            }
            else if ('string' === typeof message) {
                result = message;
            }
            else {
                result = (
                    <FormattedMessage id={message.id} defaultMessage={message.defaultMessage} values={message.values} />
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