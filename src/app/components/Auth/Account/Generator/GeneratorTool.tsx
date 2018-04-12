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
import { Button, Col } from 'react-bootstrap';

export interface IGeneratorToolProps {
    disabled?: boolean;
    onClick: () => void;
}

const GeneratorTool: React.SFC<IGeneratorToolProps> = props => (
    <Col xs={4} className="pl0 pr0">
        <Button disabled={props.disabled} className="btn-block" onClick={props.onClick}>
            {props.children}
        </Button>
    </Col>

);

export default GeneratorTool;