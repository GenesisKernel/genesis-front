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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IProtypoElement } from 'components/Protypo/Protypo';
import { fetchNotifications } from 'modules/content/actions';

import NotificationsMenu from 'components/Main/NotificationsMenu';

export interface INotificationsMenuContainerProps {

}

interface INotificationsMenuContainerState {
    count: number;
    notificationsBody: IProtypoElement[];
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
    const notifications = state.auth.account ? state.socket.notifications.filter(l =>
        l.id === state.auth.account.id &&
        l.ecosystem === state.auth.account.ecosystem
    ).map(l => l.count) : [];
    const count = notifications.length ? notifications.reduce((a, b) => a + b) : 0;

    return {
        count,
        notificationsBody: state.content.notifications
    };
};

const mapDispatchToProps = {
    fetchNotifications: fetchNotifications.started
};

export default connect<INotificationsMenuContainerState, INotificationsMenuContainerDispatch, INotificationsMenuContainerProps>(mapStateToProps, mapDispatchToProps)(NotificationsContainer);