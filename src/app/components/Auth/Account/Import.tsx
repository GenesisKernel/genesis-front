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
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Generator from './Generator';
import Validation from 'components/Validation';
import Heading from 'components/Auth/Heading';

export interface IImportProps {
    backup: string;
    pending: boolean;
    onImportBackup: (file: File) => void;
    onConfirm: (params: { backup: string, password: string }) => void;
}

interface IImportState {
    backup: string;
    password: string;
}

class Import extends React.Component<IImportProps & InjectedIntlProps, IImportState> {
    private _inputFile: HTMLInputElement;

    constructor(props: IImportProps & InjectedIntlProps) {
        super(props);
        this.state = {
            backup: '',
            password: ''
        };
    }

    componentWillReceiveProps(props: IImportProps) {
        this._inputFile.setAttribute('value', null);

        if (this.props.backup !== props.backup) {
            this.setState({
                backup: props.backup
            });
        }
    }

    onSubmit = (values: { [key: string]: any }) => {
        this.props.onConfirm({
            backup: this.state.backup,
            password: this.state.password
        });
    }

    onBackupChange = (backup: string) => {
        this.setState({
            backup
        });
    }

    onPasswordChange = (password: string) => {
        this.setState({
            password
        });
    }

    onLoad = () => {
        this._inputFile.click();
    }

    onLoadSuccess = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onImportBackup(e.target.files[0]);
    }

    render() {
        return (
            <LocalizedDocumentTitle title="account.import" defaultTitle="Import account">
                <div>
                    <Heading returnUrl="/account">
                        <FormattedMessage id="account.import" defaultMessage="Import account" />
                    </Heading>
                    <input type="file" className="hidden" onChange={this.onLoadSuccess} ref={l => this._inputFile = l} />
                    <div className="text-center">
                        <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                            <Generator
                                seed={this.state.backup}
                                onLoad={this.onLoad}
                                onSeedChange={this.onBackupChange}
                                onPasswordChange={this.onPasswordChange}
                                password={this.state.password}
                                descriptionValue={
                                    <FormattedMessage
                                        id="auth.import.disclaimer"
                                        defaultMessage="Please enter your account backup payload to restore access to the system"
                                    />
                                }
                            />
                            <div className="text-right">
                                <Validation.components.ValidatedSubmit bsStyle="primary">
                                    <FormattedMessage id="process.confirm" defaultMessage="Confirm" />
                                </Validation.components.ValidatedSubmit>
                            </div>
                        </Validation.components.ValidatedForm>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default injectIntl(Import);