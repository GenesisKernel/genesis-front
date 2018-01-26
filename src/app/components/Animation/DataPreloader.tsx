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