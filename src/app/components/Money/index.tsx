/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { FormattedNumber } from 'react-intl';

export interface IMoneyProps {
    value: string | number;
    children?: never;
}

const Money: React.SFC<IMoneyProps> = (props) => (
    <FormattedNumber
        value={parseInt(props.value.toString(), 10)}
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        useGrouping={true}
    />
);

export default Money;