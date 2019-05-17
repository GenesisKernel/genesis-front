/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { logout, changePassword, switchWallet } from 'modules/auth/actions';
import { modalShow } from 'modules/modal/actions';

import UserMenu from 'components/Main/UserMenu';

const mapStateToProps = (state: IRootState) => ({
    isDefaultWallet: state.auth.isDefaultWallet,
    wallet: state.auth.wallet,
    walletEcosystems: ((state.auth.wallet && state.auth.wallet.wallet && state.auth.wallets) ? (state.auth.wallets.find(l => l.id === state.auth.wallet.wallet.id) || { access: [] }).access : []).sort((a, b) => Number(a.ecosystem) - Number(b.ecosystem))
});

export default connect<any, any, any>(mapStateToProps, {
    onLogout: () => logout.started(null),
    onSwitchEcosystem: (ecosystem: string, defaultRole?: boolean) => defaultRole
        ? switchWallet({
            ecosystem,
            role: null
        })
        : modalShow({
            id: 'ROLE_PICKER',
            type: 'ROLE_PICKER',
            params: {
                ecosystem
            }
        }),
    onChangePassword: () => changePassword.started(null)

})(UserMenu);