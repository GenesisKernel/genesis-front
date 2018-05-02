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
import { createAccount, importSeed, generateSeed } from 'modules/auth/actions';
import { ICreateAccountCall } from 'genesis/auth';
import { sendAttachment } from 'modules/io/actions';

import Create from 'components/Auth/Account/Create';

export interface ICreateContainerProps {

}

interface ICreateContainerState {
    seed: string;
}

interface ICreateContainerDispatch {
    onImportSeed: () => void;
    onCreate: typeof createAccount.started;
    onGenerateSeed: () => void;
    onDownloadSeed: (seed: string) => void;
}

const mapStateToProps = (state: IRootState) => ({
    seed: state.auth.loadedSeed
});

const mapDispatchToProps = {
    onCreate: (params: ICreateAccountCall) => createAccount.started(params),
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