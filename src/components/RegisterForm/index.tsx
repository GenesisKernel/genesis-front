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
import { Button, Col, FormGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Validation from 'components/Validation';
import Checkbox from 'components/Checkbox';

interface IAuthFormProps {
    navigate: (url: string) => void;
}

interface IAuthFormState {
    remember: boolean;
}

export default class extends React.Component<IAuthFormProps, IAuthFormState> {
    constructor(props: IAuthFormProps) {
        super(props);
        this.state = {
            remember: false
        };
    }

    onActionChange(action: string) {
        this.props.navigate(`/auth/${action}`);
    }

    onSubmit(values: { [key: string]: any }) {
        console.log('Submit::', values);
    }

    onRememberToggle(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            remember: e.target.checked
        });
    }

    render() {
        return (
            <Validation.components.ValidatedForm className="form-horizontal component-install-form" onSubmit={this.onSubmit.bind(this)}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">NL_REGISTER</div>
                    </div>
                    <h2 className="text-center">
                        <FormattedMessage id="auth.register" defaultMessage="Register" />
                    </h2>
                    <div className="panel-body pb0">
                        <fieldset>
                            <FormGroup>
                                <Col md={3}>
                                    <label className="control-label">
                                        <FormattedMessage id="general.ecosystem" defaultMessage="Ecosystem" />
                                    </label>
                                </Col>
                                <Col md={9}>
                                    <Validation.components.ValidatedSelect name="ecosystem"></Validation.components.ValidatedSelect>
                                </Col>
                            </FormGroup>
                        </fieldset>
                        <fieldset>
                            <Validation.components.ValidatedFormGroup for="address">
                                <Col md={3}>
                                    <label className="control-label">
                                        <FormattedMessage id="general.address" defaultMessage="Address" />
                                    </label>
                                </Col>
                                <Col md={9}>
                                    <Validation.components.ValidatedControl name="address" type="text" disabled validators={[Validation.validators.required]} />
                                </Col>
                            </Validation.components.ValidatedFormGroup>
                        </fieldset>
                        {this.state.remember && (
                            <fieldset className="mb0">
                                <Validation.components.ValidatedFormGroup for="password">
                                    <Col md={3}>
                                        <label className="control-label">
                                            <FormattedMessage id="general.password" defaultMessage="Password" />
                                        </label>
                                    </Col>
                                    <Col md={9}>
                                        <Validation.components.ValidatedControl name="password" type="password" validators={[Validation.validators.required]} />
                                    </Col>
                                </Validation.components.ValidatedFormGroup>
                            </fieldset>
                        )}
                        <fieldset className="pb0 pt0 mb0 bb0">
                            <FormGroup>
                                <Col md={3}></Col>
                                <Col md={9}>
                                    <Checkbox title="NL_REMEMBER_ME" defaultChecked={this.state.remember} onChange={this.onRememberToggle.bind(this)} />
                                </Col>
                            </FormGroup>
                        </fieldset>
                    </div>
                    <div className="panel-footer">
                        <div className="clearfix">
                            <Col md={4} className="text-left">
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, 'import')}>
                                    <FormattedMessage id="auth.account.import" defaultMessage="Import" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-center">
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, '')}>
                                    <FormattedMessage id="auth.account.login" defaultMessage="Login" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-right">
                                <Button bsStyle="primary" type="submit">
                                    <FormattedMessage id="auth.create" defaultMessage="Create" />
                                </Button>
                            </Col>
                        </div>
                    </div>
                </div>
            </Validation.components.ValidatedForm>
        );
    }
}