// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IWallet } from 'apla/auth';
import { login, selectWallet, removeWallet } from 'modules/auth/actions';
import { navigate } from 'modules/engine/actions';

import WalletList from 'components/Auth/Login/WalletList';

export interface IWalletListContainerProps {

}

interface IWalletListContainerState {
    pending: boolean;
    wallet: IWallet;
    wallets: {
        wallet: IWallet;
        notifications: number;
    }[];
}

interface IWalletListContainerDispatch {
    onCreate: () => void;
    onRemove: typeof removeWallet;
    onSelect: typeof selectWallet;
    onLogin: typeof login.started;
}

const mapStateToProps = (state: IRootState) => ({
    pending: state.auth.isLoggingIn,
    wallet: state.auth.wallet,
    wallets: state.storage.wallets.map(wallet => ({
        wallet,
        notifications: state.socket.notifications
            .filter(notification =>
                notification.id === wallet.id &&
                notification.ecosystem === wallet.ecosystem
            )
            .map(l => l.count)
            .concat(0)
            .reduce((a, b) => a + b)
    }))
});

const mapDispatchToProps = {
    onRemove: removeWallet,
    onLogin: login.started,
    onSelect: selectWallet,
    onCreate: () => navigate('/wallet')
};

const WalletListContainer: React.SFC<IWalletListContainerProps & IWalletListContainerState & IWalletListContainerDispatch> = props => (
    <WalletList {...props} />
);

export default connect<IWalletListContainerState, IWalletListContainerDispatch, IWalletListContainerProps>(mapStateToProps, mapDispatchToProps)(WalletListContainer);