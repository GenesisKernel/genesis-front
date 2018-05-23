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

import React from 'react';
import { connect } from 'react-redux';
import { inviteEcosystem } from 'modules/auth/actions';

export interface IInviteContainerProps {
    ecosystem: string;
    page?: string;
}

interface IInviteContainerDispatch {
    onLoad: typeof inviteEcosystem;
}

class InviteContainer extends React.Component<IInviteContainerProps & IInviteContainerDispatch> {
    componentDidMount() {
        const ecosystemID = parseInt(this.props.ecosystem, 10);
        if (ecosystemID === ecosystemID) {
            this.props.onLoad({
                ecosystem: ecosystemID.toString(),
                redirectPage: this.props.page
            });
        }
    }

    render() {
        return null as JSX.Element;
    }
}

const mapDispatchToProps = {
    onLoad: inviteEcosystem
};

export default connect<{}, IInviteContainerDispatch, IInviteContainerProps>(null, mapDispatchToProps)(InviteContainer);