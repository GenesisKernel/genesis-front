/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Protypo from 'containers/Widgets/Protypo';
import { FormattedMessage } from 'react-intl';
import { TProtypoElement } from 'apla/protypo';

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
            <div style={{ overflow: 'hidden' }}>
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
                            <p className="dropdown-info">
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