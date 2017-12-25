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
import * as classnames from 'classnames';

import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { IValidator } from 'components/Validation/Validators';
import DnDComponent from './DnDComponent';

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

    if (props.editable) {

        const onClick = (e: any) => {
            e.stopPropagation();
            e.preventDefault();
            props.selectTag({ tag: props.tag });
        };

        const { connectDropTarget, isOver } = props;
        const { connectDragSource, isDragging } = props;

        const classes = classnames({
            [props.class]: true,
            [props.className]: true,
            'editable': props.selected,
            'can-drop': isOver,
            ['can-drop_' + props.canDropPosition]: true,
            'is-dragging': isDragging
        });

        return connectDragSource(connectDropTarget(
            <input
                name={props.name}
                className={classes}
                disabled={!!props.disabled}
                type={props.type}
                placeholder={props.placeholder}
                onClick={onClick}
            />
        ));
    }

    switch (props.type) {
        case 'textarea':
            return (
                <Validation.components.ValidatedTextarea
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name}
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
                    name={props.name}
                    placeholder={props.placeholder}
                    type={props.type}
                    defaultValue={props.value}
                    validators={compiledValidators}
                />
            );
    }
};

export default DnDComponent(StyledComponent(Input));