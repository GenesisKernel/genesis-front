// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { MAIN_WEBSITE, VERSION } from 'lib/consts';
import imgLogo from 'images/logoInverse.svg';

import Modal, { IModalProps } from './';

export interface IAboutModalProps extends IModalProps {
    onOpenWebsite: () => void;
}

const AboutModal: React.SFC<IAboutModalProps> = props => (
    <div>
        <Modal.Header>
            <FormattedMessage id="general.about" defaultMessage="About" />
        </Modal.Header>
        <Modal.Body>
            <div className="text-center" style={{ padding: '10px 50px' }}>
                <img src={imgLogo} style={{ height: 50 }} />
                <div className="text-muted">
                    {VERSION}
                </div>
                <Button bsStyle="link" onClick={props.onOpenWebsite}>
                    {MAIN_WEBSITE}
                </Button>
            </div>
        </Modal.Body>
        <Modal.Footer className="text-right">
            <Button type="button" bsStyle="primary" onClick={props.onClose}>
                <FormattedMessage id="close" defaultMessage="Close" />
            </Button>
        </Modal.Footer>
    </div>
);

export default AboutModal;