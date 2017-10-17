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

interface IValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    validators?: IValidator[];
    _registerElement?: (value: string) => void;
    _unregisterElement?: () => void;
}

export default class ValidatedTextarea extends React.Component<IValidatedTextareaProps> {
    componentDidMount() {
        this.props._registerElement(this.props.defaultValue as string);
    }

    componentWillUnmount() {
        this.props._unregisterElement();
    }

    render() {
        return (
            <textarea
                id={this.props.id}
                className={`form-control ${this.props.className}`}
                value={this.props.value}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
            />
        );
    }
}