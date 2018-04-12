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

import Modal from '../';
import Validation from 'components/Validation';

export interface IAuthorizeModalProps {
    contract: string;
}

class AuthorizeModal extends Modal<IAuthorizeModalProps, string> {
    onSuccess = (values: { [key: string]: any }) => {
        this.props.onResult(values.password);
    }

    render() {
        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSuccess}>
                <Modal.Header>
                    <FormattedMessage id="modal.authorization.title" defaultMessage="Authorization" />
                </Modal.Header>
                <Modal.Body>
                    <div className="pb">
                        <FormattedMessage id="modal.authorization.password" defaultMessage="Enter your password to sign contract {contract}" values={{ contract: this.props.params.contract }} />
                    </div>
                    <Validation.components.ValidatedFormGroup for="password">
                        <Validation.components.ValidatedControl
                            type="password"
                            name="password"
                            noValidate
                            validators={[Validation.validators.required]}
                        />
                    </Validation.components.ValidatedFormGroup>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Validation.components.ValidatedSubmit bsStyle="primary">
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Validation.components.ValidatedSubmit>
                </Modal.Footer>
            </Validation.components.ValidatedForm>
        );
    }
}
export default AuthorizeModal;