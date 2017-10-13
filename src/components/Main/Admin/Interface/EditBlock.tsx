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
import { editBlock } from 'modules/admin/actions';

import BlockEditor from './BlockEditor';

export interface IEditBlockProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    block: { id: string, name: string, conditions: string, value: string };
    editBlockStatus: { block: string, error: string };
    editBlock: typeof editBlock.started;
}

interface IEditMenuState {
    template: string;
    conditions: string;
}

class EditMenu extends React.Component<IEditBlockProps, IEditMenuState> {
    constructor(props: IEditBlockProps) {
        super(props);
        this.state = {
            template: props.block ? props.block.value : '',
            conditions: props.block ? props.block.conditions : ''
        };
    }

    componentWillReceiveProps(props: IEditBlockProps) {
        if (props.editBlockStatus && this.props.editBlockStatus !== props.editBlockStatus) {
            // TODO: Notification stub
            if (props.editBlockStatus.error) {
                alert('Error:: ' + props.editBlockStatus.error);
            }
            else {
                alert('Success:: ' + props.editBlockStatus.block);
            }
        }

        if (props.block && this.props.block !== props.block) {
            this.setState({
                template: props.block.value,
                conditions: props.block.conditions
            });
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.editBlock({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            id: this.props.block.id,
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
                        {this.props.block && this.props.block.name}
                    </li>
                </ol>
                <BlockEditor
                    pending={this.props.pending}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    block={this.props.block}
                    onSubmit={this.onSubmit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            </div>
        );
    }
}

export default EditMenu;