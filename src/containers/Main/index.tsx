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
import { menuPop, menuPush, menuInit } from 'modules/content/actions';

import Main, { IMainProps } from 'components/Main';
import Tables from 'containers/Main/containers/Admin/Tables';
import TablesCreate from 'containers/Main/containers/Admin/Tables/Create';
import TablesView from 'containers/Main/containers/Admin/Tables/View';
import Interface from 'containers/Main/containers/Admin/Interface';
import CreatePage from 'containers/Main/containers/Admin/Interface/CreatePage';
import EditPage from 'containers/Main/containers/Admin/Interface/EditPage';
import CreateMenu from 'containers/Main/containers/Admin/Interface/CreateMenu';
import EditMenu from 'containers/Main/containers/Admin/Interface/EditMenu';
import Contracts from 'containers/Main/containers/Admin/Contracts';
import CreateContract from 'containers/Main/containers/Admin/Contracts/Create';
import DefaultPage from 'containers/Main/containers/DefaultPage';
import Page from 'containers/Main/containers/Page';
import Debug from 'containers/Main/containers/Debug';
import Backup from 'containers/Main/containers/Backup';
import EcosystemCreate from 'containers/Main/containers/EcosystemCreate';
import MoneyTransfer from 'containers/Main/containers/MoneyTransfer';
import RequestMembership from 'containers/Main/containers/RequestMembership';
import NotFound from 'containers/Main/containers/NotFound';

class MainContainer extends React.Component<IMainProps & { menuInit: typeof menuInit.started }> {
    componentDidMount() {
        this.preloadMenu(this.props);
    }

    componentWillReceiveProps(props: IMainProps) {
        this.preloadMenu(props);
    }

    preloadMenu(props: IMainProps) {
        if (!props.pending && !props.menus.find(l => l.name === 'default_menu')) {
            this.props.menuInit({
                session: props.session
            });
        }
    }

    render() {
        return (
            <Main {...this.props}>
                <Switch>
                    <Route exact path="/" component={DefaultPage} />

                    <Route exact path="/admin/tables" component={Tables} />
                    <Route exact path="/admin/tables/create" component={TablesCreate} />
                    <Route exact path="/admin/tables/:tableName" component={TablesView} />
                    <Route exact path="/admin/interface" component={Interface} />
                    <Route exact path="/admin/interface/create-page" component={CreatePage} />
                    <Route exact path="/admin/interface/page/:pageID-:pageName" component={EditPage} />
                    <Route exact path="/admin/interface/menu/:menuID-:menuName" component={EditMenu} />
                    <Route exact path="/admin/interface/create-menu" component={CreateMenu} />
                    <Route exact path="/admin/contracts" component={Contracts} />
                    <Route exact path="/admin/contracts/create" component={CreateContract} />

                    <Route exact path="/page/:pageName" component={Page} />

                    <Route exact path="/debug" component={Debug} />
                    <Route exact path="/backup" component={Backup} />
                    <Route exact path="/create-ecosystem" component={EcosystemCreate} />
                    <Route exact path="/request-membership" component={RequestMembership} />
                    <Route exact path="/transfer" component={MoneyTransfer} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Main>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    account: state.auth.account,
    menus: state.content.menus,
    pending: state.content.pending,
    isCollapsed: state.engine.isCollapsed
});

const mapDispatchToProps = {
    setCollapsed,
    menuPop,
    menuPush,
    menuInit: menuInit.started
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);