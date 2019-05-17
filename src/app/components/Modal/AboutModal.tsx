/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { Button } from 'react-bootstrap';
import imgLogo from 'images/logoInverse.svg';

import Modal from './';
import { FormattedMessage } from 'react-intl';

const MAIN_WEBSITE = 'https://apla.io';

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