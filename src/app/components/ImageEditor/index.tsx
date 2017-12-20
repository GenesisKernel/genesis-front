// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

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