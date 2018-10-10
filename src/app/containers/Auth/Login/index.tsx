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

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IWallet } from 'apla/auth';

import Login from 'components/Auth/Login';

export interface ILoginContainerProps {

}

interface ILoginContainerState {
    wallet: IWallet;
    isAuthenticating: boolean;
    isSelectingRole: boolean;
}

interface ILoginContainerDispatch {
    onLogout: () => void;
}

const mapStateToProps = (state: IRootState) => ({
    wallet: state.auth.wallet,
    isAuthenticating: state.auth.wallet && !state.auth.isAuthenticated,
    isSelectingRole: state.auth.roles && state.auth.roles.length && state.auth.wallet && !state.auth.isAuthenticated
});

const mapDispatchToProps = {

};

const LoginContainer: React.SFC<ILoginContainerProps & ILoginContainerState & ILoginContainerDispatch> = props => (
    <Login {...props} />
);

export default connect<ILoginContainerState, ILoginContainerDispatch, ILoginContainerProps>(mapStateToProps, mapDispatchToProps)(LoginContainer);