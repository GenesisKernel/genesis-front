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

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { INotificationProto } from 'genesis/notifications';

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