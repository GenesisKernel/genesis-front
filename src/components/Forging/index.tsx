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
                    <FormattedMessage id="general.forging" defaultMessage="Forging" />
                </div>
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    <Panel
                        bsStyle="default"
                        footer={(
                            <div className="clearfix">
                                <div className="pull-left">
                                    <Button bsStyle="primary" type="button">
                                        <FormattedMessage id="forging.key.change" defaultMessage="Change node key" />
                                    </Button>
                                </div>
                                <div className="pull-right">
                                    <Button bsStyle="primary" type="submit">
                                        <FormattedMessage id="general.save" defaultMessage="Save" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    >
                        <Validation.components.ValidatedFormGroup for="host">
                            <label htmlFor="host">
                                <FormattedMessage id="general.host" defaultMessage="Host" />
                                <strong className="text-danger">*</strong>
                            </label>
                            <Validation.components.ValidatedControl type="text" name="host" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="rate">
                            <label htmlFor="rate">
                                <FormattedMessage id="forging.rate" defaultMessage="Fuel exchange rate" />
                                <strong className="text-danger">*</strong>
                            </label>
                            <Validation.components.ValidatedControl type="number" name="rate" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="address">
                            <label htmlFor="address">
                                <FormattedMessage id="forging.address" defaultMessage="Wallet address you want to vote for" />
                                <strong className="text-danger">*</strong>
                            </label>
                            <Validation.components.ValidatedControl type="text" name="address" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                    </Panel>
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}