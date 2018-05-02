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

export interface ICreateProps {
    seed: string;
    onCreate: (params: { seed: string, password: string }) => void;
    onGenerateSeed: () => void;
    onImportSeed: (file: File) => void;
    onDownloadSeed: (seed: string) => void;
}

interface ICreateState {
    isConfirming: boolean;
    seed: string;
    seedConfirm: string;
    password: string;
    passwordConfirm: string;
}

class Create extends React.Component<ICreateProps & InjectedIntlProps, ICreateState> {
    private _inputFile: HTMLInputElement;

    constructor(props: ICreateProps & InjectedIntlProps) {
        super(props);
        this.state = {
            isConfirming: false,
            seed: '',
            seedConfirm: '',
            password: '',
            passwordConfirm: ''
        };
    }

    componentWillReceiveProps(props: ICreateProps) {
        this._inputFile.setAttribute('value', null);

        if (this.props.seed !== props.seed) {
            if (this.state.isConfirming) {
                this.setState({
                    seedConfirm: props.seed
                });
            }
            else {
                this.setState({
                    seed: props.seed
                });
            }
        }
    }

    onReturn = () => {
        this.setState({
            isConfirming: false
        });
    }

    onSubmit = (values: { [key: string]: any }) => {
        if (this.state.isConfirming) {
            this.props.onCreate({
                seed: this.state.seedConfirm,
                password: this.state.passwordConfirm
            });
        }
        else {
            this.setState({
                isConfirming: true,
                seed: values.seed,
                password: values.password,
                seedConfirm: ''
            });
        }
    }

    onGenerate = () => {
        this.props.onGenerateSeed();
    }

    onSeedChange = (seed: string) => {
        this.setState({
            seed
        });
    }

    onSeedConfirmationChange = (seedConfirm: string) => {
        this.setState({
            seedConfirm
        });
    }

    onPasswordChange = (password: string) => {
        this.setState({
            password
        });
    }

    onPasswordConfirmationChange = (passwordConfirm: string) => {
        this.setState({
            passwordConfirm
        });
    }

    onSave = () => {
        this.props.onDownloadSeed(this.state.seed);
    }

    onLoad = () => {
        this._inputFile.click();
    }

    onLoadSuccess = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onImportSeed(e.target.files[0]);
    }

    render() {
        return (
            <LocalizedDocumentTitle title="account.create" defaultTitle="Create account">
                <div>
                    <Heading returnUrl={this.state.isConfirming ? null : '/account'} onReturn={this.state.isConfirming ? this.onReturn : null}>
                        <FormattedMessage id="account.create" defaultMessage="Create account" />
                    </Heading>
                    <input type="file" className="hidden" onChange={this.onLoadSuccess} ref={l => this._inputFile = l} />
                    <div className="text-center">
                        <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                            {!this.state.isConfirming && (
                                <Generator
                                    seed={this.state.seed}
                                    onGenerate={this.onGenerate}
                                    onLoad={this.onLoad}
                                    onSave={this.onSave}
                                    onSeedChange={this.onSeedChange}
                                    onPasswordChange={this.onPasswordChange}
                                    password={this.state.password}
                                    descriptionValue={
                                        <FormattedMessage
                                            id="auth.remember.disclaimer"
                                            defaultMessage="Please make sure that you keep your passphrase (account seed) safe and remember the password. You will be asked to re-type them for confirmation"
                                        />
                                    }
                                />
                            )}
                            {this.state.isConfirming && (
                                <Generator
                                    seed={this.state.seedConfirm}
                                    onLoad={this.onLoad}
                                    onSeedChange={this.onSeedConfirmationChange}
                                    onPasswordChange={this.onPasswordConfirmationChange}
                                    password={this.state.passwordConfirm}
                                    compareSeed={this.state.seed}
                                    comparePassword={this.state.password}
                                    descriptionValue={
                                        <FormattedMessage
                                            id="auth.remember.disclaimer.confirm"
                                            defaultMessage="Please repeat your registration values. This step is required to ensure that your passphrase and password are stored correctly"
                                        />
                                    }
                                />
                            )}
                            <div className="text-right">
                                <Validation.components.ValidatedSubmit bsStyle="primary">
                                    {!this.state.isConfirming && (
                                        <FormattedMessage id="process.continue" defaultMessage="Continue" />
                                    )}
                                    {this.state.isConfirming && (
                                        <FormattedMessage id="process.confirm" defaultMessage="Confirm" />
                                    )}
                                </Validation.components.ValidatedSubmit>
                            </div>
                        </Validation.components.ValidatedForm>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default injectIntl(Create);