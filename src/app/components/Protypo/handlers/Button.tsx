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
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as propTypes from 'prop-types';
import * as classnames from 'classnames';

import Protypo, { IParamsSpec } from '../Protypo';
import ValidatedForm from 'components/Validation/ValidatedForm';
import TxButton from 'containers/Widgets/TxButton';

import DnDComponent from './DnDComponent';

export interface IButtonProps {
    'class'?: string;
    'alert'?: {
        icon: string;
        text: string;
        confirmbutton: string;
        cancelbutton: string;
    };
    'contract'?: string;
    'page'?: string;
    'pageparams'?: IParamsSpec;
    'params'?: IParamsSpec;
    'formID'?: number;

    'editable'?: boolean;
    'changePage'?: any;
    'setTagCanDropPosition'?: any;
    'addTag'?: any;
    'moveTag'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    isDragging?: boolean;
}

interface IButtonContext {
    form: ValidatedForm;
    protypo: Protypo;
    vde?: boolean;
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

    const onClick = (e: any) => {
        e.stopPropagation();
        props.selectTag({ tag: props.tag });
    };

    const onBlur = (e: any) => {
        e.stopPropagation();
        props.changePage({ text: e.target.innerHTML, tagID: props.tag.id });
    };

    if (props.editable) {
        const { connectDropTarget, isOver } = props;
        const { connectDragSource, isDragging } = props;

        const classes = classnames({
            [props.class]: true,
            'editable': props.selected,
            'can-drop': isOver,
            ['can-drop_' + props.canDropPosition]: true,
            'is-dragging': isDragging
        });

        return connectDragSource(connectDropTarget(
            <button
                className={classes}
                contentEditable={props.selected}
                onBlur={onBlur}
                onClick={onClick}
            >
                {props.children}
            </button>
        ));
    }

    return (
        <TxButton
            vde={context.vde}
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
            page={props.page}
            pageParams={getPageParams}
        >
            {props.children}
        </TxButton>
    );
};

Button.contextTypes = {
    form: propTypes.object,
    protypo: propTypes.object.isRequired,
    vde: propTypes.bool
};

export default DnDComponent(injectIntl(Button));