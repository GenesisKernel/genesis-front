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
import TagWrapper from '../components/TagWrapper';
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
    'copyTag'?: any;
    'removeTag'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;

    'canDropPosition'?: string;

    connectDropTarget?: any;
    isOver?: boolean;

    connectDragSource?: any;
    connectDragPreview?: any;
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

export default DnDComponent(StyledComponent(Form));