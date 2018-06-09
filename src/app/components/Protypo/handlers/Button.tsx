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
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Protypo, { IParamsSpec } from '../Protypo';
import ValidatedForm from 'components/Validation/ValidatedForm';
import TxButton from 'containers/Widgets/TxButton';
import TxBatchButton from 'containers/Widgets/TxBatchButton';

export interface IButtonProps {
    'class'?: string;
    'alert'?: {
        icon: string;
        text: string;
        confirmbutton: string;
        cancelbutton: string;
    };
    'contract'?: string;
    'composite'?: {
        name: string;
        data: {
            [key: string]: any;
        }[]
    }[];
    'popup'?: {
        header?: string;
        width?: string;
    };
    'page'?: string;
    'pageparams'?: IParamsSpec;
    'params'?: IParamsSpec;
    'formID'?: number;
}

interface IButtonContext {
    form: ValidatedForm;
    protypo: Protypo;
}

const Button: React.SFC<IButtonProps & InjectedIntlProps> = (props, context: IButtonContext) => {
    const getParams = () => {
        const params = {};

        if (context.form) {
            const payload = context.form.validateAll();
            if (!payload.valid) {
                return null;
            }

            for (let itr in payload.payload) {
                if (payload.payload.hasOwnProperty(itr)) {
                    params[itr] = payload.payload[itr].value;
                }
            }

            return {
                ...params,
                ...context.protypo.resolveParams(props.params, payload.payload)
            };
        }

        return {
            ...params,
            ...context.protypo.resolveParams(props.params)
        };
    };

    const getPageParams = () => {
        if (context.form) {
            const payload = context.form.validateAll();
            if (!payload.valid) {
                return null;
            }

            return context.protypo.resolveParams(props.pageparams, payload.payload);
        }
        else {
            return context.protypo.resolveParams(props.pageparams);
        }
    };

    let popup: { title?: string, width?: number } = null;
    if (props.popup) {
        const width = parseInt(props.popup.width, 10);
        popup = {
            title: props.popup.header,
            width: width === width ? width : null
        };
    }

    if (props.composite) {
        return (
            <TxBatchButton
                className={props.class}
                contracts={props.composite.map(l => ({
                    name: l.name,
                    params: l.data
                }))}
                confirm={props.alert && {
                    icon: props.alert.icon,
                    title: props.intl.formatMessage({ id: 'alert.confirmation', defaultMessage: 'Confirmation' }),
                    text: props.alert.text,
                    confirmButton: props.alert.confirmbutton,
                    cancelButton: props.alert.cancelbutton
                }}
                popup={popup}
                page={props.page}
                pageParams={getPageParams}
            >
                {props.children}
            </TxBatchButton>
        );
    }
    else {
        return (
            <TxButton
                className={props.class}
                contractName={props.contract}
                contractParams={getParams}
                confirm={props.alert && {
                    icon: props.alert.icon,
                    title: props.intl.formatMessage({ id: 'alert.confirmation', defaultMessage: 'Confirmation' }),
                    text: props.alert.text,
                    confirmButton: props.alert.confirmbutton,
                    cancelButton: props.alert.cancelbutton
                }}
                popup={popup}
                page={props.page}
                pageParams={getPageParams}
            >
                {props.children}
            </TxButton>
        );
    }
};

Button.contextTypes = {
    form: propTypes.object,
    protypo: propTypes.object.isRequired
};

export default injectIntl(Button);