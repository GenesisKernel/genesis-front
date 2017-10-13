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
import { createBlock } from 'modules/admin/actions';

import BlockEditor from './BlockEditor';

export interface ICreateBlockProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    createBlockStatus: { block: string, error: string };
    createBlock: typeof createBlock.started;
}

interface ICreateBlockState {
    template: string;
    conditions: string;
}

class CreateBlock extends React.Component<ICreateBlockProps, ICreateBlockState> {
    constructor(props: ICreateBlockProps) {
        super(props);
        this.state = {
            template: '',
            conditions: ''
        };
    }

    componentWillReceiveProps(props: ICreateBlockProps) {
        if (props.createBlockStatus && this.props.createBlockStatus !== props.createBlockStatus) {
            // TODO: Notification stub
            if (props.createBlockStatus.error) {
                alert('Error:: ' + props.createBlockStatus.error);
            }
            else {
                alert('Success:: ' + props.createBlockStatus.block);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.createBlock({
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
                        <FormattedMessage id="admin.interface.block.create" defaultMessage="Create block" />
                    </li>
                </ol>
                <BlockEditor
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

export default CreateBlock;