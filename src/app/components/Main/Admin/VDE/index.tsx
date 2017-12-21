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
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Button, Row, Col } from 'react-bootstrap';

import Heading from 'components/Heading';
import DocumentTitle from 'components/DocumentTitle';

export interface IVDEProps {
    pending: boolean;
    result: boolean;
    createVDE: () => void;
    alert: (type: string, title: string, text: string, buttonText: string) => void;
}

class VDE extends React.Component<IVDEProps & InjectedIntlProps> {
    componentWillReceiveProps(props: IVDEProps) {
        if (this.props.pending && !props.pending && true === props.result) {
            this.props.alert(
                'success',
                this.props.intl.formatMessage({ id: 'general.success', defaultMessage: 'Success' }),
                this.props.intl.formatMessage({ id: 'admin.vde.create.success', defaultMessage: 'Virtual dedicated ecosystem has been successfuly created' }),
                this.props.intl.formatMessage({ id: 'general.close', defaultMessage: 'Close' }),
            );
        }
        else if (this.props.pending && !props.pending && false === props.result) {
            this.props.alert(
                'error',
                this.props.intl.formatMessage({ id: 'general.error', defaultMessage: 'Error' }),
                this.props.intl.formatMessage({ id: 'admin.vde.create.failure', defaultMessage: 'Error creating VDE' }),
                this.props.intl.formatMessage({ id: 'general.close', defaultMessage: 'Close' }),
            );
        }
    }

    render() {
        return (
            <DocumentTitle title="admin.vde" defaultTitle="Virtual Dedicated Ecosystem">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.vde" defaultMessage="Virtual Dedicated Ecosystem" />
                    </Heading>
                    <div className="content-wrapper">
                        <Row>
                            <Col md={12}>
                                <div className="well">
                                    <h4>
                                        <FormattedMessage id="admin.vde" defaultMessage="Virtual Dedicated Ecosystem" />
                                    </h4>
                                    <p>
                                        <FormattedMessage id="admin.vde.description" defaultMessage="You can create a Virtual Dedicated Ecosystem (VDE) to work with contracts/interfaces that will not be served through the blockchain. VDE can only be created once per normal ecosystem and cannot be deleted" />
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <hr className="mt0" />
                        <Row>
                            <Col md={12}>
                                <Button block bsStyle="primary" disabled={this.props.pending} onClick={this.props.createVDE.bind(this)}>
                                    <FormattedMessage id="admin.vde.create" defaultMessage="Create" />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default injectIntl(VDE);