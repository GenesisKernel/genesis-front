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
import { createWallet, importSeed, generateSeed } from 'modules/auth/actions';
import { ICreateWalletCall } from 'genesis/auth';
import { sendAttachment } from 'modules/io/actions';

import Create from 'components/Auth/Wallet/Create';

export interface ICreateContainerProps {

}

interface ICreateContainerState {
    seed: string;
}

interface ICreateContainerDispatch {
    onImportSeed: () => void;
    onCreate: typeof createWallet.started;
    onGenerateSeed: () => void;
    onDownloadSeed: (seed: string) => void;
}

const mapStateToProps = (state: IRootState) => ({
    seed: state.auth.loadedSeed
});

const mapDispatchToProps = {
    onCreate: (params: ICreateWalletCall) => createWallet.started(params),
    onImportSeed: (file: File) => importSeed.started(file),
    onGenerateSeed: () => generateSeed.started(null),
    onDownloadSeed: (seed: string) => sendAttachment({
        name: 'seed.txt',
        data: seed
    })
};

const CreateContainer: React.SFC<ICreateContainerProps & ICreateContainerState & ICreateContainerDispatch> = props => (
    <Create {...props} />
);

export default connect<ICreateContainerState, ICreateContainerDispatch, ICreateContainerProps>(mapStateToProps, mapDispatchToProps)(CreateContainer);