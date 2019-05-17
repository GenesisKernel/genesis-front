/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { importSeed, importWallet } from 'modules/auth/actions';

import Import from 'components/Auth/Wallet/Import';

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
    backup: state.auth.seed,
    pending: false
});

const mapDispatchToProps = {
    onImportBackup: (file: File) => importSeed.started(file),
    onConfirm: importWallet.started
};

const ImportContainer: React.SFC<IImportContainerProps & IImportContainerState & IImportContainerDispatch> = props => (
    <Import {...props} />
);

export default connect<IImportContainerState, IImportContainerDispatch, IImportContainerProps>(mapStateToProps, mapDispatchToProps)(ImportContainer);