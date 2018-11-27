// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { fetchNotifications } from 'modules/content/actions';
import { TProtypoElement } from 'genesis/protypo';

import NotificationsMenu from 'components/Main/NotificationsMenu';

export interface INotificationsMenuContainerProps {

}

interface INotificationsMenuContainerState {
    offline: boolean;
    count: number;
    mainSection: string;
    notificationsBody: TProtypoElement[];
}

interface INotificationsMenuContainerDispatch {
    fetchNotifications: typeof fetchNotifications.started;
}

class NotificationsContainer extends React.Component<INotificationsMenuContainerProps & INotificationsMenuContainerState & INotificationsMenuContainerDispatch> {
    componentWillReceiveProps(props: INotificationsMenuContainerProps & INotificationsMenuContainerState & INotificationsMenuContainerDispatch) {
        if (this.props.count !== props.count) {
            props.fetchNotifications(undefined);
        }
    }

    render() {
        return (
            <NotificationsMenu {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    const notifications = (state.auth.session && state.auth.session.wallet) ? state.socket.notifications.filter(l =>
        ((state.auth.session.role && Number(state.auth.session.role.id) === l.role) || l.role === 0) &&
        l.id === state.auth.session.wallet!.id &&
        l.ecosystem === state.auth.session.access!.ecosystem
    ).map(l => l.count) : [];
    const count = notifications.length ? notifications.reduce((a, b) => a + b) : 0;

    return {
        count,
        offline: !state.socket.connected,
        mainSection: state.navigator.mainSection,
        notificationsBody: state.content.notifications
    };
};

const mapDispatchToProps = {
    fetchNotifications: fetchNotifications.started
};

export default connect<INotificationsMenuContainerState, INotificationsMenuContainerDispatch, INotificationsMenuContainerProps, IRootState>(mapStateToProps, mapDispatchToProps)(NotificationsContainer);