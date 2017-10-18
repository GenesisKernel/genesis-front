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
import { login, importSeed, createAccount, clearCreatedAccount } from 'modules/auth/actions';

import Create, { ICreateProps } from 'components/General/Account/Create';

const CreateContainer: React.SFC<ICreateProps> = (props: ICreateProps) => (
    <Create {...props} return="/account" />
);

const mapStateToProps = (state: IRootState) => ({
    isCreatingAccount: state.auth.isCreatingAccount,
    createdAccount: state.auth.createdAccount,
    loadedSeed: state.auth.loadedSeed
});

const mapDispatchToProps = {
    navigate,
    alertShow,
    login: login.started,
    importSeed: importSeed.started,
    createAccount: createAccount.started,
    clearCreatedAccount: clearCreatedAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);