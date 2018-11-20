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
import { Validator } from './Validators';
import propTypes from 'prop-types';
import { IMapEditorEvent } from 'genesis/geo';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedMapProps {
    name: string;
    type: 'polygon';
    mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain';
    value?: IMapEditorEvent;
    center?: { lat: number, lng: number };
    zoom?: number;
    validators?: Validator[];
    openEditor: () => void;
}

interface IValidatedMapState {
    address: string;
}

export default class ValidatedMap extends React.Component<IValidatedMapProps, IValidatedMapState> implements IValidatedControl {
    private _value: IMapEditorEvent = {
        coords: [],
        address: '',
        area: 0
    };

    static contextTypes = {
        form: propTypes.instanceOf(ValidatedForm)
    };

    constructor(props: IValidatedMapProps) {
        super(props);
        this.state = {
            address: ''
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

    componentWillReceiveProps(props: IValidatedMapProps) {
        if (props.value && this.props.value !== props.value) {
            const address = this.state.address !== props.value.address ? props.value.address : this.state.address;
            this._value = {
                ...props.value,
                address
            };

            this.setState({
                address
            });
        }
    }

    getValue() {
        return JSON.stringify(this._value);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this._value.address = e.target.value;
        this.setState({
            address: e.target.value
        });
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" value={this.state.address} onChange={this.onChange} disabled={!this.props.value} />

                <div className="group-span-filestyle input-group-btn">
                    <button className="btn btn-default" style={{ border: 'solid 1px #dde6e9' }} type="button" onClick={this.props.openEditor}>
                        <span className="text-muted icon-span-filestyle glyphicon fa fa-map-marker" />
                        <span className="buttonText" />
                    </button>
                </div>
            </div>
        );
    }
}