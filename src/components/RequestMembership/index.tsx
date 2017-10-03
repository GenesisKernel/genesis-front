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
import { Button, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Validation from 'components/Validation';

export default class extends React.Component {
    onSubmit(values: { [key: string]: string }) {
        alert('DND');
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-heading">
                    <FormattedMessage id="ecosystem.membership.request" defaultMessage="Request membership" />
                </div>
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    <Panel
                        bsStyle="default"
                        footer={(
                            <div className="clearfix">
                                <div className="pull-right">
                                    <Button bsStyle="primary" type="submit">
                                        <FormattedMessage id="general.request" defaultMessage="Request" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    >
                        <Validation.components.ValidatedFormGroup for="ecosystem">
                            <label htmlFor="ecosystem">
                                <FormattedMessage id="ecosystem" defaultMessage="Ecosystem" />
                            </label>
                            <Validation.components.ValidatedSelect name="ecosystem" validators={[Validation.validators.required]}>
                                <option>ECOSYSTEM_STUB</option>
                            </Validation.components.ValidatedSelect>
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="price">
                            <label htmlFor="price">
                                <FormattedMessage id="general.price" defaultMessage="Price" />
                            </label>
                            <Validation.components.ValidatedControl type="text" name="currency" readOnly defaultValue="1000 APL(STUB)" />
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="fullName">
                            <label htmlFor="fullName">
                                <FormattedMessage id="general.name.full" defaultMessage="Full name" />
                            </label>
                            <Validation.components.ValidatedControl type="text" name="fullName" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                    </Panel>
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}