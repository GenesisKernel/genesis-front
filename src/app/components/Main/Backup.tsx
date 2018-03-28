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
import { Button, Panel } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import keyring from 'lib/keyring';
import { sendAttachment } from 'lib/fs';
import { alertShow } from 'modules/content/actions';
import { IAccount } from 'genesis/auth';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as QRCode from 'qrcode.react';

import Wrapper from 'components/Wrapper';
import Validation from 'components/Validation';

export interface IBackupProps extends InjectedIntlProps {
    account: IAccount;
    ecosystems: string[];
    privateKey: string;
    alertShow: typeof alertShow;
}

interface IBackupState {
    privateKey: string;
    publicKey: string;
}

class Backup extends React.Component<IBackupProps, IBackupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            privateKey: props.privateKey,
            publicKey: props.privateKey ? keyring.generatePublicKey(props.privateKey) : null
        };
    }

    onSubmit(values: { [key: string]: string }) {
        const privateKey = keyring.decryptAES(this.props.account.encKey, values.password);

        if (keyring.validatePrivateKey(privateKey)) {
            const publicKey = keyring.generatePublicKey(privateKey);
            this.setState({
                privateKey,
                publicKey
            });
        }
        else {
            this.props.alertShow({
                id: 'E_INVALID_PASSWORD',
                title: this.props.intl.formatMessage({ id: 'alert.error', defaultMessage: 'Error' }),
                type: 'error',
                text: this.props.intl.formatMessage({ id: 'auth.password.invalid', defaultMessage: 'Invalid password' }),
                cancelButton: this.props.intl.formatMessage({ id: 'alert.close', defaultMessage: 'Close' }),
            });
        }
    }

    onCopy() {
        this.props.alertShow({
            id: 'I_COPIED_TO_CLIPBOARD',
            title: this.props.intl.formatMessage({ id: 'alert.info', defaultMessage: 'Information' }),
            type: 'info',
            text: this.props.intl.formatMessage({ id: 'alert.clipboard.copied', defaultMessage: 'Copied to clipboard' }),
            cancelButton: this.props.intl.formatMessage({ id: 'alert.close', defaultMessage: 'Close' }),
        });
    }

    onKeyDownlaod() {
        sendAttachment('key.txt', this.generatePayload());
    }

    formatKey(key: string) {
        return key.match(/.{1,2}/g).join(' ');
    }

    generatePayload() {
        return keyring.backup({
            privateKey: this.state.privateKey,
            ecosystems: this.props.ecosystems
        });
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
                            <CopyToClipboard text={this.generatePayload()} onCopy={this.onCopy.bind(this)}>
                                <Button bsStyle="primary">
                                    <FormattedMessage id="general.clipboard.copy" defaultMessage="Copy to clipboard" />
                                </Button>
                            </CopyToClipboard>
                        </div>
                        <div className="pull-right">
                            <Button bsStyle="primary" onClick={this.onKeyDownlaod.bind(this)}>
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
                            <td>{this.props.account.address}</td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="general.ecosystems" defaultMessage="Ecosystems" />
                            </td>
                            <td>{this.props.ecosystems.join(',')}</td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="auth.qrcode" defaultMessage="QR-Code" />
                            </td>
                            <td>
                                <div className="text-center">
                                    <QRCode value={this.generatePayload()} />
                                    <div className="text-muted">
                                        <FormattedMessage id="auth.qrcode.desc" defaultMessage="Use this code to import the account on your mobile device" />
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
                    title: 'general.account.backup',
                    defaultTitle: 'Backup account'
                }}
                heading={{
                    content: (
                        <FormattedMessage id="general.account.backup" defaultMessage="Backup account" />
                    )
                }}
                description={
                    <FormattedMessage id="general.account.backup" defaultMessage="This section is used to backup your account data. You will not be able to restore access to your account if you forget your password or lose the private key" />
                }
            >
                {this.props.account && (
                    <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                        {this.state.privateKey ? this.renderSecond() : this.renderFirst()}
                    </Validation.components.ValidatedForm>
                )}
            </Wrapper>
        );
    }
}

export default injectIntl(Backup);