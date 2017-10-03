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
//import Keyring from 'lib/keyring';

export interface IBackupProps {
    wallet: string;
}

interface IBackupState {

}

export default class extends React.Component<IBackupProps, IBackupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            keyring: null
        };
    }

    onSubmit(values: { [key: string]: string }) {
        /*const encKey = this.props.keyring.getEncKey();
        const privateKey = Keyring.decryptAES(encKey, values.password);

        if (!privateKey) {
            // TODO: Notification stub
            alert('Incorrect password');
        }
        else {
            this.setState({
                keyring: Keyring.fromPrivate(this.props.keyring.getPublicKey(), privateKey)
            });
        }*/
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
                            <Button bsStyle="primary">
                                <FormattedMessage id="general.clipboard.copy" defaultMessage="Copy to clipboard" />
                            </Button>
                        </div>
                        <div className="pull-right">
                            <Button bsStyle="primary">
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
                                <td style={{ minWidth: 100 }}>Private key</td>
                                <td>{/*this.state.keyring.getPrivateKey()*/}</td>
                            </tr>
                            <tr>
                                <td>Public key</td>
                                <td>{/*this.state.keyring.getPublicKey()*/}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{this.props.wallet}</td>
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
                    {/*this.state.keyring ? this.renderSecond() : this.renderFirst()*/}
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}