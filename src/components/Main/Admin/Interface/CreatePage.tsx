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
import { createPage } from 'modules/admin/actions';

import PageEditor from './PageEditor';

export interface ICreatePageProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    menus: { id: string, name: string, conditions: string, value: string }[];
    createPageStatus: { block: string, error: string };
    createPage: typeof createPage.started;
}

interface ICreatePageState {
    template?: string;
    menu?: { id: string, name: string, conditions: string, value: string };
}

class CreatePage extends React.Component<ICreatePageProps, ICreatePageState> {
    constructor(props: ICreatePageProps) {
        super(props);
        this.state = {
            template: '',
            menu: null
        };
    }

    componentWillReceiveProps(props: ICreatePageProps) {
        if (props.createPageStatus && this.props.createPageStatus !== props.createPageStatus) {
            // TODO: Notification stub
            if (props.createPageStatus.error) {
                alert('Error:: ' + props.createPageStatus.error);
            }
            else {
                alert('Success:: ' + props.createPageStatus.block);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.createPage({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            name: values.name,
            template: this.state.template,
            menu: values.menu,
            conditions: values.conditions
        });
    }

    onSourceEdit(template: string) {
        this.setState({ template });
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
                        <FormattedMessage id="admin.interface.page.create" defaultMessage="Create page" />
                    </li>
                </ol>
                <PageEditor
                    pending={this.props.pending}
                    template={this.state.template}
                    menu={this.state.menu}
                    menus={this.props.menus || []}
                    onSubmit={this.onSubmit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onMenuSelect={this.onMenuSelect.bind(this)}
                />
            </div>
        );
    }
}

export default CreatePage;