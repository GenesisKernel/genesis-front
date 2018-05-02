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
import * as propTypes from 'prop-types';

import StyledComponent from './StyledComponent';
import TagWrapper from '../components/TagWrapper';
import DnDComponent from './DnDComponent';
import * as classnames from 'classnames';
import ValidatedForm from 'components/Validation/ValidatedForm';
import { IConstructorElementProps } from 'genesis/editor';

export interface IFormProps extends IConstructorElementProps {
    'class'?: string;
    'className'?: string;
}

interface IFormState {
    form: ValidatedForm;
}

class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props);
        this.state = {
            form: null
        };
    }

    getChildContext() {
        return {
            form: this.state.form
        };
    }

    bindForm(form: ValidatedForm) {
        if (!this.state.form) {
            this.setState({
                form
            });
        }
    }

    onClick(e: any) {
        e.stopPropagation();
        this.props.selectTag(this.props.tag);
    }

    onSubmit(e: any) {
        e.stopPropagation();
        e.preventDefault();
    }

    removeTag() {
        this.props.removeTag({ tag: this.props.tag });
    }

    render() {
        if (this.props.editable) {
            const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;

            const classes = classnames({
                [this.props.class]: true,
                [this.props.className]: true,
                'b-selected': this.props.selected
            });

            return connectDragPreview(connectDropTarget(
                <span>
                    <TagWrapper
                        display="block"
                        selected={this.props.selected}
                        canDrop={isOver}
                        canDropPosition={this.props.canDropPosition}
                        onClick={this.onClick.bind(this)}
                        removeTag={this.removeTag.bind(this)}
                        connectDragSource={connectDragSource}
                        canMove={true}
                    >
                        <form
                            className={classes}
                            contentEditable={false}
                            onSubmit={this.onSubmit.bind(this)}
                        >
                            {this.props.children}
                        </form>
                    </TagWrapper>
                </span>
            ));
        }
        return (
            <ValidatedForm ref={this.bindForm.bind(this)} className={[this.props.class, this.props.className].join(' ')}>
                {this.props.children}
            </ValidatedForm>
        );
    }
}

(Form as React.ComponentClass).childContextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};

export default StyledComponent(Form);
export const FormDnD = DnDComponent(StyledComponent(Form));