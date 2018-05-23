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

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IAccount } from 'genesis/auth';

import PasswordPrompt from 'components/Auth/Login/PasswordPrompt';
import { logout, login } from 'modules/auth/actions';

export interface IPasswordPromptContainerProps {

}

interface IPasswordPromptContainerState {
    account: IAccount;
}

interface IPasswordPromptContainerDispatch {
    onSubmit: (params: { account: IAccount, password: string }) => void;
    onCancel: () => void;
}

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account
});

const mapDispatchToProps = {
    onCancel: () => logout.started(null),
    onSubmit: (params: { account: IAccount, password: string }) => login.started(params)
};

const PasswordPromptContainer: React.SFC<IPasswordPromptContainerProps & IPasswordPromptContainerState & IPasswordPromptContainerDispatch> = props => (
    <PasswordPrompt {...props} />
);

export default connect<IPasswordPromptContainerState, IPasswordPromptContainerDispatch, IPasswordPromptContainerProps>(mapStateToProps, mapDispatchToProps)(PasswordPromptContainer);