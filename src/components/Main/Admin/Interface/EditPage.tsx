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
import { editPage } from 'modules/admin/actions';

import PageEditor from './PageEditor';

export interface IEditPageProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    page: { id: string, name: string, menu: string, conditions: string, value: string };
    menus: { id: string, name: string, conditions: string, value: string }[];
    editPageStatus: { block: string, error: string };
    editPage: typeof editPage.started;
}

interface IEditPageState {
    template?: string;
    conditions?: string;
    menu?: { id: string, name: string, conditions: string, value: string };
}

class EditPage extends React.Component<IEditPageProps, IEditPageState> {
    constructor(props: IEditPageProps) {
        super(props);
        this.state = {
            template: props.page ? props.page.value : '',
            conditions: props.page ? props.page.conditions : '',
            menu: null
        };
    }

    componentWillReceiveProps(props: IEditPageProps) {
        if (props.editPageStatus && this.props.editPageStatus !== props.editPageStatus) {
            // TODO: Notification stub
            if (props.editPageStatus.error) {
                alert('Error:: ' + props.editPageStatus.error);
            }
            else {
                alert('Success:: ' + props.editPageStatus.block);
            }
        }

        if (props.page && this.props.page !== props.page) {
            this.setState({
                template: props.page.value,
                conditions: props.page.conditions,
                menu: props.menus.find(l => l.name === props.page.menu)
            });
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.editPage({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            id: this.props.page.id,
            template: this.state.template,
            menu: this.state.menu.name,
            conditions: this.state.conditions
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

    onMenuSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const menu = this.props.menus && this.props.menus.find(l => l.name === e.target.value);
        this.setState({
            menu
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
                        {this.props.page && this.props.page.name}
                    </li>
                </ol>
                <PageEditor
                    pending={this.props.pending}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    page={this.props.page}
                    menu={this.state.menu}
                    menus={this.props.menus || []}
                    onSubmit={this.onSubmit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onMenuSelect={this.onMenuSelect.bind(this)}
                />
            </div>
        );
    }
}

export default EditPage;