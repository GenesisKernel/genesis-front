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

import Validation from 'components/Validation';

type TImageFormat = 'png' | 'jpg' | 'jpeg';

const imageFormats: TImageFormat[] = ['png', 'jpg', 'jpeg'];
const ratioMatcher = /^ *(\d*) *\/ *(\d*) *$/;

export interface IInputProps {
    'format'?: string;
    'name'?: string;
    'width'?: string;
    'ratio'?: string;
}

const ImageInput: React.SFC<IInputProps> = props => {
    let ratio: number | undefined = undefined;
    let width: number | undefined = undefined;
    let format: TImageFormat = 'png';

    if (props.ratio) {
        const matches = ratioMatcher.exec(props.ratio);
        if (matches) {
            const left = parseInt(matches[1], 10);
            const right = parseInt(matches[2], 10);
            ratio = left / right;
        }
    }

    if (props.width) {
        try {
            width = parseInt(props.width, 10);

            // Check if value is NaN, otherwise cropper will throw
            if (width !== width) {
                width = undefined;
            }
        }
        catch (e) {
            width = undefined;
        }
    }

    if (props.format && -1 !== imageFormats.indexOf(props.format as TImageFormat)) {
        format = props.format as TImageFormat;
    }

    return (
        <Validation.components.ValidatedImage
            format={format}
            name={props.name || ''}
            aspectRatio={ratio}
            width={width}
        />
    );
};

export default ImageInput;