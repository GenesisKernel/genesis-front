// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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