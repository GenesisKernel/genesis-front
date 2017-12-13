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
import styled from 'styled-components';

const StyledHeading = styled.div`
    -webkit-user-select: none;
    -webkit-app-region: drag;
    z-index: 1000;
    font-size: 20px;
    line-height: 45px;
    height: 46px;
    color: #000;
    font-weight: normal;
    padding: 0 20px;
    border: 0;
`;

export interface IHeadingProps {
    className?: string;
    left?: number;
    right?: number;
    top?: number;
}

const Heading: React.SFC<IHeadingProps> = props => (
    <StyledHeading className={props.className} style={{ left: props.left, right: props.right, top: props.top }}>
        <div>
            {props.children}
        </div>
    </StyledHeading >
);

export default Heading;