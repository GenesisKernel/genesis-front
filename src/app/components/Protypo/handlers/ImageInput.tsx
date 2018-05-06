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

import Validation from 'components/Validation';

export interface IInputProps {
    'format'?: string;
    'name'?: string;
    'width'?: string;
    'ratio'?: string;
}

const ImageInput: React.SFC<IInputProps> = (props) => {
    const matches = /^ *(\d*) *\/ *(\d*) *$/.exec(props.ratio);
    let ratio: number = null;
    let width: number = null;

    if (matches) {
        const left = parseInt(matches[1], 10);
        const right = parseInt(matches[2], 10);
        ratio = left / right;
    }

    try {
        width = parseInt(props.width, 10);

        // Check if value is NaN, otherwise cropper will throw
        if (width !== width) {
            width = null;
        }
    }
    catch (e) {
        width = null;
    }

    return (
        <Validation.components.ValidatedImage
            format={props.format as any}
            name={props.name}
            aspectRatio={ratio}
            width={width}
        />
    );
};

export default ImageInput;