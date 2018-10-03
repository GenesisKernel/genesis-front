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
import { FormControl } from 'react-bootstrap';
import { Validator } from './Validators';
import propTypes from 'prop-types';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedFileProps {
    name: string;
    value?: File;
    disabled?: boolean;
    placeholder?: string;
    validators?: Validator[];
}

interface IValidatedFileState {
    value: File;
    filename: string;
}

export default class ValidatedFile extends React.Component<IValidatedFileProps, IValidatedFileState> implements IValidatedControl {
    private _inputRef: HTMLInputElement = null;

    constructor(props: IValidatedFileProps) {
        super(props);
        this.state = {
            value: null,
            filename: ''
        };
    }

    componentDidMount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._registerElement(this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this);
        }
    }

    componentWillReceiveProps(props: IValidatedFileProps) {
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value,
                filename: props.value ? this.state.filename : ''
            });
            (this.context.form as ValidatedForm).updateState(props.name, props.value);
        }
    }

    getValue() {
        return this.state.value;
    }

    onChange = (e: React.ChangeEvent<FormControl>) => {
        const target = (e.target as object as HTMLInputElement);
        if (target.files.length) {
            const file = target.files[0];
            this.setState({
                value: file,
                filename: file.name
            });
        }
        target.value = '';
    }

    onBrowse() {
        this._inputRef.click();
    }

    onBlur = (e: React.FocusEvent<FormControl>) => {
        (this.context.form as ValidatedForm).updateState(this.props.name);
    }

    render() {
        return (
            <div className="input-group">
                <FormControl
                    className="hidden"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    inputRef={ref => this._inputRef = ref}
                    type="file"
                    noValidate
                />
                <input type="text" className="form-control" readOnly value={this.state.filename} placeholder={this.props.placeholder} />
                <div className="group-span-filestyle input-group-btn">
                    <button className="btn btn-default" style={{ border: 'solid 1px #dde6e9' }} type="button" disabled={this.props.disabled} onClick={this.onBrowse.bind(this)}>
                        <span className="text-muted icon-span-filestyle glyphicon glyphicon-folder-open" />
                        <span className="buttonText" />
                    </button>
                </div>
            </div>
        );
    }
}

(ValidatedFile as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};