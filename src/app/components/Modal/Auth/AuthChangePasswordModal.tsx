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

import * as React from 'react';
import { Button } from 'react-bootstrap';

import Modal from '../';
import { FormattedMessage } from 'react-intl';
import Validation from 'components/Validation';

export interface IAuthChangePasswordModalProps {

}

class AuthChangePasswordModal extends Modal<IAuthChangePasswordModalProps, { }> {
    onSubmit = (values: { [key: string]: any }) => {
        // this.props.onResult({
        //     name: values.name,
        //     conditions: values.conditions
        // });
    }

    render() {
        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                <Modal.Header>
                    <FormattedMessage id="auth.password.change" defaultMessage="Change password" />
                </Modal.Header>
                <Modal.Body>
                    <Validation.components.ValidatedFormGroup for="password_old">
                        <label htmlFor="password_old">
                            <FormattedMessage id="auth.password.old" defaultMessage="Old password" />
                        </label>
                        <Validation.components.ValidatedControl key="password_old" name="password_old" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="password_new">
                        <label htmlFor="password_new">
                            <FormattedMessage id="auth.password.new" defaultMessage="New password" />
                        </label>
                        <Validation.components.ValidatedControl key="password_new" name="password_new" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="password_new_repeat">
                        <label htmlFor="password_new_repeat">
                            <FormattedMessage id="auth.password.new_repeat" defaultMessage="Repeat password" />
                        </label>
                        <Validation.components.ValidatedControl key="password_new_repeat" name="password_new_repeat" validators={[Validation.validators.required]} />
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

export default AuthChangePasswordModal;