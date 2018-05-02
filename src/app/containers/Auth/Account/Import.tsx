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
import { importSeed, importAccount } from 'modules/auth/actions';

import Import from 'components/Auth/Account/Import';

export interface IImportContainerProps {

}

interface IImportContainerState {
    backup: string;
    pending: boolean;
}

interface IImportContainerDispatch {
    onImportBackup: () => void;
    onConfirm: (params: { backup: string, password: string }) => void;
}

const mapStateToProps = (state: IRootState) => ({
    backup: state.auth.loadedSeed,
    pending: false
});

const mapDispatchToProps = {
    onImportBackup: (file: File) => importSeed.started(file),
    onConfirm: importAccount.started
};

const ImportContainer: React.SFC<IImportContainerProps & IImportContainerState & IImportContainerDispatch> = props => (
    <Import {...props} />
);

export default connect<IImportContainerState, IImportContainerDispatch, IImportContainerProps>(mapStateToProps, mapDispatchToProps)(ImportContainer);