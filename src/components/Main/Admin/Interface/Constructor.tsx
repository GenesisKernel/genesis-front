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
import api from 'lib/api';

import Heading from 'containers/Widgets/Heading';
import DocumentTitle from 'components/DocumentTitle';
import ConstructorEditor from './ConstructorEditor';

export interface IConstructorProps {
    page: { id: string, name: string, value: string };
    // template: string;
    treeCode?: any;
    session: string;
}

interface IConstructorState {
    treeCode?: any;
    template?: string;
}

class Constructor extends React.Component<IConstructorProps, IConstructorState> {
    constructor(props: IConstructorProps) {
        super(props);
        this.state = {
            template: props.page ? props.page.value : ''
        };
    }

    componentWillReceiveProps(props: IConstructorProps) {
        if (props.page && this.props.page !== props.page) {
            this.setState({
                template: props.page.value
            });
            api.contentTest(this.props.session, props.page.value).then(r => {
                this.setState({
                    treeCode: JSON.parse(r.tree)
                });
            });
        }
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Id: this.props.page.id,
            Value: this.state.template
        };
    }

    onSourceEdit(template: string) {
        this.setState({ template });
    }

    render() {
        return (
            <DocumentTitle title={this.props.page && this.props.page.name}>
                <div>
                    <Heading>
                        <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                        <div className="pull-right">
                            <Link to={`/page/${this.props.page && this.props.page.name}`} className="ml btn-tool">
                                <em className="icon icon-eye" />
                                <span>
                                    <FormattedMessage id="admin.interface.page.show" defaultMessage="Show page" />
                                </span>
                            </Link>
                        </div>
                    </Heading>
                    <div className="content-wrapper">
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
                                Constructor
                        </li>
                            <li>
                                {this.props.page && this.props.page.name}
                            </li>
                        </ol>
                        <ConstructorEditor
                            session={this.props.session}
                            page={this.props.page}
                            template={this.state.template}
                            treeCode={this.state.treeCode}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Constructor;