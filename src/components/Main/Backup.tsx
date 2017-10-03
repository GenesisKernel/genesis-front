// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { Button, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Validation from 'components/Validation';
import keyring from 'lib/keyring';
import { sendAttachment } from 'lib/fs';
import { IStoredKey } from 'lib/storage';
import * as CopyToClipboard from 'react-copy-to-clipboard';

export interface IBackupProps {
    account: IStoredKey;
    privateKey: string;
}

interface IBackupState {
    privateKey: string;
}

export default class extends React.Component<IBackupProps, IBackupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            privateKey: this.props.privateKey
        };
    }

    onSubmit(values: { [key: string]: string }) {
        const privateKey = keyring.decryptAES(this.props.account.encKey, values.password);

        if (privateKey) {
            this.setState({
                privateKey
            });
        }
        else {
            // TODO: Notification stub
            alert('Incorrect password');
        }
    }

    onCopy() {
        // TODO: Notification stub
        alert('Copied to clipboard');
    }

    onKeyDownlaod() {
        sendAttachment('key.txt', this.generatePayload());
    }

    formatKey(key: string) {
        return key.match(/.{1,2}/g).join(' ');
    }

    generatePayload() {
        return [
            //`Seed: e2cfd8ff56f96996a65261c78aceff2a12ceb748d5459e6120f4ba612d67633d`,
            `ID: ${this.props.account.id}`,
            `Private Key: ${this.state.privateKey}`,
            `Public Key: ${this.props.account.publicKey}`,
            `Address: ${this.props.account.address}`
        ].join('\n');
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
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover preline">
                        <tbody>
                            <tr>
                                <td style={{ minWidth: 100 }}>
                                    <FormattedMessage id="general.key.private" defaultMessage="Private key" />
                                </td>
                                <td>{this.formatKey(this.state.privateKey)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <FormattedMessage id="general.key.public" defaultMessage="Public key" />
                                </td>
                                <td>{this.formatKey(this.props.account.publicKey)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <FormattedMessage id="general.address" defaultMessage="Address" />
                                </td>
                                <td>{this.props.account.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Panel>
        );
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-heading">
                    <FormattedMessage id="general.backup" defaultMessage="Backup" />
                </div>
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    {this.state.privateKey ? this.renderSecond() : this.renderFirst()}
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}