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

import PageEditor from './PageEditor';

export interface IEditPageProps {
    page: { id: string, name: string, menu: string, conditions: string, value: string };
    menus: { id: string, name: string, conditions: string, value: string }[];
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
        if (props.page && this.props.page !== props.page) {
            this.setState({
                template: props.page.value,
                conditions: props.page.conditions,
                menu: props.menus.find(l => l.name === props.page.menu)
            });
        }
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Id: this.props.page.id,
            Value: this.state.template,
            Menu: this.state.menu.name,
            Conditions: this.state.conditions
        };
    }

    onExec(block: string, error: string) {
        // TODO: Notification stub
        if (block) {
            alert('Success:: ' + block);
        }
        else if (error) {
            alert('Error:: ' + error);
        }
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
                        <FormattedMessage id="admin.interface.pages" defaultMessage="Pages" />
                    </li>
                    <li>
                        {this.props.page && this.props.page.name}
                    </li>
                </ol>
                <PageEditor
                    contractName="EditPage"
                    mapContractParams={this.mapContractParams.bind(this)}
                    onExec={this.onExec.bind(this)}

                    template={this.state.template}
                    conditions={this.state.conditions}
                    page={this.props.page}
                    menu={this.state.menu}
                    menus={this.props.menus || []}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onMenuSelect={this.onMenuSelect.bind(this)}
                />
            </div>
        );
    }
}

export default EditPage;