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
import { Route } from 'react-router-dom';
import { IRootState } from 'modules';

import Main, { IMainProps } from 'components/Main';
import Tables from 'containers/Main/containers/Admin/Tables';
import TablesCreate from 'containers/Main/containers/Admin/Tables/Create';
import TablesEdit from 'containers/Main/containers/Admin/Tables/EditTable';
import TablesAddColumn from 'containers/Main/containers/Admin/Tables/AddColumn';
import TablesEditColumn from 'containers/Main/containers/Admin/Tables/EditColumn';
import TablesView from 'containers/Main/containers/Admin/Tables/View';
import TablesHistory from 'containers/Main/containers/Admin/Tables/History';
import Interface from 'containers/Main/containers/Admin/Interface';
import CreatePage from 'containers/Main/containers/Admin/Interface/CreatePage';
import EditPage from 'containers/Main/containers/Admin/Interface/EditPage';
import CreateMenu from 'containers/Main/containers/Admin/Interface/CreateMenu';
import EditMenu from 'containers/Main/containers/Admin/Interface/EditMenu';
import CreateBlock from 'containers/Main/containers/Admin/Interface/CreateBlock';
import EditBlock from 'containers/Main/containers/Admin/Interface/EditBlock';
import Contracts from 'containers/Main/containers/Admin/Contracts';
import CreateContract from 'containers/Main/containers/Admin/Contracts/Create';
import Languages from 'containers/Main/containers/Admin/Languages';
import CreateLanguage from 'containers/Main/containers/Admin/Languages/Create';
import EditLanguage from 'containers/Main/containers/Admin/Languages/Edit';
import EditContract from 'containers/Main/containers/Admin/Contracts/Edit';
import Parameters from 'containers/Main/containers/Admin/Parameters';
import ParametersCreate from 'containers/Main/containers/Admin/Parameters/Create';
import ParametersEdit from 'containers/Main/containers/Admin/Parameters/Edit';
import Import from 'containers/Main/containers/Admin/Import';
import Export from 'containers/Main/containers/Admin/Export';
import VDE from 'containers/Main/containers/Admin/VDE';
import Tabs from 'containers/Main/containers/Admin/Tabs';
import DefaultPage from 'containers/Main/containers/DefaultPage';
import Page from 'containers/Main/containers/Page';
import Debug from 'containers/Main/containers/Debug';
import DebugWs from 'containers/Main/containers/Debug/Ws';
import Backup from 'containers/Main/containers/Backup';
import NotFound from 'containers/Main/containers/NotFound';
import { AnimatedSwitch } from 'components/Animation';

const MainContainer: React.SFC<IMainProps> = props => (
    <Main {...props}>
        <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
            <Route exact path="/" component={DefaultPage} />

            <Route exact path="/admin/tables" component={Tables} />
            <Route exact path="/admin/tables/create" component={TablesCreate} />
            <Route exact path="/admin/tables/:tableName/edit" component={TablesEdit} />
            <Route exact path="/admin/tables/:tableName/edit/column/:columnName" component={TablesEditColumn} />
            <Route exact path="/admin/tables/:tableName/edit/add-column" component={TablesAddColumn} />
            <Route exact path="/admin/tables/:tableName/:id/history" render={routeProps => <TablesHistory table={routeProps.match.params.tableName} id={routeProps.match.params.id} />} />
            <Route exact path="/admin/tables/:tableName" component={TablesView} />
            <Route exact path="/admin/interface" component={Interface} />
            <Route exact path="/admin/interface/create-page" component={CreatePage} />
            <Route exact path="/admin/interface/page/:pageID-:pageName" component={EditPage} />
            <Route exact path="/admin/interface/menu/:menuID-:menuName" component={EditMenu} />
            <Route exact path="/admin/interface/block/:blockID-:blockName" component={EditBlock} />
            <Route exact path="/admin/interface/create-menu" component={CreateMenu} />
            <Route exact path="/admin/interface/create-block" component={CreateBlock} />
            <Route exact path="/admin/contracts" component={Contracts} />
            <Route exact path="/admin/contracts/create" component={CreateContract} />
            <Route exact path="/admin/contracts/:contractID-:contractName" component={EditContract} />
            <Route exact path="/admin/languages" component={Languages} />
            <Route exact path="/admin/languages/create" component={CreateLanguage} />
            <Route exact path="/admin/languages/:translationID-:translationName" component={EditLanguage} />
            <Route exact path="/admin/parameters" component={Parameters} />
            <Route exact path="/admin/parameters/create" component={ParametersCreate} />
            <Route exact path="/admin/parameters/:parameterName" component={ParametersEdit} />
            <Route exact path="/admin/import" component={Import} />
            <Route exact path="/admin/export" component={Export} />
            <Route exact path="/admin/vde" component={VDE} />
            <Route exact path="/admin/tabs" component={Tabs} />
            <Route exact path="/admin/tabs/:type-:id-:name/" component={Tabs} />
            <Route exact path="/admin/tabs/:type-:id/" component={Tabs} />
            <Route exact path="/vde/tabs" component={Tabs} />
            <Route exact path="/vde/tabs/:type-:id-:name/" component={Tabs} />
            <Route exact path="/vde/tabs/:type-:id/" component={Tabs} />

            <Route exact path="/vde/tables" render={routeProps => <Tables {...routeProps} vde />} />
            <Route exact path="/vde/tables/create" render={routeProps => <TablesCreate {...routeProps} vde />} />
            <Route exact path="/vde/tables/:tableName/edit" render={routeProps => <TablesEdit {...routeProps} vde />} />
            <Route exact path="/vde/tables/:tableName/edit/column/:columnName" render={routeProps => <TablesEditColumn {...routeProps} vde />} />
            <Route exact path="/vde/tables/:tableName/edit/add-column" render={routeProps => <TablesAddColumn {...routeProps} vde />} />
            <Route exact path="/vde/tables/:tableName" render={routeProps => <TablesView {...routeProps} vde />} />
            <Route exact path="/vde/interface" render={routeProps => <Interface {...routeProps} vde />} />
            <Route exact path="/vde/interface/create-page" render={routeProps => <CreatePage {...routeProps} vde />} />
            <Route exact path="/vde/interface/page/:pageID-:pageName" render={routeProps => <EditPage {...routeProps} vde />} />
            <Route exact path="/vde/interface/menu/:menuID-:menuName" render={routeProps => <EditMenu {...routeProps} vde />} />
            <Route exact path="/vde/interface/block/:blockID-:blockName" render={routeProps => <EditBlock {...routeProps} vde />} />
            <Route exact path="/vde/interface/create-menu" render={routeProps => <CreateMenu {...routeProps} vde />} />
            <Route exact path="/vde/interface/create-block" render={routeProps => <CreateBlock {...routeProps} vde />} />
            <Route exact path="/vde/contracts" render={routeProps => <Contracts {...routeProps} vde />} />
            <Route exact path="/vde/contracts/create" render={routeProps => <CreateContract {...routeProps} vde />} />
            <Route exact path="/vde/contracts/:contractID-:contractName" render={routeProps => <EditContract {...routeProps} vde />} />
            <Route exact path="/vde/languages" render={routeProps => <Languages {...routeProps} vde />} />
            <Route exact path="/vde/languages/create" render={routeProps => <CreateLanguage {...routeProps} vde />} />
            <Route exact path="/vde/languages/:translationID-:translationName" render={routeProps => <EditLanguage {...routeProps} vde />} />
            <Route exact path="/vde/parameters" render={routeProps => <Parameters {...routeProps} vde />} />
            <Route exact path="/vde/parameters/create" render={routeProps => <ParametersCreate {...routeProps} vde />} />
            <Route exact path="/vde/parameters/:parameterName" render={routeProps => <ParametersEdit {...routeProps} vde />} />
            <Route exact path="/vde/import" render={routeProps => <Import {...routeProps} vde />} />
            <Route exact path="/vde/export" render={routeProps => <Export {...routeProps} vde />} />
            <Route exact path="/vde/page/:pageName" render={routeProps => <Page {...routeProps} vde />} />

            <Route exact path="/page/:pageName" component={Page} />

            <Route exact path="/debug" component={Debug} />
            <Route exact path="/debug/ws" component={DebugWs} />
            <Route exact path="/backup" component={Backup} />
            <Route path="*" component={NotFound} />
        </AnimatedSwitch>
    </Main>
);

const mapStateToProps = (state: IRootState) => ({
    pending: state.content.pending,
    isEcosystemOwner: state.auth.isEcosystemOwner,
    stylesheet: state.content.stylesheet,
    navigationWidth: state.content.navigationWidth,
    navigationVisible: state.content.navigationVisible,
    transactionsCount: state.tx.transactions.count(),
    pendingTransactions: state.tx.transactions.takeLast(5)
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);