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
import { createVDE } from 'modules/engine/actions';
import { alertShow } from 'modules/content/actions';

import VDE from 'components/Main/Admin/VDE';

export interface IVDEContainerProps {
}

interface IVDEContainerState {
    pending: boolean;
    result: boolean;
}

interface IVDEContainerDispatch {
    createVDE: () => void;
    alertShow: typeof alertShow;
}

class VDEContainer extends React.Component<IVDEContainerProps & IVDEContainerState & IVDEContainerDispatch> {
    alert(type: string, title: string, text: string, buttonText: string) {
        this.props.alertShow({
            id: 'VDE',
            type,
            title,
            text,
            cancelButton: buttonText
        });
    }

    render() {
        return (
            <VDE {...this.props} alert={this.alert.bind(this)} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    pending: state.engine.isCreatingVDE,
    result: state.engine.createVDEResult
});

const mapDispatchToProps = {
    alertShow,
    createVDE: () => createVDE.started(null)
};

export default connect<IVDEContainerState, IVDEContainerDispatch, IVDEContainerProps>(mapStateToProps, mapDispatchToProps)(VDEContainer);