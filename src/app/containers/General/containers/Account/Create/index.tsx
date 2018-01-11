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
import { navigate } from 'modules/engine/actions';
import { alertShow } from 'modules/content/actions';
import { login, importSeed, createAccount } from 'modules/auth/actions';

import Create from 'components/General/Account/Create';

export interface ICreateContainerProps {

}

interface ICreateContainerState {
    isCreatingAccount: boolean;
    createAccountError: string;
    loadedSeed: string;
}

interface ICreateContainerDispatch {
    navigate: typeof navigate;
    alertShow: typeof alertShow;
    login: typeof login.started;
    importSeed: typeof importSeed.started;
    createAccount: typeof createAccount.started;
}

const CreateContainer: React.SFC<ICreateContainerProps & ICreateContainerState & ICreateContainerDispatch> = (props) => (
    <Create {...props} return="/account" />
);

const mapStateToProps = (state: IRootState) => ({
    isCreatingAccount: state.auth.isCreatingAccount,
    createAccountError: state.auth.createAccountError,
    loadedSeed: state.auth.loadedSeed
});

const mapDispatchToProps = {
    navigate,
    alertShow,
    login: login.started,
    importSeed: importSeed.started,
    createAccount: createAccount.started
};

export default connect<ICreateContainerState, ICreateContainerDispatch, ICreateContainerProps>(mapStateToProps, mapDispatchToProps)(CreateContainer);