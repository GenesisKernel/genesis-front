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
    points: List<google.maps.LatLng>;
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
        const points = (props.params.coords || []).map(l =>
            new google.maps.LatLng(l.lat, l.lng)
        );

        this.setState({
            points: List(points)
        });
    }

    calcResult(coords: google.maps.LatLng[], onResult: (result: google.maps.GeocoderResult) => void) {
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
                    coords: this.state.points.map(l => ({
                        lat: l.lat(),
                        lng: l.lng()
                    })).toArray(),
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
        const points = this.state.points.push(
            new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
        );

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
            points: List<google.maps.LatLng>()
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