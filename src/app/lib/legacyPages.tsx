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
import Tables from 'containers/Main/containers/Admin/Tables';
import Table from 'containers/Main/containers/Admin/Tables/View';
import CreateTable from 'containers/Main/containers/Admin/Tables/Create';
import EditTable from 'containers/Main/containers/Admin/Tables/EditTable';
import AddColumn from 'containers/Main/containers/Admin/Tables/AddColumn';
import EditColumn from 'containers/Main/containers/Admin/Tables/EditColumn';
import History from 'containers/Main/containers/Admin/HistoryViewer';
import Contracts from 'containers/Main/containers/Admin/Contracts';
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
import Editor from 'containers/Main/containers/Admin/Editor';

export interface ILegacyPage {
    menu: string;
    section: string;
    render: (props?: { [key: string]: any }) => React.ReactNode;
}

const LEGACY_PAGES: { [page: string]: ILegacyPage } = {
    'backup': { section: 'home', menu: null, render: () => <Backup /> },
    'interface': { section: 'admin', menu: 'admin_menu', render: () => <Interface /> },
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

    'editor': { section: 'editor', menu: null, render: (props: { open?: string, create?: string, name?: string, vde?: string }) => <Editor {...props} /> }
};

export {
    LEGACY_PAGES
};