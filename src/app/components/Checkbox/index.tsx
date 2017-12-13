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