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
import { Button, Col } from 'react-bootstrap';
import api from 'lib/api';
import { txCall } from 'modules/tx/actions';
import styled from 'styled-components';
import { history } from 'store';

import Heading from 'components/Heading';
import Editor from 'components/Editor';
import DocumentTitle from 'components/DocumentTitle';
import Protypo from 'containers/Widgets/Protypo';
import TxButton from 'containers/Widgets/TxButton';

// tslint:disable:no-console

export interface IDebugProps {
    session: string;
    callContract: typeof txCall;
}

interface IDebugState {
    code?: string;
    result?: any;
    style?: any;
}

export default class extends React.Component<IDebugProps, IDebugState> {
    constructor(props: any) {
        super(props);
        this.state = {
            code: [
                'Div(Class: panel panel-primary, Body:',
                '   Div(panel-heading, Heading)',
                '   Div(panel-body){',
                '   Div(text-muted, Subtitle)',
                '   Label(Class: control-label, Body:',
                '       Label contents',
                '   )',
                '   Input(Name: testInput, Class: form-control, Placeholder: testPlaceholder, Type: text, Value: testValue, Validate: testValidation)',
                '   Em(Class: fa fa-envelope text-primary)',
                '   P(Class: text-primary, Body:',
                '       Paragraph contents',
                '   )',
                '   Div(Body:',
                '      Span(Class: text-danger, Body:',
                '         Multiple',
                '      )',
                '      Span(Class: text-success, Body:',
                '         Span',
                '      )',
                '      Span(Class: text-warning, Body:',
                '         Elements',
                '      )',
                '   )',
                '   Div(Body:',
                '      Strong(Body:',
                '         This text looks strong',
                '      )',
                '   )',
                '   Button(Body: Click me!, Class: btn btn-primary, Alert: Alert!)',
                '})'
            ].join('\n')
        };
    }

    onSubmit(values: { [key: string]: string }) {
        api.contentTest(this.props.session, this.state.code).then(r => {
            this.setState({
                result: r.tree
            });
        });
    }

    onHistory() {
        api.history(this.props.session, 'pages', '1')
            .then(result => {
                console.log(result);
            });
    }

    onChange(code: string) {
        this.setState({ code });
    }

    setStyle(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const style = styled.div`${e.target.value}`;
        this.setState({
            style
        });
    }

    onPush() {
        history.push('/page/first', { hello: 1337 });
    }

    render() {
        return (
            <DocumentTitle title="Debug page">
                <div>
                    <Heading>Debug page</Heading>
                    <div className="content-wrapper">
                        <Col md={6}>
                            <Editor
                                language="protypo"
                                value={this.state.code}
                                height={500}
                                onChange={this.onChange.bind(this)}
                            />
                            <textarea onChange={this.setStyle.bind(this)} />
                        </Col>
                        <Col md={6}>
                            {this.state.result && (
                                <Protypo
                                    context="page"
                                    content={this.state.result}
                                />
                            )}
                            <div>
                                {this.state.style && (
                                    React.createElement(this.state.style, {}, <div>This is content</div>)
                                )}
                            </div>
                        </Col>
                        <hr />
                        <hr />
                        <Button bsStyle="primary" className="btn-block" onClick={this.onSubmit.bind(this)}>Request template</Button>
                        <Button bsStyle="primary" className="btn-block" onClick={this.onPush.bind(this)}>Push</Button>
                        <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT">Execute contract</TxButton>
                        <TxButton
                            className="btn btn-info btn-block"
                            contractName="TEST_CONTRACT"
                            confirm={{ icon: 'info', title: 'CONFIRM_TITLE', text: 'CONFIRM_TEXT', confirmButton: 'CONFIRM_BUTTON', cancelButton: 'CANCEL_BUTTON' }}
                            page="page_default"
                        >
                            Confirm button
                        </TxButton>
                        <TxButton
                            className="btn btn-info btn-block"
                            page="page_default"
                        >
                            Confirm button
                        </TxButton>
                        <Button className="btn btn-info btn-block" onClick={this.onHistory.bind(this)}>History</Button>
                        <TxButton className="btn btn-danger btn-block" contractName="NewEcosystem">CreateEcosystem</TxButton>
                        <div className="row">
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="MainCondition">Contract 1</TxButton>
                            </div>
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT2">Contract 2</TxButton>
                            </div>
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT">Contract 3</TxButton>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="MainCondition">Contract 1</TxButton>
                            </div>
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT2">Contract 2</TxButton>
                            </div>
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT">Contract 3</TxButton>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="MainCondition">Contract 1</TxButton>
                            </div>
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT2">Contract 2</TxButton>
                            </div>
                            <div className="col-md-4">
                                <TxButton className="btn btn-danger btn-block" contractName="TEST_CONTRACT">Contract 3</TxButton>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}