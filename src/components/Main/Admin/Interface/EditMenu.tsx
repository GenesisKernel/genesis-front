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
import { editMenu } from 'modules/admin/actions';

import MenuEditor from './MenuEditor';

export interface IEditMenuProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    menu: { id: string, name: string, conditions: string, value: string };
    editMenuStatus: { block: string, error: string };
    editMenu: typeof editMenu.started;
}

interface IEditMenuState {
    template: string;
    conditions: string;
}

class EditMenu extends React.Component<IEditMenuProps, IEditMenuState> {
    constructor(props: IEditMenuProps) {
        super(props);
        this.state = {
            template: props.menu ? props.menu.value : '',
            conditions: props.menu ? props.menu.conditions : ''
        };
    }

    componentWillReceiveProps(props: IEditMenuProps) {
        if (props.editMenuStatus && this.props.editMenuStatus !== props.editMenuStatus) {
            // TODO: Notification stub
            if (props.editMenuStatus.error) {
                alert('Error:: ' + props.editMenuStatus.error);
            }
            else {
                alert('Success:: ' + props.editMenuStatus.block);
            }
        }

        if (props.menu && this.props.menu !== props.menu) {
            this.setState({
                template: props.menu.value,
                conditions: props.menu.conditions
            });
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.editMenu({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            id: this.props.menu.id,
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
                        {this.props.menu && this.props.menu.name}
                    </li>
                </ol>
                <MenuEditor
                    pending={this.props.pending}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    menu={this.props.menu}
                    onSubmit={this.onSubmit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            </div>
        );
    }
}

export default EditMenu;