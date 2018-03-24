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
import { Button } from 'react-bootstrap';
import imgLogo from 'images/logoInverse.svg';

import Modal from './';
import { FormattedMessage } from 'react-intl';

const MAIN_WEBSITE = 'http://genesis.space';

class AboutModal extends Modal<void, void> {
    openWebsite() {
        const electron = require('electron');
        electron.shell.openExternal(MAIN_WEBSITE);
    }

    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="general.about" defaultMessage="About" />
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center" style={{ padding: '10px 50px' }}>
                        <img src={imgLogo} style={{ height: 50 }} />
                        <div className="text-muted">
                            {process.env.REACT_APP_VERSION ? `v${process.env.REACT_APP_VERSION}` : 'DEVELOPER BUILD'}
                        </div>
                        <Button bsStyle="link" onClick={this.openWebsite}>
                            {MAIN_WEBSITE}
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="primary" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default AboutModal;