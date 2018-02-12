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
import * as _ from 'lodash';
import { withGoogleMap, GoogleMap, withScriptjs, Polygon } from 'react-google-maps';

export interface IMapViewProps extends IMapProps {
    height: number;
}

export interface IMapProps {
    mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain';
    polygon?: google.maps.LatLng[];
    center?: { lat: number, lng: number };
    zoom?: number;
    onClick?: (e: google.maps.MouseEvent) => void;
    onAreaChange?: (area: number) => void;
}

class Map extends React.Component<IMapProps> {
    private _map: GoogleMap = null;

    componentDidMount() {
        this.processEvents(this.props);
        if (this.props.polygon && this.props.polygon.length) {
            this._map.fitBounds(this.calcBounds(this.props.polygon));
        }
    }

    componentWillReceiveProps(props: IMapProps) {
        if (!_.isEqual(this.props.polygon, props.polygon)) {
            this.processEvents(props);
        }
    }

    calcBounds(coords: google.maps.LatLng[]) {
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < coords.length; i++) {
            bounds.extend(coords[i]);
        }
        return bounds;
    }

    processEvents(props: IMapProps) {
        if (props.onAreaChange && props.polygon) {
            const area = google.maps.geometry.spherical.computeArea(new google.maps.MVCArray(props.polygon));
            props.onAreaChange(area);
        }
    }

    render() {
        return (
            <GoogleMap
                ref={l => this._map = l}
                defaultMapTypeId={this.props.mapType}
                defaultZoom={this.props.zoom || 1}
                defaultCenter={this.props.center || { lat: 36.07574221562708, lng: 5.0921630859375 }}
                mapTypeId={this.props.mapType}
                options={{
                    disableDefaultUI: true,
                    draggableCursor: 'default'
                }}
                onClick={this.props.onClick}
            >
                {this.props.polygon ? (
                    <Polygon paths={new google.maps.MVCArray(this.props.polygon)} />
                ) : null}
            </GoogleMap>
        );
    }
}

const BoundMap = withScriptjs(withGoogleMap(Map));

const MapView: React.SFC<IMapViewProps> = props => (
    <BoundMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyATHGb9H5fXlOMp4azLLFmX2KIr6o0jH9M&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: props.height }} />}
        containerElement={<div style={{ height: props.height }} />}
        mapElement={<div style={{ height: props.height }} />}
        {...props}
    />
);

export default MapView;