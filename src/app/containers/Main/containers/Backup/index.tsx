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

import Backup from 'components/Main/Backup';
import { IAccount } from 'genesis/auth';

export interface IBackupProps {
}

interface IBackupState {
    account: IAccount;
    ecosystems: string[];
    privateKey: string;
}

interface IBackupDispatch {

}

const BackupContainer: React.SFC<IBackupProps & IBackupState & IBackupDispatch> = (props) => (
    <Backup {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account,
    ecosystems: state.auth.account && state.storage.accounts
        .filter(l => l.id === state.auth.account.id && '1' !== l.ecosystem)
        .map(l => l.ecosystem)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
    privateKey: state.auth.privateKey
});

const mapDispatchToProps = {

};

export default connect<IBackupState, IBackupDispatch, IBackupProps>(mapStateToProps, mapDispatchToProps)(BackupContainer);