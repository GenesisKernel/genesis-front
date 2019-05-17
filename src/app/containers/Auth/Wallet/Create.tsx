/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { createWallet, importSeed, generateSeed, changeSeed, changeSeedConfirmation, importSeedConfirmation } from 'modules/auth/actions';
import { ICreateWalletCall } from 'apla/auth';
import { sendAttachment } from 'modules/io/actions';

import Create from 'components/Auth/Wallet/Create';

export interface ICreateContainerProps {

}

interface ICreateContainerState {
    seed: string;
    seedConfirm: string;
}

interface ICreateContainerDispatch {
    onImportSeed: () => void;
    onImportSeedConfirmation: () => void;
    onCreate: typeof createWallet.started;
    onGenerateSeed: () => void;
    onChangeSeed: (value: string) => void;
    onChangeSeedConfirmation: (value: string) => void;
    onDownloadSeed: (seed: string) => void;
}

const mapStateToProps = (state: IRootState) => ({
    seed: state.auth.seed,
    seedConfirm: state.auth.seedConfirm
});

const mapDispatchToProps = {
    onCreate: (params: ICreateWalletCall) => createWallet.started(params),
    onImportSeed: (file: File) => importSeed.started(file),
    onImportSeedConfirmation: (file: File) => importSeedConfirmation.started(file),
    onGenerateSeed: () => generateSeed.started(null),
    onChangeSeed: (value: string) => changeSeed(value),
    onChangeSeedConfirmation: (value: string) => changeSeedConfirmation(value),
    onDownloadSeed: (seed: string) => sendAttachment({
        name: 'seed.txt',
        data: seed
    })
};

const CreateContainer: React.SFC<ICreateContainerProps & ICreateContainerState & ICreateContainerDispatch> = props => (
    <Create {...props} />
);

export default connect<ICreateContainerState, ICreateContainerDispatch, ICreateContainerProps>(mapStateToProps, mapDispatchToProps)(CreateContainer);