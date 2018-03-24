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
import { FormControl } from 'react-bootstrap';
import { Validator } from './Validators';
import * as propTypes from 'prop-types';
import { IMapEditorEvent } from 'genesis/geo';
import { IMapEditorModalProps } from 'components/Modal/MapEditorModal';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedMapProps {
    name: string;
    type: 'polygon';
    mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain';
    value?: IMapEditorEvent;
    center?: { lat: number, lng: number };
    zoom?: number;
    validators?: Validator[];
    openEditor: (params: IMapEditorModalProps) => void;
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

    constructor(props: IValidatedMapProps) {
        super(props);
        this.state = {
            address: ''
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

    onBlur(e: React.FocusEvent<FormControl>) {
        (this.context.form as ValidatedForm).updateState(this.props.name);
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this._value.address = e.target.value;
        this.setState({
            address: e.target.value
        });
    }

    openEditor() {
        this.props.openEditor({
            mapType: this.props.mapType,
            coords: this.props.value && this.props.value.coords,
            center: this.props.center,
            zoom: this.props.zoom
        });
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" value={this.state.address} onChange={this.onChange.bind(this)} disabled={!this.props.value} />
                <div className="group-span-filestyle input-group-btn">
                    <button className="btn btn-default" style={{ border: 'solid 1px #dde6e9' }} type="button" onClick={this.openEditor.bind(this)}>
                        <span className="text-muted icon-span-filestyle glyphicon fa fa-map-marker" />
                        <span className="buttonText" />
                    </button>
                </div>
            </div>
        );
    }
}

(ValidatedMap as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};