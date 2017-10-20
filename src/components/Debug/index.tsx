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
import { Button, Col } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import api from 'lib/api';
import { contractExec } from 'modules/tx/actions';

import Protypo from 'components/Protypo';
import TxButton from 'containers/Widgets/TxButton';

export interface IDebugProps {
    session: string;
    contractExec: typeof contractExec.started;
}

interface IDebugState {
    code?: string;
    result?: any;
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
                result: JSON.parse(r.tree)
            });
        });
    }

    onChange(code: string) {
        this.setState({ code });
    }

    onExecContract(block: string, error: string) {
        if (error) {
            alert('Error::' + error);
        }
        else {
            alert('Block:: ' + block);
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-heading">Debug page</div>
                <Col md={6}>
                    <MonacoEditor
                        value={this.state.code}
                        height={500}
                        onChange={this.onChange.bind(this)}
                    />
                </Col>
                <Col md={6}>
                    {this.state.result && (
                        <Protypo
                            payload={this.state.result}
                            menuPush={(() => null as any) as any}
                        />
                    )}
                </Col>
                <hr />
                <Button bsStyle="primary" className="btn-block" onClick={this.onSubmit.bind(this)}>Request template</Button>
                <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT" onExec={this.onExecContract.bind(this)}>Execute contract</TxButton>
                <TxButton bsStyle="danger" className="btn-block" contractName="NewEcosystem" onExec={this.onExecContract.bind(this)}>CreateEcosystem</TxButton>
                <div className="row">
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT">Contract 1</TxButton>
                    </div>
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT2">Contract 2</TxButton>
                    </div>
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT">Contract 3</TxButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT">Contract 1</TxButton>
                    </div>
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT2">Contract 2</TxButton>
                    </div>
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT">Contract 3</TxButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT">Contract 1</TxButton>
                    </div>
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT2">Contract 2</TxButton>
                    </div>
                    <div className="col-md-4">
                        <TxButton bsStyle="danger" className="btn-block" contractName="TEST_CONTRACT">Contract 3</TxButton>
                    </div>
                </div>
            </div>
        );
    }
}