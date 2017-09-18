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
import { FormControl, FormControlProps } from 'react-bootstrap';
import { IValidator } from './Validators';

interface IValidatedControlProps extends FormControlProps {
    validators?: IValidator[];
    _registerElement?: (value: string) => void;
    _unregisterElement?: () => void;
}

export default class ValidatedControl extends React.Component<IValidatedControlProps> {
    componentDidMount() {
        this.props._registerElement(this.props.defaultValue as string);
    }

    componentWillUnmount() {
        this.props._unregisterElement();
    }

    render() {
        return (
            <FormControl
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                bsClass={this.props.bsClass}
                bsSize={this.props.bsSize}
                componentClass={this.props.componentClass}
                id={this.props.id}
                inputRef={this.props.inputRef}
                type={this.props.type}
                defaultValue={this.props.defaultValue}
            >
                {this.props.children}
            </FormControl>
        );
    }
}