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

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IModalProps } from 'components/Modal';
import { switchWallet } from 'modules/auth/actions';
import { modalClose } from 'modules/modal/actions';

import RolePickerModal from 'components/Modal/RolePickerModal';

export interface IRolePickerModalProps {
    walletID: string;
    ecosystem: string;
}

const mapStateToProps = (state: IRootState, props: IModalProps<IRolePickerModalProps, void>) => ({
    ...props,
    params: {
        walletID: state.auth.session.wallet.id,
        ecosystem: props.params.ecosystem,
        ecosystemName: state.auth.wallets
            .find(w => w.id === state.auth.session.wallet.id).access.find(a => a.ecosystem === props.params.ecosystem).name,
        roles: state.auth.wallets
            .find(w => w.id === state.auth.session.wallet.id).access.find(a => a.ecosystem === props.params.ecosystem).roles
    }
});

export default connect(mapStateToProps, {
    onSwitchWallet: switchWallet,
    modalClose: modalClose

}, (state, dispatch: any, props) => ({
    ...state,
    onSwitchWallet: (role: string) => {
        dispatch.modalClose({
            reason: 'CLOSE',
            data: null
        });
        dispatch.onSwitchWallet({
            ecosystem: props.params.ecosystem,
            role
        });
    }
}))(RolePickerModal);