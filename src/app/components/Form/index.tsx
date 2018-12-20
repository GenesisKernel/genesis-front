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
import { FormContext, IFormValuesCollection, IFormContext, IFormSubmit } from 'services/forms';
import { TValidationResult } from 'services/forms/validation';

export interface IFormProps {
    onSubmit?: (result: IFormSubmit) => void;
}

interface IFormState {
    context: IFormContext<any>;
}

class Form extends React.Component<IFormProps, IFormState> {
    private _values: IFormValuesCollection = {};

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            context: {
                isSubmitting: false,
                onChange: this.onChange,
                onSubmit: this.onSubmit,
                connectEmitter: this.onChange,
                disconnectEmitter: this.disconnectEmitter
            }
        };
    }

    onSubmit = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        this.setState(() => ({
            context: {
                ...this.state.context,
                isSubmitting: true
            }
        }), () => {
            if (this.props.onSubmit) {
                this.props.onSubmit({
                    valid: this.isValid(),
                    values: this._values
                });
            }
        });
    }

    onChange = (name: string, initialValue: TValidationResult<any>) => {
        this._values[name] = initialValue;

        if (this.state.context.isSubmitting) {
            this.setState({
                context: {
                    ...this.state.context,
                    isSubmitting: false
                }
            });
        }
    }

    isValid = () => {
        for (let input in this._values) {
            if (this._values.hasOwnProperty(input)) {
                if (!this._values[input].valid) {
                    return false;
                }
            }
        }

        return true;
    }

    disconnectEmitter = (name: string) => {
        delete this._values[name];
    }

    render() {
        return (
            <FormContext.Provider value={this.state.context}>
                <form onSubmit={this.onSubmit}>
                    {this.props.children}
                </form>
            </FormContext.Provider>
        );
    }
}

export default Form;