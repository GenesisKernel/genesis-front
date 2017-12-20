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
import { IRootState } from 'modules';
import { IInterfacesResponse, IParameterResponse, IContract, ITablesResponse } from 'lib/api';
import { getContracts, getInterface, getParameters, getLanguages, getTables, exportData } from 'modules/admin/actions';

import Export from 'components/Main/Admin/Export';

export interface IExportContainerProps {
    vde?: boolean;
}

interface IExportContainerState {
    interfaces: IInterfacesResponse;
    parameters: IParameterResponse[];
    contracts: IContract[];
    languages: { id: string, name: string }[];
    tables: ITablesResponse;
    exportPayload: object;
}

interface IExportContainerDispatch {
    getInterface: typeof getInterface.started;
    getParameters: typeof getParameters.started;
    getLanguages: typeof getLanguages.started;
    getContracts: typeof getContracts.started;
    getTables: typeof getTables.started;
    exportData: typeof exportData.started;
}

class ExportContainer extends React.Component<IExportContainerProps & IExportContainerState & IExportContainerDispatch> {
    componentDidMount() {
        // TODO: Move to a separate action
        this.props.getInterface({ vde: this.props.vde });
        this.props.getParameters({ vde: this.props.vde });
        this.props.getLanguages({ vde: this.props.vde });
        this.props.getContracts({ vde: this.props.vde });
        this.props.getTables({ vde: this.props.vde });
    }

    render() {
        return (
            <Export
                vde={this.props.vde}
                exportPayload={this.props.exportPayload}
                exportData={this.props.exportData}
                pages={this.props.interfaces && this.props.interfaces.pages}
                blocks={this.props.interfaces && this.props.interfaces.blocks}
                menus={this.props.interfaces && this.props.interfaces.menus}
                parameters={this.props.parameters && this.props.parameters.map(l => ({ name: l.name }))}
                languages={this.props.languages && this.props.languages.map(l => ({ id: l.id, name: l.name }))}
                contracts={this.props.contracts && this.props.contracts.map(l => ({ id: l.id, name: l.name }))}
                tables={this.props.tables && this.props.tables.list.map(l => ({ name: l.name }))}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    interfaces: state.admin.interfaces,
    parameters: state.admin.parameters,
    languages: state.admin.languages,
    contracts: state.admin.contracts,
    tables: state.admin.tables,
    exportPayload: state.admin.exportPayload
});

const mapDispatchToProps = {
    getInterface: getInterface.started,
    getParameters: getParameters.started,
    getLanguages: getLanguages.started,
    getContracts: getContracts.started,
    getTables: getTables.started,
    exportData: exportData.started
};

export default connect<IExportContainerState, IExportContainerDispatch, IExportContainerProps>(mapStateToProps, mapDispatchToProps)(ExportContainer);