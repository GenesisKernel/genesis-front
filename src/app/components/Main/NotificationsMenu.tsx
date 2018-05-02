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
import Protypo from 'containers/Widgets/Protypo';
import { FormattedMessage } from 'react-intl';
import { TProtypoElement } from 'genesis/protypo';

import SystemButton from './SystemButton';

export interface INotificationsMenuProps {
    offline: boolean;
    count: number;
    notificationsBody: TProtypoElement[];
}

const NotificationsMenu: React.SFC<INotificationsMenuProps> = props => (
    <SystemButton
        align="right"
        width={250}
        badge={props.count}
        warning={props.offline}
        content={(
            <div style={{ color: '#000', overflow: 'hidden' }}>
                <div className="dropdown-heading">
                    {props.offline ?
                        (
                            <FormattedMessage id="general.error.socket" defaultMessage="Notifications are unavailable" />
                        ) : (
                            <FormattedMessage id="notifications" defaultMessage="Notifications" />
                        )
                    }
                </div>
                <div>
                    {props.offline ?
                        (
                            <p style={{ fontSize: 14, padding: '0 15px', color: '#4b7dbd' }}>
                                <FormattedMessage id="general.error.socket.desc" defaultMessage="Failed to establish connection to the WebSocket server. Check your configuration" />
                            </p>
                        ) : (
                            <Protypo context="menu" content={props.notificationsBody} />
                        )
                    }
                </div>
            </div>
        )}
    >
        {props.offline ?
            (
                <em className="icon fa fa-exclamation" />
            ) : (
                <em className="icon icon-flag" />
            )
        }
    </SystemButton>
);

export default NotificationsMenu;