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
import { IWalletData } from 'genesis/api';
import { activationLink } from 'lib/format';
import CopyToClipboard from 'react-copy-to-clipboard';

import Modal, { IModalProps } from '../';
import Action from 'components/Auth/Wallet/Action';

export interface IRegisterModalParams {
    activationEmail: string;
    wallet: IWalletData;
}

const onAcivation = (activationEmail: string, publicKey: string) => {
    window.location.href = activationLink(activationEmail, publicKey);
};

const RegisterModal: React.SFC<IModalProps<IRegisterModalParams>> = props => (
    <div>
        <Modal.Header>
            <FormattedMessage id="auth.wallet.registration" defaultMessage="Activation" />
        </Modal.Header>
        <Modal.Body>
            <Action
                icon="icon-envelope-letter"
                title={<FormattedMessage id="auth.wallet.registration.type.email" defaultMessage="Activate using E-Mail" />}
                description={
                    <div>
                        <div>
                            <FormattedMessage
                                id="auth.wallet.registration.type.email.desc"
                                defaultMessage="To activate using E-Mail copy your public key and send it to {mail}"
                                values={{ mail: props.params.activationEmail }}
                            />
                        </div>
                        <CopyToClipboard text={props.params.wallet.publicKey}>
                            <Button bsStyle="link" className="p0 m0">
                                <FormattedMessage id="auth.wallet.copy.public" defaultMessage="Copy public key" />
                            </Button>
                        </CopyToClipboard>
                    </div>
                }
                action={<FormattedMessage id="auth.wallet.registration.type.email.confirm" defaultMessage="Send E-Mail" />}
                onClick={() => onAcivation(props.params.activationEmail, props.params.wallet.publicKey)}
            />
        </Modal.Body>
        <Modal.Footer className="text-right">
            <Button type="button" bsStyle="primary" onClick={props.onClose}>
                <FormattedMessage id="close" defaultMessage="Close" />
            </Button>
        </Modal.Footer>
    </div>
);

export default RegisterModal;