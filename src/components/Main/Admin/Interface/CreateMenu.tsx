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
import { Button, Col, Panel, Row } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { createMenu } from 'modules/admin/actions';

import Validation from 'components/Validation';

export interface ICreateMenuProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    createMenuStatus: { block: string, error: string };
    createMenu: typeof createMenu.started;
}

interface ICreateMenuState {
    template: string;
}

class CreateMenu extends React.Component<ICreateMenuProps, ICreateMenuState> {
    constructor(props: ICreateMenuProps) {
        super(props);
        this.state = {
            template: ''
        };
    }

    componentWillReceiveProps(props: ICreateMenuProps) {
        if (props.createMenuStatus) {
            // TODO: Notification stub
            if (props.createMenuStatus.error) {
                alert('Error:: ' + props.createMenuStatus.error);
            }
            else {
                alert('Success:: ' + props.createMenuStatus.block);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.createMenu({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            name: values.name,
            template: this.state.template,
            conditions: values.conditions
        });
    }

    onChange(template: string) {
        this.setState({ template });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-heading">
                    <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                </div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/admin/interface">
                            <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                        </Link>
                    </li>
                    <li>
                        <FormattedMessage id="admin.interface.menu.create" defaultMessage="Create menu" />
                    </li>
                </ol>
                <Row>
                    <Col md={12}>
                        <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                            <Panel
                                bsStyle="primary"
                                header={<FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />}
                                footer={(
                                    <div className="text-right">
                                        <Button bsStyle="primary" type="submit" disabled={this.props.pending}>
                                            <FormattedMessage id="admin.save" defaultMessage="Save" />
                                        </Button>
                                    </div>
                                )}
                            >
                                <Validation.components.ValidatedFormGroup for="name">
                                    <label htmlFor="name">
                                        <FormattedMessage id="admin.interface.menu.name" defaultMessage="Name" />
                                    </label>
                                    <Validation.components.ValidatedControl name="name" validators={[Validation.validators.required]} />
                                </Validation.components.ValidatedFormGroup>
                                <Validation.components.ValidatedFormGroup for="content">
                                    <label htmlFor="content">
                                        <FormattedMessage id="admin.interface.menu.content" defaultMessage="Content" />
                                    </label>
                                    <div className="form-control" style={{ height: 'auto', padding: 0 }}>
                                        <MonacoEditor
                                            height={400}
                                            value={this.state.template}
                                            onChange={this.onChange.bind(this)}
                                            options={{
                                                automaticLayout: true,
                                                contextmenu: false
                                            }}
                                        />
                                    </div>
                                </Validation.components.ValidatedFormGroup>
                                <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                                    <label htmlFor="conditions">
                                        <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
                                    </label>
                                    <Validation.components.ValidatedTextarea name="conditions" validators={[Validation.validators.required]} />
                                </Validation.components.ValidatedFormGroup>
                            </Panel>
                        </Validation.components.ValidatedForm>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateMenu;