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
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { IRootState } from 'modules';
import { setCollapsed } from 'modules/engine/actions';

import Main, { IMainProps } from 'components/Main';
import Dashboard from 'containers/Main/containers/Dashboard';
import Debug from 'containers/Main/containers/Debug';
import Backup from 'containers/Main/containers/Backup';
import EcosystemCreate from 'containers/Main/containers/EcosystemCreate';
import MoneyTransfer from 'containers/Main/containers/MoneyTransfer';
import Forging from 'containers/Main/containers/Forging';
import RequestMembership from 'containers/Main/containers/RequestMembership';
import NotFound from 'containers/Main/containers/NotFound';

const MainContainer: React.SFC<IMainProps> = (props, context) => {
    return (
        <Main {...props}>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/debug" component={Debug} />
                <Route exact path="/backup" component={Backup} />
                <Route exact path="/forging" component={Forging} />
                <Route exact path="/create-ecosystem" component={EcosystemCreate} />
                <Route exact path="/request-membership" component={RequestMembership} />
                <Route exact path="/transfer" component={MoneyTransfer} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Main>
    );
};

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account,
    isCollapsed: state.engine.isCollapsed
});

const mapDispatchToProps = {
    setCollapsed
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);