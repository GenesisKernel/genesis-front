/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';

interface ICheckboxProps {
    id?: string;
    title?: string;
    disabled?: boolean;
    className?: string;
    defaultChecked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    readOnly?: boolean;
    checked?: boolean;
}

const Checkbox: React.SFC<ICheckboxProps> = (props) => (
    <div className={`checkbox c-checkbox ${props.className || ''}`}>
        <label>
            <input id={props.id} type="checkbox" disabled={props.disabled} defaultChecked={props.defaultChecked} onChange={props.onChange} checked={props.checked} readOnly={props.readOnly} />
            <em className="fa fa-check" />
            <span>{props.title}</span>
        </label>
    </div>
);

export default Checkbox;