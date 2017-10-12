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
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { createMenu } from 'modules/admin/actions';

import MenuEditor from './MenuEditor';

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
    conditions: string;
}

class CreateMenu extends React.Component<ICreateMenuProps, ICreateMenuState> {
    constructor(props: ICreateMenuProps) {
        super(props);
        this.state = {
            template: '',
            conditions: ''
        };
    }

    componentWillReceiveProps(props: ICreateMenuProps) {
        if (props.createMenuStatus && this.props.createMenuStatus !== props.createMenuStatus) {
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

    onSourceEdit(template: string) {
        this.setState({ template });
    }

    onConditionsEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            conditions: e.target.value
        });
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
                <MenuEditor
                    pending={this.props.pending}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    onSubmit={this.onSubmit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            </div>
        );
    }
}

export default CreateMenu;