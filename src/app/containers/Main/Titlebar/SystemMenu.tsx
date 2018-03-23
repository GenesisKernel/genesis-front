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
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';

import SystemMenu from 'components/Main/Titlebar/SystemMenu';

export interface ISystemMenuContainerProps {
    align: 'left' | 'right';
}

interface ISystemMenuContainerState {

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

    return (
        <SystemMenu align={props.align} onAbout={onAbout} />
    );
};

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    modalShow: modalShow
};

export default connect<ISystemMenuContainerState, ISystemMenuContainerDispatch, ISystemMenuContainerProps>(mapStateToProps, mapDispatchToProps)(SystemMenuContainer);