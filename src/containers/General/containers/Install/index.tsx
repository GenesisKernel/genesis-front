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
import { actions } from 'modules/engine';
import { IInstallParams } from 'lib/api';

import InstallForm from 'components/InstallForm';

interface IInstallProps {
    install: typeof actions.install.started;
    isInstalled: boolean;
    isInstalling: boolean;
    setLoading: typeof actions.setLoading;
}

class Install extends React.Component<IInstallProps> {
    componentWillReceiveProps(props: IInstallProps) {
        if (props.isInstalled) {
            this.props.setLoading(true);
        }
    }

    onSubmit(values: IInstallParams) {
        this.props.install(values);
    }

    render() {
        return (
            <InstallForm ref="installForm" intl={null} isInstalling={this.props.isInstalling} onSubmit={this.onSubmit.bind(this)} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    isInstalled: state.engine.isInstalled,
    isInstalling: state.engine.isInstalling
});

export default connect(mapStateToProps, {
    install: actions.install.started,
    setLoading: actions.setLoading
})(Install);