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

import StyledComponent from './StyledComponent';
import DnDComponent from './DnDComponent';
import * as classnames from 'classnames';
import ValidatedForm from 'components/Validation/ValidatedForm';

export interface IFormProps {
    'class'?: string;
    'className'?: string;

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
        this.props.selectTag({ tag: this.props.tag });
    }

    onSubmit(e: any) {
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        if (this.props.editable) {
            const { connectDropTarget, isOver } = this.props;
            const { connectDragSource, isDragging } = this.props;

            const classes = classnames({
                [this.props.class]: true,
                [this.props.className]: true,
                'editable': this.props.selected,
                'can-drop': isOver,
                ['can-drop_' + this.props.canDropPosition]: true,
                'is-dragging': isDragging
            });

            return connectDragSource(connectDropTarget(
                <form
                    className={classes}
                    contentEditable={false}
                    onClick={this.onClick.bind(this)}
                    onSubmit={this.onSubmit.bind(this)}
                >
                    {this.props.children}
                </form>
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

export default DnDComponent(StyledComponent(Form));