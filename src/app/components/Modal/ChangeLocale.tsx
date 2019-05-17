/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import locales from 'lib/locales';

import Modal from './';

export interface IChangeLocaleModalProps {
    value: string;
}

class ChangeLocaleModal extends Modal<IChangeLocaleModalProps, void> {
    changeLocale = (locale: string) => {
        this.props.changeLocale(locale);
        this.props.onCancel();
    }

    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="modal.locale.title" defaultMessage="Switch language" />
                </Modal.Header>
                <Modal.Body>
                    {locales.map(l => (
                        <Button key={l.name} block disabled={l.name === this.props.params.value} type="button" bsStyle="default" onClick={() => this.changeLocale(l.name)}>
                            <span>{l.title}</span>
                        </Button>
                    ))}
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
export default ChangeLocaleModal;