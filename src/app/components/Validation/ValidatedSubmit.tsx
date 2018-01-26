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
import { Button, ButtonProps } from 'react-bootstrap';
import * as propTypes from 'prop-types';

import ValidatedForm from './ValidatedForm';

interface IValidatedSubmitProps extends ButtonProps {
    className?: string;
    disabled?: boolean;
}

const ValidatedSubmit: React.SFC<IValidatedSubmitProps> = (props, context: { form: ValidatedForm }) => (
    <Button
        type="submit"
        onClick={props.onClick && props.onClick}
        className={props.className}
        bsClass={props.bsClass}
        active={props.active}
        block={props.block}
        bsStyle={props.bsStyle}
        bsSize={props.bsSize}
        componentClass={props.componentClass}
        disabled={(context.form ? context.form.isPending() : false) || props.disabled}
    >
        {props.children}
    </Button>
);

ValidatedSubmit.contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};

export default ValidatedSubmit;