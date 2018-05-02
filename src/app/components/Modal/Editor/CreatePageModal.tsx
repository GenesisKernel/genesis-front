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

import Modal from '../';
import { FormattedMessage } from 'react-intl';
import Validation from 'components/Validation';

export interface ICreatePageModalProps {
    menus: string[];
}

class CreatePageModal extends Modal<ICreatePageModalProps, { name: string, menu: string, conditions: string }> {
    onSubmit = (values: { [key: string]: any }) => {
        this.props.onResult({
            name: values.name,
            menu: values.menu,
            conditions: values.conditions
        });
    }

    render() {
        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                <Modal.Header>
                    <FormattedMessage id="editor.page.create" defaultMessage="Create page" />
                </Modal.Header>
                <Modal.Body>
                    <Validation.components.ValidatedFormGroup for="name">
                        <label htmlFor="name">
                            <FormattedMessage id="admin.interface.page.name" defaultMessage="Name" />
                        </label>
                        <Validation.components.ValidatedControl key="name" name="name" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="menu">
                        <label htmlFor="menu">
                            <FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />
                        </label>
                        <Validation.components.ValidatedSelect name="menu" defaultValue={this.props.params.menus[0]} validators={[Validation.validators.required]}>
                            {this.props.params.menus.map(menu => (
                                <option key={menu} value={menu}>{menu}</option>
                            ))}
                        </Validation.components.ValidatedSelect>
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                        <label htmlFor="conditions">
                            <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
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

export default CreatePageModal;