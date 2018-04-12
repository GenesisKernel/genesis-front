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

import Auth from 'components/Auth';

export interface IAuthContainerProps {

}

interface IAuthContainerState {
    firstRun: boolean;
    isConnected: boolean;
}

interface IAuthContainerDispatch {

}

const mapStateToProps = (state: IRootState) => ({
    firstRun: !state.storage.accounts || 0 === state.storage.accounts.length,
    isConnected: state.engine.isConnected
});

const mapDispatchToProps = {

};

const AuthContainer: React.SFC<IAuthContainerProps & IAuthContainerState & IAuthContainerDispatch> = props => (
    <Auth {...props} />
);

export default connect<IAuthContainerState, IAuthContainerDispatch, IAuthContainerProps>(mapStateToProps, mapDispatchToProps)(AuthContainer);