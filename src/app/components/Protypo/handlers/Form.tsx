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
import StyledComponent from './StyledComponent';
import ValidatedForm from 'components/Validation/ValidatedForm';
import InteractionManager, { TConditionMap } from '../interaction';

export interface IFormProps {
    'class'?: string;
    'className'?: string;
}

interface IFormState {
    form?: ValidatedForm;
    conditionMap: {
        [id: string]: TConditionMap;
    };
}

class Form extends React.Component<IFormProps, IFormState> {
    private _interactionManager = new InteractionManager();

    state: IFormState = {
        conditionMap: {}
    };

    static childContextTypes = {
        form: propTypes.instanceOf(ValidatedForm),
        interactionManager: propTypes.instanceOf(InteractionManager),
        conditionMap: propTypes.object
    };

    getChildContext() {
        return {
            form: this.state.form,
            interactionManager: this._interactionManager,
            conditionMap: this.state.conditionMap
        };
    }

    bindForm(form: ValidatedForm) {
        if (!this.state.form) {
            this.setState({
                form
            });
            form.onUpdate(e => {
                this._interactionManager.on('input_change', {
                    name: e.name,
                    value: String(e.value)
                });

                this.setState({
                    conditionMap: this._interactionManager.getConditionMap()
                });
            });
        }
    }

    render() {
        return (
            <ValidatedForm ref={this.bindForm.bind(this)} className={[this.props.class, this.props.className].join(' ')}>
                {this.props.children}
            </ValidatedForm>
        );
    }
}

export default StyledComponent(Form);