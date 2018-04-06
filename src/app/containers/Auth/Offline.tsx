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
import { checkOnline } from 'modules/engine/actions';

import Offline from 'components/Auth/Offline';

export interface IOfflineContainerProps {

}

interface IOfflineContainerState {
    isConnecting: boolean;
    isConnected: boolean;
}

interface IOfflineContainerDispatch {
    checkOnline: () => void;
}

const mapStateToProps = (state: IRootState) => ({
    isConnected: state.engine.isConnected,
    isConnecting: state.engine.isConnecting
});

const mapDispatchToProps = {
    checkOnline: () => checkOnline.started(null)
};

const OfflineContainer: React.SFC<IOfflineContainerProps & IOfflineContainerState & IOfflineContainerDispatch> = props => (
    <Offline {...props} />
);

export default connect<IOfflineContainerState, IOfflineContainerDispatch, IOfflineContainerProps>(mapStateToProps, mapDispatchToProps)(OfflineContainer);