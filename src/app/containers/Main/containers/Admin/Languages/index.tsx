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
import { getLanguages } from 'modules/admin/actions';

import DataPreloader from 'components/Animation/DataPreloader';
import Languages from 'components/Main/Admin/Languages';

export interface ILanguagesContainerProps {

}

interface ILanguagesContainerState {
    resources: { id: string, res: any, name: string, conditions: string }[];
}

interface ILanguagesContainerDispatch {
    getLanguages: typeof getLanguages.started;
}

class LanguagesContainer extends React.Component<ILanguagesContainerProps & ILanguagesContainerState & ILanguagesContainerDispatch> {
    componentDidMount() {
        this.props.getLanguages(null);
    }

    render() {
        return (
            <DataPreloader data={[this.props.resources]}>
                <Languages resources={this.props.resources} />
            </DataPreloader>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    resources: state.admin.languages
});

const mapDispatchToProps = {
    getLanguages: getLanguages.started
};

export default connect<ILanguagesContainerState, ILanguagesContainerDispatch, ILanguagesContainerProps>(mapStateToProps, mapDispatchToProps)(LanguagesContainer);