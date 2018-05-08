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
import { modalShow } from 'modules/modal/actions';
import { FormattedMessage } from 'react-intl';

import Backup from 'components/Main/Backup';
import { IAccount } from 'genesis/auth';

export interface IBackupContainerProps {
}

interface IBackupContainerState {
    account: IAccount;
    ecosystems: string[];
    privateKey: string;
}

interface IBackupContainerDispatch {
    onError: () => void;
    onCopy: () => void;
}

const BackupContainer: React.SFC<IBackupContainerProps & IBackupContainerState & IBackupContainerDispatch> = (props) => (
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
    onError: () => modalShow({
        id: 'E_INVALID_PASSWORD',
        type: 'AUTH_ERROR',
        params: {
            error: 'E_INVALID_PASSWORD'
        }
    }),
    onCopy: () => modalShow({
        id: 'I_COPIED',
        type: 'INFO',
        params: {
            value: (<FormattedMessage id="alert.clipboard.copied" defaultMessage="alert.clipboard.copied" />)
        }
    })
};

export default connect<IBackupContainerState, IBackupContainerDispatch, IBackupContainerProps>(mapStateToProps, mapDispatchToProps)(BackupContainer);