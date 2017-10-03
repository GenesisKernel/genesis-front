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
                    <FormattedMessage id="money.transfer" defaultMessage="Money transfer" />
                </div>
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    <Panel
                        bsStyle="default"
                        footer={(
                            <div className="clearfix">
                                <div className="pull-right buttons">
                                    <Button type="submit" bsStyle="primary">
                                        <FormattedMessage id="general.send" defaultMessage="Send" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    >
                        <Validation.components.ValidatedFormGroup for="address">
                            <label htmlFor="address" className="control-label">
                                <FormattedMessage id="wallet.address" defaultMessage="Wallet address" />
                                <strong className="text-danger">*</strong>
                            </label>
                            <Validation.components.ValidatedControl type="text" name="address" autoComplete="off" validators={[Validation.validators.required]} />
                            {/*
                                TODO: [Validation] Please enter a valid wallet addres
                            */}
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="amount">
                            <label htmlFor="amount" className="control-label">
                                <FormattedMessage id="general.amount" defaultMessage="Amount" />
                                <strong className="text-danger">*</strong>
                            </label>
                            <Validation.components.ValidatedControl type="number" name="amount" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="comment">
                            <label htmlFor="comment" className="control-label">
                                <FormattedMessage id="general.comment" defaultMessage="Comment" />
                            </label>
                            <Validation.components.ValidatedControl type="text" name="comment" />
                        </Validation.components.ValidatedFormGroup>
                        {/*<Validation.components.ValidatedFormGroup for="comission">
                            <label htmlFor="comission" className="control-label">
                                <FormattedMessage id="general.comission" defaultMessage="Comission" />
                            </label>
                            <Validation.components.ValidatedControl type="text" name="comission" readOnly={true} />
                        </Validation.components.ValidatedFormGroup>*/}
                    </Panel>
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}