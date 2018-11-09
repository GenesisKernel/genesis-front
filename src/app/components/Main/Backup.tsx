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
import { Button, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import keyring from 'lib/keyring';
import { sendAttachment } from 'lib/fs';
import { ISession } from 'genesis/auth';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

import Wrapper from 'components/Wrapper';
import Validation from 'components/Validation';

export interface IBackupProps {
    session: ISession;
    privateKey: string;
    onError?: () => any;
    onCopy?: () => any;
}

interface IBackupState {
    privateKey: string;
    publicKey: string;
}

class Backup extends React.Component<IBackupProps, IBackupState> {
    constructor(props: IBackupProps) {
        super(props);
        this.state = {
            privateKey: props.privateKey,
            publicKey: props.privateKey ? keyring.generatePublicKey(props.privateKey) : null
        };
    }

    onSubmit = (values: { [key: string]: string }) => {
        const privateKey = keyring.decryptAES(this.props.session.wallet.encKey, values.password);

        if (keyring.validatePrivateKey(privateKey)) {
            const publicKey = keyring.generatePublicKey(privateKey);
            this.setState({
                privateKey,
                publicKey
            });
        }
        else {
            this.props.onError();
        }
    }

    onKeyDownlaod = () => {
        sendAttachment('key.txt', this.props.privateKey);
    }

    formatKey = (key: string) => {
        return key.match(/.{1,2}/g).join(' ');
    }

    renderFirst() {
        return (
            <Panel
                bsStyle="default"
                footer={(
                    <div className="clearfix">
                        <div className="pull-right">
                            <Button bsStyle="primary" type="submit">
                                <FormattedMessage id="general.backup.create" defaultMessage="Create backup" />
                            </Button>
                        </div>
                    </div>
                )}
            >
                <Validation.components.ValidatedFormGroup for="password">
                    <label htmlFor="password">
                        <FormattedMessage id="auth.password" defaultMessage="Password" />
                        <strong className="text-danger">*</strong>
                    </label>
                    <Validation.components.ValidatedControl type="password" name="password" validators={[Validation.validators.required]} />
                </Validation.components.ValidatedFormGroup>
            </Panel>
        );
    }

    renderSecond() {
        return (
            <Panel
                bsStyle="default"
                footer={(
                    <div className="clearfix">
                        <div className="pull-left">
                            <CopyToClipboard text={this.props.privateKey} onCopy={this.props.onCopy}>
                                <Button bsStyle="primary">
                                    <FormattedMessage id="general.clipboard.copy" defaultMessage="Copy to clipboard" />
                                </Button>
                            </CopyToClipboard>
                        </div>
                        <div className="pull-right">
                            <Button bsStyle="primary" onClick={this.onKeyDownlaod}>
                                <FormattedMessage id="general.download.asfile" defaultMessage="Download as file" />
                            </Button>
                        </div>
                    </div>
                )}
            >
                <table className="table table-striped table-bordered table-hover preline">
                    <tbody>
                        <tr>
                            <td style={{ minWidth: 100 }}>
                                <FormattedMessage id="general.key.private" defaultMessage="Private key" />
                            </td>
                            <td>{this.formatKey(this.state.privateKey)}</td>
                        </tr>
                        <tr>
                            <td style={{ minWidth: 100 }}>
                                <FormattedMessage id="general.key.public" defaultMessage="Public key" />
                            </td>
                            <td>{this.formatKey(this.state.publicKey)}</td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="general.address" defaultMessage="Address" />
                            </td>
                            <td>{this.props.session.wallet.address}</td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="auth.qrcode" defaultMessage="QR-Code" />
                            </td>
                            <td>
                                <div className="text-center">
                                    <QRCode value={this.props.privateKey || this.state.privateKey} />
                                    <div className="text-muted">
                                        <FormattedMessage id="auth.qrcode.desc" defaultMessage="Use this code to import the wallet on your mobile device" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Panel>
        );
    }

    render() {
        return (
            <Wrapper
                type="default"
                title={{
                    title: 'general.wallet.backup',
                    defaultTitle: 'Backup wallet'
                }}
                heading={{
                    content: (
                        <FormattedMessage id="general.wallet.backup" defaultMessage="Backup wallet" />
                    )
                }}
                description={
                    <FormattedMessage id="general.wallet.backup" defaultMessage="This section is used to backup your wallet data. You will not be able to restore access to your wallet if you forget your password or lose the private key" />
                }
            >
                {this.props.session && (
                    <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                        {this.state.privateKey ? this.renderSecond() : this.renderFirst()}
                    </Validation.components.ValidatedForm>
                )}
            </Wrapper>
        );
    }
}

export default Backup;