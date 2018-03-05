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
import Interface from 'containers/Main/containers/Admin/Interface';
import CreatePage from 'containers/Main/containers/Admin/Interface/CreatePage';
import CreateMenu from 'containers/Main/containers/Admin/Interface/CreateMenu';
import CreateBlock from 'containers/Main/containers/Admin/Interface/CreateBlock';
import EditPage from 'containers/Main/containers/Admin/Interface/EditPage';
import EditMenu from 'containers/Main/containers/Admin/Interface/EditMenu';
import EditBlock from 'containers/Main/containers/Admin/Interface/EditBlock';
import Tables from 'containers/Main/containers/Admin/Tables';
import Table from 'containers/Main/containers/Admin/Tables/View';
import CreateTable from 'containers/Main/containers/Admin/Tables/Create';
import EditTable from 'containers/Main/containers/Admin/Tables/EditTable';
import AddColumn from 'containers/Main/containers/Admin/Tables/AddColumn';
import EditColumn from 'containers/Main/containers/Admin/Tables/EditColumn';
import History from 'containers/Main/containers/Admin/HistoryViewer';
import Contracts from 'containers/Main/containers/Admin/Contracts';
import CreateContract from 'containers/Main/containers/Admin/Contracts/Create';
import EditContract from 'containers/Main/containers/Admin/Contracts/Edit';
import Parameters from 'containers/Main/containers/Admin/Parameters';
import CreateParameter from 'containers/Main/containers/Admin/Parameters/Create';
import EditParameter from 'containers/Main/containers/Admin/Parameters/Edit';
import Languages from 'containers/Main/containers/Admin/Languages';
import CreateLang from 'containers/Main/containers/Admin/Languages/Create';
import EditLang from 'containers/Main/containers/Admin/Languages/Edit';
import Import from 'containers/Main/containers/Admin/Import';
import Export from 'containers/Main/containers/Admin/Export';
import VDE from 'containers/Main/containers/Admin/VDE';
import Backup from 'containers/Main/containers/Backup';

export interface ILegacyPage {
    menu: string;
    section: string;
    render: (props?: { [key: string]: any }) => React.ReactNode;
}

const LEGACY_PAGES: { [page: string]: ILegacyPage } = {
    'backup': { section: 'home', menu: null, render: () => <Backup /> },
    'interface': { section: 'admin', menu: 'admin_menu', render: () => <Interface /> },
    'create-page': { section: 'admin', menu: 'admin_menu', render: () => <CreatePage /> },
    'create-menu': { section: 'admin', menu: 'admin_menu', render: () => <CreateMenu /> },
    'create-block': { section: 'admin', menu: 'admin_menu', render: () => <CreateBlock /> },
    'edit-page': { section: 'admin', menu: 'admin_menu', render: (props: { name: string }) => <EditPage name={props.name} /> },
    'edit-menu': { section: 'admin', menu: 'admin_menu', render: (props: { name: string }) => <EditMenu name={props.name} /> },
    'edit-block': { section: 'admin', menu: 'admin_menu', render: (props: { name: string }) => <EditBlock name={props.name} /> },
    /*
    <Route exact path="/admin/interface/page/history/:pageID-:pageName" render={routeProps => <PageHistory id={routeProps.match.params.pageID} name={routeProps.match.params.pageName} />} />
    <Route exact path="/admin/interface/menu/history/:menuID-:menuName" render={routeProps => <MenuHistory id={routeProps.match.params.menuID} name={routeProps.match.params.menuName} />} />
    >*/

    'tables': { section: 'admin', menu: 'admin_menu', render: () => <Tables /> },
    'table': { section: 'admin', menu: 'admin_menu', render: (props: { table: string }) => <Table table={props.table} /> },
    'create-table': { section: 'admin', menu: 'admin_menu', render: () => <CreateTable /> },
    'edit-table': { section: 'admin', menu: 'admin_menu', render: (props: { table: string }) => <EditTable table={props.table} /> },
    'add-column': { section: 'admin', menu: 'admin_menu', render: (props: { table: string }) => <AddColumn table={props.table} /> },
    'edit-column': { section: 'admin', menu: 'admin_menu', render: (props: { table: string, column: string }) => <EditColumn table={props.table} column={props.column} /> },
    'history': { section: 'admin', menu: 'admin_menu', render: (props: { table: string, id: string }) => <History table={props.table} id={props.id} /> },

    'contracts': { section: 'admin', menu: 'admin_menu', render: () => <Contracts /> },
    'create-contract': { section: 'admin', menu: 'admin_menu', render: () => <CreateContract /> },
    'edit-contract': { section: 'admin', menu: 'admin_menu', render: (props: { id: string, name: string }) => <EditContract id={props.id} name={props.name} /> },

    'parameters': { section: 'admin', menu: 'admin_menu', render: () => <Parameters /> },
    'create-parameter': { section: 'admin', menu: 'admin_menu', render: () => <CreateParameter /> },
    'edit-parameter': { section: 'admin', menu: 'admin_menu', render: (props: { name: string }) => <EditParameter parameterName={props.name} /> },
    'stylesheet': { section: 'admin', menu: 'admin_menu', render: () => <EditParameter parameterName="stylesheet" /> },

    'languages': { section: 'admin', menu: 'admin_menu', render: () => <Languages /> },
    'create-lang': { section: 'admin', menu: 'admin_menu', render: () => <CreateLang /> },
    'edit-lang': { section: 'admin', menu: 'admin_menu', render: (props: { id: string }) => <EditLang translationID={props.id} /> },

    'import': { section: 'admin', menu: 'admin_menu', render: () => <Import /> },
    'export': { section: 'admin', menu: 'admin_menu', render: () => <Export /> },
    'vde': { section: 'admin', menu: 'admin_menu', render: () => <VDE /> },
};

const VDE_LEGACY_PAGES: { [page: string]: ILegacyPage } = {
    'interface': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Interface vde /> },
    'create-page': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreatePage vde /> },
    'create-menu': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreateMenu vde /> },
    'create-block': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreateBlock vde /> },
    'edit-page': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { name: string }) => <EditPage vde name={props.name} /> },
    'edit-menu': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { name: string }) => <EditMenu vde name={props.name} /> },
    'edit-block': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { name: string }) => <EditBlock vde name={props.name} /> },

    'tables': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Tables vde /> },
    'table': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { table: string }) => <Table vde table={props.table} /> },
    'create-table': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreateTable vde /> },
    'edit-table': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { table: string }) => <EditTable vde table={props.table} /> },
    'add-column': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { table: string }) => <AddColumn vde table={props.table} /> },
    'edit-column': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { table: string, column: string }) => <EditColumn vde table={props.table} column={props.column} /> },

    'contracts': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Contracts vde /> },
    'create-contract': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreateContract vde /> },
    'edit-contract': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { id: string, name: string }) => <EditContract vde id={props.id} name={props.name} /> },

    'parameters': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Parameters vde /> },
    'create-parameter': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreateParameter vde /> },
    'edit-parameter': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { name: string }) => <EditParameter vde parameterName={props.name} /> },
    'stylesheet': { section: 'vdeadmin', menu: 'admin_menu', render: () => <EditParameter vde parameterName="stylesheet" /> },

    'languages': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Languages vde /> },
    'create-lang': { section: 'vdeadmin', menu: 'admin_menu', render: () => <CreateLang vde /> },
    'edit-lang': { section: 'vdeadmin', menu: 'admin_menu', render: (props: { id: string }) => <EditLang vde translationID={props.id} /> },

    'import': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Import vde /> },
    'export': { section: 'vdeadmin', menu: 'admin_menu', render: () => <Export vde /> }
};

export {
    LEGACY_PAGES,
    VDE_LEGACY_PAGES
};