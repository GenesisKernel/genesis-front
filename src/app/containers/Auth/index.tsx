/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalShow } from 'modules/modal/actions';

import Auth from 'components/Auth';

export interface IAuthContainerProps {

}

interface IAuthContainerState {
    locale: string;
}

interface IAuthContainerDispatch {
    changeLocale: (locale: string) => void;
}

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale
});

const mapDispatchToProps = {
    changeLocale: (locale: string) => modalShow({
        id: 'CHANGE_LOCALE',
        type: 'CHANGE_LOCALE',
        params: {
            value: locale
        }
    })
};

const AuthContainer: React.SFC<IAuthContainerProps & IAuthContainerState & IAuthContainerDispatch> = props => {
    const changeLocale = () =>
        props.changeLocale(props.locale);

    return (
        <Auth {...props} changeLocale={changeLocale} />
    );
};

export default connect<IAuthContainerState, IAuthContainerDispatch, IAuthContainerProps>(mapStateToProps, mapDispatchToProps)(AuthContainer);