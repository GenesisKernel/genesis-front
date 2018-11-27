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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Modal, { IModalProps } from '../';
import Validation from 'components/Validation';

export interface IAuthorizeModalParams {
    contract?: string;
}

export interface IAuthorizeModalProps extends IModalProps<IAuthorizeModalParams> {
    onAuthorize: (password: string) => void;
}

const AuthorizeModal: React.SFC<IAuthorizeModalProps> = props => (
    <Validation.components.ValidatedForm onSubmitSuccess={values => props.onAuthorize(values.password)}>
        <Modal.Header>
            <FormattedMessage id="modal.authorization.title" defaultMessage="Authorization" />
        </Modal.Header>
        <Modal.Body>
            <div className="pb">
                <FormattedMessage
                    id="modal.authorization.password"
                    defaultMessage="Enter your password to sign contract {contract}"
                    values={{ contract: props.params.contract }}
                />
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
            <Button type="button" bsStyle="link" onClick={props.onClose}>
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
            <Validation.components.ValidatedSubmit bsStyle="primary">
                <FormattedMessage id="confirm" defaultMessage="Confirm" />
            </Validation.components.ValidatedSubmit>
        </Modal.Footer>
    </Validation.components.ValidatedForm>
);

export default AuthorizeModal;