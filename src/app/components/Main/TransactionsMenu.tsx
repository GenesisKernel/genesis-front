/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';

import DropdownButton from 'components/DropdownButton';

export interface ITransactionsMenuProps {

}

const TransactionsMenu: React.SFC<ITransactionsMenuProps> = props => (
    <DropdownButton
        align="right"
        width={300}
        content={(
            <div style={{ color: '#000' }}>
                <div>Content goes here</div>
                <div>Content goes here</div>
                <div>Content goes here</div>
                <div>Content goes here</div>
                <div>Content goes here</div>
            </div>
        )}
    >
        <em className="icon icon-hourglass" />
    </DropdownButton>
);

export default TransactionsMenu;