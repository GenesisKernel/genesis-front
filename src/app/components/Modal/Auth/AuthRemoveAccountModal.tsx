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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IAccount } from 'genesis/auth';

import Modal from '../';

export interface IAuthRemoveAccountModalProps {
    account: IAccount;
}

class AuthRemoveAccountModal extends Modal<IAuthRemoveAccountModalProps, void> {
    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="modal.confirm.title" defaultMessage="Confirmation" />
                </Modal.Header>
                <Modal.Body>
                    <FormattedMessage id="auth.remove.desc" defaultMessage="Do you really want to delete this account? THIS ACTION IS IRREVERSIBLE" />
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                    <Button bsStyle="primary" onClick={this.props.onResult.bind(null, true)}>
                        <FormattedMessage id="process.confirm" defaultMessage="Confirm" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default AuthRemoveAccountModal;