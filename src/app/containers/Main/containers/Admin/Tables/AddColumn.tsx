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

import AddColumn from 'components/Main/Admin/Tables/AddColumn';

export interface IAddColumnContainerProps {
    vde?: boolean;
    match: { params: { tableName: string } };
}

interface IAddColumnContainerState {

}

interface IAddColumnContainerDispatch {

}

const AddColumnContainer: React.SFC<IAddColumnContainerProps & IAddColumnContainerState & IAddColumnContainerDispatch> = (props) => (
    <AddColumn vde={props.vde} table={props.match.params.tableName} />
);

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {

};

export default connect<IAddColumnContainerState, IAddColumnContainerDispatch, IAddColumnContainerProps>(mapStateToProps, mapDispatchToProps)(AddColumnContainer);