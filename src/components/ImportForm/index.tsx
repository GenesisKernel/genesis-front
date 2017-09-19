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
import { Button, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Validation from 'components/Validation';

interface IImportFormProps {
    navigate: (url: string) => void;
}

export default class extends React.Component<IImportFormProps> {
    constructor(props: IImportFormProps) {
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
                        <div className="panel-title">NL_IMPORT</div>
                    </div>
                    <h2 className="text-center">
                        <FormattedMessage id="auth.import" defaultMessage="Import" />
                    </h2>
                    <div className="panel-body pb0">
                    </div>
                    <div className="panel-footer">
                        <div className="clearfix">
                            <Col md={4} className="text-left">
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, '')}>
                                    <FormattedMessage id="auth.account.login" defaultMessage="Login" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-center">
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, 'create')}>
                                    <FormattedMessage id="auth.account.create" defaultMessage="Create account" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-right">
                                <Button bsStyle="primary" type="submit">
                                    <FormattedMessage id="auth.import" defaultMessage="Import account" />
                                </Button>
                            </Col>
                        </div>
                    </div>
                </div>
            </Validation.components.ValidatedForm>
        );
    }
}