// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import * as _ from 'lodash';
import { withGoogleMap, GoogleMap, withScriptjs, Polygon } from 'react-google-maps';

export interface IMapProps {
    mapType?: 'hybrid' | 'roadmap' | 'satellite' | 'terrain';
    polygon?: { lat: number, lng: number }[];
    center?: { lat: number, lng: number };
    zoom?: number;
    onClick?: (e: google.maps.MouseEvent) => void;
    onAreaChange?: (area: number) => void;
}

export interface IMapViewProps extends IMapProps {
    height: number;
}

class Map extends React.Component<IMapProps> {
    private _map: GoogleMap = null;
    private _defaultCenter = { lat: 36.07574221562708, lng: 5.0921630859375 };

    componentDidMount() {
        this.processEvents(this.props);
        if (this.props.polygon && this.props.polygon.length) {
            this._map.fitBounds(this.calcBounds(this.getPolygon(this.props.polygon)));
        }
    }

    componentWillReceiveProps(props: IMapProps) {
        if (!_.isEqual(this.props.polygon, props.polygon)) {
            this.processEvents(props);
        }
    }

    getPolygon(coords: { lat: number, lng: number }[]) {
        return coords.map(l => new google.maps.LatLng(l.lat, l.lng));
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
            const area = google.maps.geometry.spherical.computeArea(new google.maps.MVCArray(this.getPolygon(props.polygon)));
            props.onAreaChange(area);
        }
    }

    render() {
        return (
            <GoogleMap
                ref={l => this._map = l}
                defaultMapTypeId={this.props.mapType}
                defaultZoom={this.props.zoom || 1}
                defaultCenter={this.props.center || this._defaultCenter}
                center={this.props.center || this._defaultCenter}
                mapTypeId={this.props.mapType}
                options={{
                    disableDefaultUI: true,
                    draggableCursor: 'default'
                }}
                onClick={this.props.onClick}
            >
                {this.props.polygon ? (
                    <Polygon paths={new google.maps.MVCArray(this.getPolygon(this.props.polygon))} />
                ) : null}
            </GoogleMap>
        );
    }
}

const BoundMap = withScriptjs(withGoogleMap(Map));

const MapView: React.SFC<IMapViewProps> = props => (
    <BoundMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyATHGb9H5fXlOMp4azLLFmX2KIr6o0jH9M&libraries=geometry,drawing,places&callback=googleMapsLoaded"
        loadingElement={<div style={{ height: props.height }} />}
        containerElement={<div style={{ height: props.height }} />}
        mapElement={<div style={{ height: props.height }} />}
        {...props}
    />
);

export default MapView;