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
import { FormControl } from 'react-bootstrap';
import { Validator } from './Validators';
import { readBinaryFile } from 'lib/fs';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedImageProps {
    format: 'png' | 'jpg' | 'jpeg';
    name: string;
    value: string;
    aspectRatio?: number;
    width?: number;
    validators?: Validator[];
    openEditor: (params: { mime: string, data: string }) => void;
}

interface IValidatedImageState {
    value: string;
    filename: string;
    resultFilename: string;
}

export default class ValidatedImage extends React.Component<IValidatedImageProps, IValidatedImageState> implements IValidatedControl {
    private _inputRef: HTMLInputElement | null = null;
    private _value: string = '';

    static contextTypes = {
        form: propTypes.instanceOf(ValidatedForm)
    };

    constructor(props: IValidatedImageProps) {
        super(props);
        this.state = {
            value: '',
            filename: '',
            resultFilename: ''
        };
    }

    componentDidMount() {
        if ((this as any).context.form) {
            ((this as any).context.form as ValidatedForm)._registerElement(this);
        }
    }

    componentWillUnmount() {
        if ((this as any).context.form) {
            ((this as any).context.form as ValidatedForm)._unregisterElement(this);
        }
    }

    componentWillReceiveProps(props: IValidatedImageProps) {
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value as string,
                resultFilename: props.value ? this.state.filename : ''
            });
            this.onResult(props.value);
            ((this as any).context.form as ValidatedForm).updateState(props.name, props.value);
        }
    }

    getValue() {
        return this._value;
    }

    onChange = (e: React.ChangeEvent<FormControl>) => {
        const target = (e.target as object as HTMLInputElement);
        if (target.files && target.files.length) {
            const file = target.files[0];
            readBinaryFile(file).then(binary => {
                this.setState({
                    value: binary,
                    filename: file.name
                });
                this.props.openEditor({
                    mime: this.resolveMIME(),
                    data: binary
                });
            });
        }
        target.value = '';
    }

    onBrowse() {
        if (this._inputRef) {
            this._inputRef.click();
        }
    }

    onBlur = () => {
        ((this as any).context.form as ValidatedForm).updateState(this.props.name);
    }

    onResult(data: string) {
        this._value = data;
        this.setState({
            value: data ? this.state.value : '',
            resultFilename: data ? this.state.filename : ''
        });
    }

    resolveMIME() {
        switch (this.props.format) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';

            default:
                return 'image/png';
        }
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
                <input type="text" className="form-control" readOnly value={this.state.resultFilename} />
                <div className="group-span-filestyle input-group-btn">
                    <button className="btn btn-default" style={{ border: 'solid 1px #dde6e9' }} type="button" onClick={this.onBrowse.bind(this)}>
                        <span className="text-muted icon-span-filestyle glyphicon glyphicon-folder-open" />
                        <span className="buttonText" />
                    </button>
                </div>
            </div>
        );
    }
}