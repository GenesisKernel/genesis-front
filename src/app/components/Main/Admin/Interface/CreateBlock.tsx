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
import BlockEditor from './BlockEditor';

export interface ICreateBlockProps {
    vde?: boolean;
    navigate: (url: string) => void;
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

    mapContractParams(values: { [key: string]: any }) {
        return {
            Name: values.name,
            Value: this.state.template,
            Conditions: this.state.conditions
        };
    }

    onExec(block: string, error: string) {
        if (block) {
            this.props.vde ?
                this.props.navigate('/vde/interface') :
                this.props.navigate('/admin/interface');
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

    render() {
        return (
            <DocumentTitle title="admin.interface.block.create" defaultTitle="Create block">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <PageLink page="interface" section="admin" vde={this.props.vde}>
                                    <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                                </PageLink>
                            </li>
                            <li>
                                <FormattedMessage id="admin.interface.block.create" defaultMessage="Create block" />
                            </li>
                        </ol>
                        <BlockEditor
                            contractName="@1NewBlock"
                            mapContractParams={this.mapContractParams.bind(this)}

                            vde={this.props.vde}
                            template={this.state.template}
                            conditions={this.state.conditions}
                            onSourceEdit={this.onSourceEdit.bind(this)}
                            onConditionsEdit={this.onConditionsEdit.bind(this)}
                            onExec={this.onExec.bind(this)}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default CreateBlock;