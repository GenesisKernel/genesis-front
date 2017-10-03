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
                    <FormattedMessage id="ecosystem.create" defaultMessage="Create ecosystem" />
                </div>
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    <Panel
                        bsStyle="default"
                        footer={(
                            <div className="clearfix">
                                <div className="pull-right">
                                    <Button bsStyle="primary" type="submit">
                                        <FormattedMessage id="general.next" defaultMessage="Next" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    >
                        <Validation.components.ValidatedFormGroup for="title">
                            <label htmlFor="title">
                                <FormattedMessage id="ecosystem.title" defaultMessage="Ecosystem name" />
                                <strong className="text-danger">*</strong>
                            </label>
                            <Validation.components.ValidatedControl type="text" name="title" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                    </Panel>
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}