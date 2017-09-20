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
import { IValidator } from './Validators';

interface IValidatedCheckboxProps {
    validators?: IValidator[];
    _registerElement?: (value: boolean) => void;
    _unregisterElement?: () => void;
    name: string;
    title: string;
    className?: string;
    defaultChecked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    checked?: boolean;
}

export default class ValidatedCheckbox extends React.Component<IValidatedCheckboxProps> {
    componentDidMount() {
        this.props._registerElement(this.props.defaultChecked);
    }

    componentWillUnmount() {
        this.props._unregisterElement();
    }

    render() {
        return (
            <div className={`checkbox c-checkbox ${this.props.className}`}>
                <label>
                    <input type="checkbox" name={this.props.name} defaultChecked={this.props.defaultChecked} onChange={this.props.onChange} checked={this.props.checked} />
                    <em className="fa fa-check" />
                    <span>{this.props.title}</span>
                </label>
            </div>
        );
    }
}