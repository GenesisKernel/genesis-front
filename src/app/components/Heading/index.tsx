/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.div`
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
}

const Heading: React.SFC<IHeadingProps> = props => (
    <StyledHeading className={props.className}>
        <div>
            {props.children}
        </div>
    </StyledHeading >
);

export default Heading;