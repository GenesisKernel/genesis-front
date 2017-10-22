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
import { navigate } from 'modules/engine/actions';

import DocumentTitle from 'components/DocumentTitle';
import General from 'components/General';

export interface IAccountProps {
    return: string;
    navigate: typeof navigate;
}

const Account: React.SFC<IAccountProps> = (props) => (
    <DocumentTitle title="auth.account" defaultTitle="Account">
        <General return={props.return}>
            <div className="text-center">
                <div className="clearfix">
                    <Col md={6}>
                        <em className="fa fa-key fa-5x text-muted p-lg" />
                        <h4>I have a key</h4>
                        <p>If you are already familiar with Apla and have a backup of your private key - choose this option to guide you through the process of restoring of your account data</p>

                    </Col>
                    <Col md={6}>
                        <em className="fa fa-lock fa-5x text-muted p-lg" />
                        <h4>I don't have a key</h4>
                        <p>If you are new to the system or just want to create a new account - proceed with this option to generate new private key and protect it with your password</p>

                    </Col>
                </div>
                <Col md={6}>
                    <hr />
                    <Button bsStyle="primary" className="btn-block" onClick={props.navigate.bind(null, '/account/import')}>Import existing key</Button>
                </Col>
                <Col md={6}>
                    <hr />
                    <Button bsStyle="primary" className="btn-block" onClick={props.navigate.bind(null, '/account/create')}>Generate new key</Button>
                </Col>
            </div>
        </General>
    </DocumentTitle>
);

export default Account;