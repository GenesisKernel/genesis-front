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
import { FormattedMessage } from 'react-intl';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import PageLink from 'containers/Routing/PageLink';
import PageEditor from './PageEditor';
import PageOnlyEditor from './PageOnlyEditor';
import PageEditorSaveButton from './PageEditorSaveButton';

export interface IEditPageProps {
    vde?: boolean;
    tabView?: boolean;
    saveButton?: boolean;
    page: { id: string, name: string, menu: string, conditions: string, value: string };
    menus: { id: string, name: string, conditions: string, value: string }[];
    navigatePage: (params: { name?: string, params?: any, vde?: boolean }) => void;
    pageTemplate?: string;
    onExec?: (block: string, error?: { type: string, error: string }) => void;
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

        if (props.pageTemplate && this.props.pageTemplate !== props.pageTemplate) {
            this.setState({
                template: props.pageTemplate
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
        if (this.props.saveButton) {
            return (
                <PageEditorSaveButton
                    contractName="@1EditPage"
                    mapContractParams={this.mapContractParams.bind(this)}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    page={this.props.page}
                    menu={this.state.menu}
                    menus={this.props.menus || []}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onMenuSelect={this.onMenuSelect.bind(this)}
                    onExec={this.props.onExec && this.props.onExec}
                />
            );
        }
        if (this.props.tabView) {
            return (
                <PageOnlyEditor
                    contractName="@1EditPage"
                    mapContractParams={this.mapContractParams.bind(this)}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    page={this.props.page}
                    menu={this.state.menu}
                    menus={this.props.menus || []}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onMenuSelect={this.onMenuSelect.bind(this)}
                    onExec={this.props.onExec && this.props.onExec}
                />
            );
        }
        return (
            <DocumentTitle title={this.props.page && this.props.page.name}>
                <div>
                    <Heading>
                        <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                        <div className="pull-right">
                            <PageLink page={this.props.page && this.props.page.name} section={this.props.vde ? 'vde' : 'home'} vde={this.props.vde} className="ml btn-tool">
                                <em className="icon icon-eye" />
                                <span>
                                    <FormattedMessage id="admin.interface.page.preview" defaultMessage="Preview page" />
                                </span>
                            </PageLink>
                        </div>
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <PageLink page="interface" vde={this.props.vde}>
                                    <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                                </PageLink>
                            </li>
                            <li>
                                <FormattedMessage id="admin.interface.pages" defaultMessage="Pages" />
                            </li>
                            <li>
                                {this.props.page && this.props.page.name}
                            </li>
                        </ol>
                        <PageEditor
                            vde={this.props.vde}
                            contractName={this.props.vde ? 'EditPage' : '@1EditPage'}
                            mapContractParams={this.mapContractParams.bind(this)}
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
                </div>
            </DocumentTitle>
        );
    }
}

export default EditPage;