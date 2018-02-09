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
import { TMapType, IMapEditorEvent } from 'genesis/geo';

import MapView from 'components/Map/MapView';

export interface IMapProps {
    value: string;
    maptype: TMapType;
    hmap: string;
}

export interface IMapValue extends IMapEditorEvent {
    zoom?: number;
    center?: { lat: number, lng: number };
}

export const parseData = (plain: string): IMapValue => {
    const result: IMapValue = {
        coords: [],
        area: 0,
        address: ''
    };

    try {
        const value = JSON.parse(plain);
        if (Array.isArray(value.coords)) {
            value.coords.forEach((l: any) => {
                if ('number' === typeof l.lng && 'number' === typeof l.lat) {
                    result.coords.push({
                        lng: l.lng,
                        lat: l.lat
                    });
                }
            });
        }

        if (value.center) {
            if ('number' === typeof value.center.lng && 'number' === typeof value.center.lat) {
                result.center = {
                    lng: value.center.lng,
                    lat: value.center.lat
                };
            }
        }

        if ('number' === typeof value.area) {
            result.area = value.area;
        }

        if ('number' === typeof value.zoom) {
            result.zoom = value.zoom;
        }

        if ('string' === typeof value.address) {
            result.address = value.address;
        }

    }
    catch (e) {
        // Suppress errors silently
    }

    return result;
};

const InputMap: React.SFC<IMapProps> = (props) => {
    const value: IMapValue = parseData(props.value) || {
        coords: [],
        area: 0,
        address: ''
    };

    console.log('Params::', props);

    let height = parseInt(props.hmap, 10);
    if (!height) {
        height = 100;
    }

    return (
        <MapView
            height={height}
            mapType={props.maptype}
            polygon={value.coords.map(l => new google.maps.LatLng(l.lat, l.lng))}
            center={value.center}
            zoom={value.zoom}
        />
    );
};

export default InputMap;