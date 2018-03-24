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
import { Route } from 'react-router-dom';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';

import { AnimatedSwitch } from 'components/Animation';
import Offline from './containers/Offline';
import Login from './containers/Login';
import Account from './containers/Account';
import Import from './containers/Account/Import';
import Create from './containers/Account/Create';
import Install from './containers/Install';
import NotFound from './containers/NotFound';

interface IGeneralContainerProps {
    isInstalled: boolean;
    isConnected: boolean;
}

const GeneralContainer: React.SFC<IGeneralContainerProps> = (props) => (
    <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
        {!props.isConnected && (
            <Route path="*" component={Offline} />
        )}
        {!props.isInstalled && (
            <Route path="/" component={Install} />
        )}
        <Route path="/" exact component={Login} />
        <Route path="/account" exact component={Account} />
        <Route path="/account/import" component={Import} />
        <Route path="/account/create" component={Create} />
        <Route path="*" component={NotFound} />
    </AnimatedSwitch>
);

const mapStateToProps = (state: IRootState) => ({
    isLoggingIn: state.auth.isLoggingIn,
    isLoading: state.engine.isLoading,
    isConnected: state.engine.isConnected,
    isInstalled: state.engine.isInstalled,
    isConnecting: state.engine.isConnecting,
});

const mapDispatchToProps = {
    navigate
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralContainer);