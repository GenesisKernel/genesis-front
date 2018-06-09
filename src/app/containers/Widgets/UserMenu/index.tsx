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
import { Dispatch, Action } from 'redux';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { logout, selectWallet, changePassword } from 'modules/auth/actions';
import { IWallet } from 'genesis/auth';

import UserMenu from 'components/Main//UserMenu';

export interface IUserMenuContainerProps {

}

interface IUserMenuContainerState {
    wallet: IWallet;
    ecosystemWallets: IWallet[];
}

interface IUserMenuContainerDispatch {
    logout: typeof logout.started;
    selectWallet: typeof selectWallet;
    changePassword: typeof changePassword.started;
}

const UserMenuContainer: React.SFC<IUserMenuContainerProps & IUserMenuContainerState & IUserMenuContainerDispatch> = (props) => (
    <UserMenu
        wallet={props.wallet}
        ecosystemWallets={props.ecosystemWallets}
        logout={() => props.logout({})}
        switchWallet={props.selectWallet}
        changePassword={() => props.changePassword(null)}
    />
);

const mapStateToProps = (state: IRootState) => ({
    wallet: state.auth.wallet,
    ecosystemWallets: state.auth.wallet ?
        state.storage.wallets.filter(l =>
            l.id === state.auth.wallet.id
        ).sort((a, b) => parseInt(a.ecosystem, 10) - parseInt(b.ecosystem, 10)) : [],
    ecosystem: state.auth.ecosystem
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    logout: () => {
        dispatch(logout.started(null));
    },
    selectWallet: (wallet: IWallet) => {
        dispatch(logout.started(null));
        dispatch(selectWallet(wallet));
    },
    changePassword: () => {
        dispatch(changePassword.started(null));
    }
});

export default connect<IUserMenuContainerState, IUserMenuContainerDispatch, IUserMenuContainerProps>(mapStateToProps, mapDispatchToProps)(UserMenuContainer);