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

import * as React from 'react';
import { List } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { IMapEditorEvent } from 'genesis/geo';

import Modal, { IModalProps } from './';
import Validation from 'components/Validation';
import MapView from 'components/Map/MapView';

export interface IMapEditorModalProps {
    mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain';
    coords: { lat: number, lng: number }[];
    center?: { lat: number, lng: number };
    zoom?: number;
}

interface IMapEditorModalState {
    points: List<{ lat: number, lng: number }>;
    area: number;
    pending: boolean;
}

class MapEditorModal extends Modal<IMapEditorModalProps, IMapEditorEvent, IMapEditorModalState> {
    private _isMounted = false;

    constructor(props: any) {
        super(props);
        this.state = {
            points: List(),
            area: 0,
            pending: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.initialize(this.props);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(props: IModalProps<IMapEditorModalProps, IMapEditorEvent>) {
        this.initialize(props);
    }

    initialize(props: IModalProps<IMapEditorModalProps, IMapEditorEvent>) {
        this.setState({
            points: List(props.params.coords || [])
        });
    }

    calcResult(coords: { lat: number, lng: number }[], onResult: (result: google.maps.GeocoderResult) => void) {
        const geocoder = new google.maps.Geocoder();
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < coords.length; i++) {
            bounds.extend(coords[i]);
        }

        geocoder.geocode({
            location: bounds.getCenter()
        }, result => {
            onResult(result[0]);
        });
    }

    onSuccess(values: { [key: string]: any }) {
        this.setState({
            pending: true
        });

        const points = this.state.points.toArray();

        this.calcResult(points, result => {
            if (this._isMounted) {
                this.props.onResult({
                    coords: this.state.points.toArray(),
                    area: this.state.area,
                    address: result ? result.formatted_address : ''
                });
                this.setState({
                    pending: false
                });
            }
        });
    }

    onClick(e: google.maps.MouseEvent) {
        const points = this.state.points.push({ lat: e.latLng.lat(), lng: e.latLng.lng() });

        this.setState({
            points
        });
    }

    onUndo() {
        const points = this.state.points.pop();

        this.setState({
            points
        });
    }

    onClear() {
        this.setState({
            points: List<{ lat: number, lng: number }>()
        });
    }

    onAreaChange(area: number) {
        this.setState({
            area
        });
    }

    render() {
        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSuccess.bind(this)}>
                <Modal.Header>
                    <FormattedMessage id="map.editor" defaultMessage="Map editor" />
                </Modal.Header>
                <Modal.Body>
                    <div style={{ minWidth: 500, width: '60%' }}>
                        <MapView
                            height={400}
                            center={this.props.params.center}
                            zoom={this.props.params.zoom}
                            mapType={this.props.params.mapType}
                            onClick={this.onClick.bind(this)}
                            polygon={this.state.points.toArray()}
                            onAreaChange={this.onAreaChange.bind(this)}
                        />
                    </div>
                    <div className="mt">
                        <div className="pull-right">
                            <FormattedMessage id="map.area" defaultMessage="Area: {value}" values={{ value: this.state.area.toFixed(2) }} />
                            <span>&nbsp;</span>
                            <span className="text-muted">
                                <FormattedMessage id="map.meter.short" defaultMessage="m" /><sup>2</sup>
                            </span>
                        </div>
                        <button type="button" className="btn btn-default mr" onClick={this.onUndo.bind(this)} disabled={0 === this.state.points.count()}>
                            <span className="glyphicon fa fa-undo mr" />
                            <FormattedMessage id="undo" defaultMessage="Undo" />
                        </button>
                        <button type="button" className="btn btn-default mr" onClick={this.onClear.bind(this)} disabled={0 === this.state.points.count()}>
                            <span className="glyphicon fa fa-trash mr" />
                            <FormattedMessage id="clear" defaultMessage="Clear" />
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Validation.components.ValidatedSubmit bsStyle="primary" disabled={this.state.pending}>
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Validation.components.ValidatedSubmit>
                </Modal.Footer>
            </Validation.components.ValidatedForm>
        );
    }
}
export default MapEditorModal;