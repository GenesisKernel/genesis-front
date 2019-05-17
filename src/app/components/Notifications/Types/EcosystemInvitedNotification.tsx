/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { INotificationProto } from 'apla/notifications';

const EcosystemInvitedNotification: INotificationProto<{ ecosystem: string }> = {
    icon: 'o-checkround-1',
    title: (
        <FormattedMessage id="tx.error.info" defaultMessage="Information" />
    ),
    body: params => (
        <FormattedMessage id="notification.ecosystem_invited" defaultMessage="Joined ecosystem {ecosystem}" values={{ ecosystem: params.ecosystem }} />
    )
};

export default EcosystemInvitedNotification;