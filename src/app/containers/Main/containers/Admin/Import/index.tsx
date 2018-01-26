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
import { importData, importDataPrune } from 'modules/admin/actions';

import Import from 'components/Main/Admin/Import';

export interface IImportContainerProps {
    vde?: boolean;
}

interface IImportContainerState {
    payload: {
        pages: { Name: string }[];
        blocks: { Name: string }[];
        menus: { Name: string }[];
        parameters: { Name: string }[];
        languages: { Name: string }[];
        contracts: { Name: string }[];
        tables: { Name: string }[];
        data: {
            Table: string;
            Columns: string[];
            Data: any[][];
        }[];
    };
}

interface IImportContainerDispatch {
    importData: typeof importData.started;
    importDataPrune: typeof importDataPrune;
}

const ImportContainer: React.SFC<IImportContainerProps & IImportContainerState & IImportContainerDispatch> = (props) => {
    const pruneFactory = (name: string, key: string, index?: number) => {
        props.importDataPrune({
            name,
            key,
            index
        });
    };

    return (
        <Import
            vde={props.vde}
            payload={props.payload}
            importData={props.importData}
            onPrunePage={pruneFactory.bind(null, 'pages')}
            onPruneBlock={pruneFactory.bind(null, 'blocks')}
            onPruneMenu={pruneFactory.bind(null, 'menus')}
            onPruneParameter={pruneFactory.bind(null, 'parameters')}
            onPruneLanguage={pruneFactory.bind(null, 'languages')}
            onPruneContract={pruneFactory.bind(null, 'contracts')}
            onPruneTable={pruneFactory.bind(null, 'tables')}
            onPruneData={pruneFactory.bind(null, 'data')}
        />
    );
};

const mapStateToProps = (state: IRootState) => ({
    payload: state.admin.importPayload
});

const mapDispatchToProps = {
    importData: importData.started,
    importDataPrune
};

export default connect<IImportContainerState, IImportContainerDispatch, IImportContainerProps>(mapStateToProps, mapDispatchToProps)(ImportContainer);