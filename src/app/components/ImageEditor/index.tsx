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

export interface IImageEditorProps {
    active: boolean;
    mime: string;
    data: string;
    result: string;
    aspectRatio?: number;
    width?: number;
    onResult: (data: string) => void;
    openEditor: (params: { mime: string, data: string, width?: number, aspectRatio?: number }) => void;
}

interface IImateEditorState {
    active: boolean;
}

class ImageEditor extends React.Component<IImageEditorProps, IImateEditorState> {
    constructor(props: IImageEditorProps) {
        super(props);
        this.state = {
            active: false
        };
    }

    componentDidMount() {
        this.onPropsUpdate(this.props);
    }

    componentWillReceiveProps(props: IImageEditorProps) {
        this.onPropsUpdate(props);
    }

    onPropsUpdate(props: IImageEditorProps) {
        if (!this.state.active && this.props.data !== props.data) {
            props.openEditor({
                mime: props.mime,
                data: props.data,
                width: props.width,
                aspectRatio: props.aspectRatio
            });

            this.setState({
                active: true
            });
        }

        if (this.state.active && !props.active) {
            props.onResult(props.result);
            this.setState({
                active: false
            });
        }
    }

    render() {
        return null as JSX.Element;
    }
}

export default ImageEditor;