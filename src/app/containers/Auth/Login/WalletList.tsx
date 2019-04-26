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

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { login, selectWallet, removeWallet, loginGuest } from 'modules/auth/actions';
import { navigate } from 'modules/engine/actions';
import { IWallet } from 'apla/auth';
import { modalShow } from 'modules/modal/actions';

import WalletList from 'components/Auth/Login/WalletList';

const mapStateToProps = (state: IRootState) => ({
    isOffline: state.engine.isOffline,
    pending: state.auth.isLoggingIn,
    wallets: state.storage.wallets.sort((a, b) => a.address > b.address ? 1 : -1).map(wallet => ({
        access: [],
        address: wallet.address,
        encKey: wallet.encKey,
        publicKey: wallet.publicKey,
        id: wallet.id,
        ...(state.auth.wallets || []).find(l => l.id === wallet.id)
    })),
    notifications: state.socket.notifications,
    activationEmail: state.engine.activationEmail
});

const mapDispatchToProps = {
    onRemove: removeWallet,
    onLogin: login.started,
    onSelect: selectWallet,
    onCopy: (wallet: IWallet) => modalShow({
        id: 'COPY_WALLET',
        type: 'COPY_WALLET',
        params: {
            wallet
        }
    }),
    onRegister: (wallet: IWallet, activationEmail: string) => modalShow({
        id: 'REGISTER_WALLET',
        type: 'REGISTER_WALLET',
        params: {
            wallet,
            activationEmail
        }
    }),
    onCreate: () => navigate('/account'),
    onGuestLogin: () => loginGuest.started(undefined)
};

export default connect(mapStateToProps, mapDispatchToProps, (state, dispatch: any, props) => ({
    ...props,
    isOffline: state.isOffline,
    pending: state.pending,
    wallets: state.wallets,
    notifications: state.notifications,
    activationEnabled: !!state.activationEmail,
    onRemove: dispatch.onRemove,
    onLogin: dispatch.onLogin,
    onSelect: dispatch.onSelect,
    onCopy: dispatch.onCopy,
    onRegister: (wallet: IWallet) => dispatch.onRegister(wallet, state.activationEmail),
    onCreate: dispatch.onCreate,
    onGuestLogin: dispatch.onGuestLogin

}))(WalletList);