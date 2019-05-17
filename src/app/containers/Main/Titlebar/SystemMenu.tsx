/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';

import SystemMenu from 'components/Main/Titlebar/SystemMenu';

export interface ISystemMenuContainerProps {
    align: 'left' | 'right';
}

interface ISystemMenuContainerState {
    locale: string;
}

interface ISystemMenuContainerDispatch {
    modalShow: typeof modalShow;
}

const SystemMenuContainer: React.SFC<ISystemMenuContainerProps & ISystemMenuContainerState & ISystemMenuContainerDispatch> = (props) => {
    const onAbout = () => {
        props.modalShow({
            id: 'ABOUT',
            type: 'ABOUT',
            params: {}
        });
    };

    const onChangeLocale = () => {
        props.modalShow({
            id: 'CHANGE_LOCALE',
            type: 'CHANGE_LOCALE',
            params: {
                value: props.locale
            }
        });
    };

    return (
        <SystemMenu align={props.align} onAbout={onAbout} onChangeLocale={onChangeLocale} />
    );
};

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale
});

const mapDispatchToProps = {
    modalShow: modalShow
};

export default connect<ISystemMenuContainerState, ISystemMenuContainerDispatch, ISystemMenuContainerProps>(mapStateToProps, mapDispatchToProps)(SystemMenuContainer);