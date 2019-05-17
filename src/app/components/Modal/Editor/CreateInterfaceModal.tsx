/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { Button } from 'react-bootstrap';

import Modal from '../';
import { FormattedMessage } from 'react-intl';
import Validation from 'components/Validation';

export interface ICreatePageModalProps {
    type: 'block' | 'menu';
}

class CreateInterfaceModal extends Modal<ICreatePageModalProps, { name: string, conditions: string }> {
    onSubmit = (values: { [key: string]: any }) => {
        this.props.onResult({
            name: values.name,
            conditions: values.conditions
        });
    }

    render() {
        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                <Modal.Header>
                    {'block' === this.props.params.type && (
                        <FormattedMessage id="editor.block.create" defaultMessage="Create block" />
                    )}
                    {'menu' === this.props.params.type && (
                        <FormattedMessage id="editor.menu.create" defaultMessage="Create menu" />
                    )}
                </Modal.Header>
                <Modal.Body>
                    <Validation.components.ValidatedFormGroup for="name">
                        <label htmlFor="name">
                            <FormattedMessage id="editor.page.name" defaultMessage="Name" />
                        </label>
                        <Validation.components.ValidatedControl key="name" name="name" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                        <label htmlFor="conditions">
                            <FormattedMessage id="editor.conditions.change" defaultMessage="Change conditions" />
                        </label>
                        <Validation.components.ValidatedTextarea name="conditions" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                </Modal.Body >
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Validation.components.ValidatedSubmit bsStyle="primary">
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Validation.components.ValidatedSubmit>
                </Modal.Footer>
            </Validation.components.ValidatedForm>
        );
    }
}

export default CreateInterfaceModal;