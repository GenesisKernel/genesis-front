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
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import DropdownToolButton from './Toolbar/DropdownToolButton';
import Validation from '../Validation';
import Button from 'components/Button';

export interface ITxMenuProps {
    maxSum: number;
    onEdit: (value: number) => any;
}

interface ITxMenuContext {
    closeDropdown: () => void;
}

const TxMenu: React.SFC<ITxMenuProps> = (props, context: ITxMenuContext) => (
    <DropdownToolButton
        icon="icon-lock"
        right
        width={250}
        content={(
            <div style={{ overflow: 'hidden' }}>
                <div className="dropdown-heading">
                    <div>
                        <FormattedMessage id="tx.spending.limit.long" defaultMessage="Transaction spending limit" />
                    </div>
                </div>
                <div className="dropdown-info">
                    <div>
                        <FormattedMessage id="tx.spending.limit.desc" defaultMessage="Transactions executed on your behalf will not be able to spend more tokens than you specify here" />
                    </div>
                </div>
                <div style={{ padding: 8 }}>
                    <Validation.components.ValidatedForm onSubmitSuccess={payload => props.onEdit(Number(payload.maxSum))}>
                        <Validation.components.ValidatedFormGroup for="maxSum">
                            <Validation.components.ValidatedControl
                                className="form-control"
                                name="maxSum"
                                type="number"
                                defaultValue={String(props.maxSum)}
                                validators={[Validation.validators.min(1)]}
                            />
                        </Validation.components.ValidatedFormGroup>
                        <Row>
                            <Col xs={6} style={{ paddingRight: 5 }}>
                                <Button onClick={() => props.onEdit(null)} className="btn btn-block btn-default">
                                    <FormattedMessage id="clear" defaultMessage="Clear" />
                                </Button>
                            </Col>
                            <Col xs={6} style={{ paddingLeft: 5 }}>
                                <Validation.components.ValidatedSubmit style={{ marginTop: 8 }} block bsStyle="primary">
                                    <FormattedMessage id="confirm" defaultMessage="Confirm" />
                                </Validation.components.ValidatedSubmit>
                            </Col>
                        </Row>
                    </Validation.components.ValidatedForm>
                </div>
            </div>
        )}
    >
        <span className="icon text-bold mr">
            <FormattedMessage id="tx.spending.limit.short" defaultMessage="Limit" />:
        </span>
        <span>
            {props.maxSum ?
                (
                    <span>{props.maxSum}</span>
                ) :
                (
                    <span>
                        <FormattedMessage id="disabled" defaultMessage="Disabled" />
                    </span>
                )
            }
        </span>
    </DropdownToolButton>
);

export default TxMenu;