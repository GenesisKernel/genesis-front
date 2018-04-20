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
import { connect } from 'react-redux';
import { IRootState } from 'modules';

import Avatar from 'components/Avatar';

interface IAvatarContainerProps {
    className?: string;
    keyID: string;
    ecosystem: string;
    size?: number;
}

interface IAvatarContainerState {
    nodeHost: string;
}

interface IAvatarContainerDispatch {

}

const AvatarContainer: React.SFC<IAvatarContainerProps & IAvatarContainerState & IAvatarContainerDispatch> = props => (
    <Avatar
        className={props.className}
        size={props.size}
        url={`${props.nodeHost}/api/v2/avatar/${props.ecosystem}/${props.keyID}`}
    />
);

const mapStateToProps = (state: IRootState) => ({
    nodeHost: state.engine.nodeHost
});

const mapDispatchToProps = {
};

export default connect<IAvatarContainerState, IAvatarContainerDispatch, IAvatarContainerProps>(mapStateToProps, mapDispatchToProps)(AvatarContainer);