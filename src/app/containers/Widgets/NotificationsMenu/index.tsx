/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { fetchNotifications } from 'modules/content/actions';
import { TProtypoElement } from 'apla/protypo';

import NotificationsMenu from 'components/Main/NotificationsMenu';

export interface INotificationsMenuContainerProps {

}

interface INotificationsMenuContainerState {
    offline: boolean;
    count: number;
    notificationsBody: TProtypoElement[];
}

interface INotificationsMenuContainerDispatch {
    fetchNotifications: typeof fetchNotifications.started;
}

class NotificationsContainer extends React.Component<INotificationsMenuContainerProps & INotificationsMenuContainerState & INotificationsMenuContainerDispatch> {
    componentWillReceiveProps(props: INotificationsMenuContainerProps & INotificationsMenuContainerState & INotificationsMenuContainerDispatch) {
        if (this.props.count !== props.count) {
            props.fetchNotifications(null);
        }
    }

    render() {
        return (
            <NotificationsMenu {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    const notifications = state.auth.wallet && state.auth.wallet.wallet ? state.socket.notifications.filter(l =>
        ((state.auth.wallet.role && Number(state.auth.wallet.role.id) === l.role) || l.role === 0) &&
        l.id === state.auth.wallet.wallet.id &&
        l.ecosystem === state.auth.wallet.access.ecosystem
    ).map(l => l.count) : [];
    const count = notifications.length ? notifications.reduce((a, b) => a + b) : 0;

    return {
        count,
        offline: !state.socket.connected,
        notificationsBody: state.content.notifications
    };
};

const mapDispatchToProps = {
    fetchNotifications: fetchNotifications.started
};

export default connect<INotificationsMenuContainerState, INotificationsMenuContainerDispatch, INotificationsMenuContainerProps>(mapStateToProps, mapDispatchToProps)(NotificationsContainer);