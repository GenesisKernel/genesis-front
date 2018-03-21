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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { intialize } from 'modules/engine/actions';

export interface IInitHookProps {

}

interface IInitHookState {

}

interface IInitHookDispatch {
    intialize: typeof intialize;
}

class InitHook extends React.Component<IInitHookProps & IInitHookState & IInitHookDispatch> {
    componentDidMount() {
        this.props.intialize();
    }

    render() {
        return null as JSX.Element;
    }
}

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    intialize
};

export default connect<IInitHookState, IInitHookDispatch, IInitHookProps>(mapStateToProps, mapDispatchToProps)(InitHook);