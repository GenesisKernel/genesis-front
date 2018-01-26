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
import { navigate } from 'modules/engine/actions';
import platform from 'lib/platform';

import DocumentTitle from 'components/DocumentTitle';
import General from 'components/General';

export interface IAccountProps {
    return: string;
    navigate: typeof navigate;
}

const colProps = platform.select<{ sm?: number, xs?: number }>({
    web: { sm: 6 },
    desktop: { xs: 6 }
});

const Account: React.SFC<IAccountProps> = (props) => (
    <DocumentTitle title="auth.account" defaultTitle="Account">
        <General return={props.return}>
            <div className="text-center desktop-flex-col desktop-flex-stretch">
                <div className="clearfix">
                    <Col {...colProps}>
                        <em className="fa fa-key fa-5x text-muted p-lg" />
                        <h4>I have a key</h4>
                        <p>If you are already familiar with Genesis and have a backup of your private key - choose this option to guide you through the process of restoring of your account data</p>

                    </Col>
                    <Col {...colProps}>
                        <em className="fa fa-lock fa-5x text-muted p-lg" />
                        <h4>I don't have a key</h4>
                        <p>If you are new to the system or just want to create a new account - proceed with this option to generate new private key and protect it with your password</p>

                    </Col>
                </div>
                <div>
                    <Col {...colProps}>
                        <hr />
                        <Button bsStyle="primary" className="btn-block" onClick={props.navigate.bind(null, '/account/import')}>Import existing key</Button>
                    </Col>
                    <Col {...colProps}>
                        <hr />
                        <Button bsStyle="primary" className="btn-block" onClick={props.navigate.bind(null, '/account/create')}>Generate new key</Button>
                    </Col>
                </div>
            </div>
        </General>
    </DocumentTitle>
);

export default Account;