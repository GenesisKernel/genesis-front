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
import { TMapType, TMapEditorType } from 'genesis/geo';
import { IMapValue, parseData } from 'components/Protypo/handlers/Map';

import Validation from 'components/Validation';

export interface IInputMapProps {
    name: string;
    value: string;
    type: TMapEditorType;
    maptype: TMapType;
}

const InputMap: React.SFC<IInputMapProps> = (props) => {
    const value: IMapValue = parseData(props.value) || {
        coords: [],
        area: 0,
        address: ''
    };

    return (
        <Validation.components.ValidatedMap
            name="myMap"
            value={value}
            zoom={value.zoom}
            center={value.center}
            type={props.type || 'polygon'}
            mapType={props.maptype}
        />
    );
};

export default InputMap;