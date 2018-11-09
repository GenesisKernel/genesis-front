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
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Generator from './Generator';
import Validation from 'components/Validation';
import Heading from 'components/Auth/Heading';

export interface ICreateProps {
    seed: string;
    seedConfirm: string;
    onCreate: (params: { seed: string, password: string }) => void;
    onGenerateSeed: () => void;
    onChangeSeed: (seed: string) => void;
    onChangeSeedConfirmation: (value: string) => void;
    onImportSeed: (file: File) => void;
    onImportSeedConfirmation: (file: File) => void;
    onDownloadSeed: (seed: string) => void;
}

interface ICreateState {
    isConfirming: boolean;
    password: string;
    passwordConfirm: string;
}

class Create extends React.Component<ICreateProps & InjectedIntlProps, ICreateState> {
    private _inputFile: HTMLInputElement;

    constructor(props: ICreateProps & InjectedIntlProps) {
        super(props);
        this.state = {
            isConfirming: false,
            password: '',
            passwordConfirm: ''
        };
    }

    componentWillReceiveProps(props: ICreateProps) {
        this._inputFile.setAttribute('value', null);
    }

    onReturn = () => {
        this.setState({
            isConfirming: false
        });
    }

    onSubmit = (values: { [key: string]: any }) => {
        if (this.state.isConfirming) {
            this.props.onCreate({
                seed: this.props.seedConfirm,
                password: this.state.passwordConfirm
            });
        }
        else {
            this.props.onChangeSeedConfirmation('');
            this.setState({
                isConfirming: true,
                password: values.password
            });
        }
    }

    onGenerate = () => {
        this.props.onGenerateSeed();
    }

    onSeedConfirmationChange = (seedConfirm: string) => {
        this.props.onChangeSeedConfirmation(seedConfirm);
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
        this.props.onDownloadSeed(this.props.seed);
    }

    onLoad = () => {
        this._inputFile.click();
    }

    onLoadSuccess = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.state.isConfirming) {
            this.props.onImportSeedConfirmation(e.target.files[0]);
        }
        else {
            this.props.onImportSeed(e.target.files[0]);
        }
    }

    render() {
        return (
            <LocalizedDocumentTitle title="wallet.create" defaultTitle="Create wallet">
                <div>
                    <Heading returnUrl={this.state.isConfirming ? null : '/wallet'} onReturn={this.state.isConfirming ? this.onReturn : null}>
                        <FormattedMessage id="wallet.create" defaultMessage="Create wallet" />
                    </Heading>
                    <input type="file" className="hidden" onChange={this.onLoadSuccess} ref={l => this._inputFile = l} />
                    <div className="text-center">
                        <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                            {!this.state.isConfirming && (
                                <Generator
                                    seed={this.props.seed}
                                    onGenerate={this.onGenerate}
                                    onLoad={this.onLoad}
                                    onSave={this.onSave}
                                    onSeedChange={this.props.onChangeSeed}
                                    onPasswordChange={this.onPasswordChange}
                                    password={this.state.password}
                                    action="create"
                                    descriptionValue={
                                        <FormattedMessage
                                            id="auth.remember.disclaimer"
                                            defaultMessage="Please make sure that you keep your passphrase (wallet seed) safe and remember the password. You will be asked to retype them for confirmation"
                                        />
                                    }
                                />
                            )}
                            {this.state.isConfirming && (
                                <Generator
                                    seed={this.props.seedConfirm}
                                    onLoad={this.onLoad}
                                    onSeedChange={this.onSeedConfirmationChange}
                                    onPasswordChange={this.onPasswordConfirmationChange}
                                    password={this.state.passwordConfirm}
                                    compareSeed={this.props.seed}
                                    comparePassword={this.state.password}
                                    action="create"
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