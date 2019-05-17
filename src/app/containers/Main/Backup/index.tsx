/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalShow } from 'modules/modal/actions';
import { FormattedMessage } from 'react-intl';

import Backup from 'components/Main/Backup';

const mapStateToProps = (state: IRootState) => ({
    wallet: state.auth.wallet,
    privateKey: state.auth.privateKey
});

export default connect(mapStateToProps, {
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
})(Backup);