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

export interface IDataPreloaderProps {
    data: any[];
    children: JSX.Element;
}

interface IDataPreloaderState {
    pending: boolean;
}

class DataPreloader extends React.Component<IDataPreloaderProps, IDataPreloaderState> {
    constructor(props: IDataPreloaderProps) {
        super(props);
        this.state = {
            pending: true
        };
    }

    componentDidMount() {
        this.onCheck();
    }

    componentWillReceiveProps(props: IDataPreloaderProps) {
        this.onCheck(props);
    }

    onCheck(props: IDataPreloaderProps = this.props) {
        if (0 === props.data.filter(l => !l).length) {
            this.setState({
                pending: false
            });
        }
        else {
            this.setState({
                pending: true
            });
        }
    }

    render() {
        return this.state.pending ? null : this.props.children;
    }
}

export default DataPreloader;