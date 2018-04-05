// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import * as _ from 'lodash';
import * as propTypes from 'prop-types';

import Protypo from '../Protypo';
import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { Validator } from 'components/Validation/Validators';

import * as classnames from 'classnames';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import { TProtypoElement } from 'genesis/protypo';
import { editorActions } from 'modules/editor/actions';

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

    'editable'?: boolean;
    'changePage'?: typeof editorActions.changePage.started;
    'setTagCanDropPosition'?: typeof editorActions.setTagCanDropPosition.started;
    'addTag'?: typeof editorActions.addTag.started;
    'moveTag'?: typeof editorActions.moveTag.started;
    'copyTag'?: typeof editorActions.copyTag.started;
    'removeTag'?: typeof editorActions.removeTag.started;
    'selectTag'?: typeof editorActions.selectTag.started;
    'selected'?: boolean;
    'tag'?: TProtypoElement;

    'canDropPosition'?: string;
    connectDropTarget?: any;
    isOver?: boolean;
    connectDragSource?: any;
    connectDragPreview?: any;
    isDragging?: boolean;
}

interface IRadioGroupContext {
    protypo: Protypo;
}

const RadioGroup: React.SFC<IRadioGroupProps> = (props, context: IRadioGroupContext) => {
    const onClick = (e: any) => {
        e.stopPropagation();
        props.selectTag(props.tag);
    };

    const removeTag = () => {
        props.removeTag({ tag: props.tag });
    };

    if (props.editable) {
        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = props;

        const classes = classnames({
            [props.class]: true,
            [props.className]: true,
            'radio': true,
            'c-radio': true,
            'c-radio-nofont': true,
            'b-selected': props.selected
        });

        return connectDragPreview(connectDropTarget(
            <span style={{display: 'block'}}>
                <TagWrapper
                    display="block"
                    selected={props.selected}
                    canDrop={isOver}
                    canDropPosition={props.canDropPosition}
                    onClick={onClick}
                    removeTag={removeTag}
                    connectDragSource={connectDragSource}
                    canMove={true}
                >
                    <div className={classes}>
                        <label>
                            <input
                                type="radio"
                                name="radio"
                            />
                            <em className="fa fa-circle" />
                            Option 1
                        </label>
                        <br/>
                        <label>
                            <input
                                type="radio"
                                name="radio"
                            />
                            <em className="fa fa-circle" />
                            Option 2
                        </label>
                        <br/>
                        <label>
                            <input
                                type="radio"
                                name="radio"
                            />
                            <em className="fa fa-circle" />
                            Option 3
                        </label>
                    </div>
                </TagWrapper>
            </span>
        ));
    }

    const compiledValidators: Validator[] = [];
    _.forEach(props.validate, (value, name) => {
        const validator = Validation.validators[name];
        if (validator) {
            compiledValidators.push(validator(value));
        }
    });

    const source = context.protypo.resolveSource(props.source);
    let options: { name: string, value: string }[] = [];
    if (source) {
        const nameIndex = source.columns.indexOf(props.namecolumn);
        const valueIndex = source.columns.indexOf(props.valuecolumn);
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
            name={props.name}
            validators={compiledValidators}
            defaultChecked={props.value || (options && options.length && options[0].value)}
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
export const RadioGroupDnD = DnDComponent(StyledComponent(RadioGroup));