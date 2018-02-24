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
import { Col } from 'react-bootstrap';

export interface IPropertiesInputProps {
    name: string;
    title: string;
    placeholder?: string;
    value: string;
    onChange?: any;
    readOnly?: boolean;
}

const PropertiesInput: React.SFC<IPropertiesInputProps> = (props) => {
    return (
        <div className="form-group">
            <label className="col-xs-3 control-label g-no-padding">
                <small>{props.title}</small>
            </label>
            <Col xs={9}>
                <input
                    type="text"
                    className="form-control input-sm"
                    placeholder={props.placeholder || props.title}
                    value={props.value}
                    onChange={props.onChange}
                    readOnly={!!props.readOnly}
                />
            </Col>
        </div>
    );

};

export default PropertiesInput;
