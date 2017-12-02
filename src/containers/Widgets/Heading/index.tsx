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
import { IRootState } from 'modules';
import { connect } from 'react-redux';

import sidebarStyle from 'components/Main/Sidebar/style';
import Heading from 'components/Heading';

export interface IHeadingContainerProps {
    className?: string;
}

interface IHeadingContainerState {
    navigationVisible: boolean;
    navigationWidth: number;
}

interface IHeadingContainerDispatch {

}

const HeadingContainer: React.SFC<IHeadingContainerProps & IHeadingContainerState & IHeadingContainerDispatch> = (props) => (
    <Heading className={props.className} left={props.navigationVisible ? props.navigationWidth : sidebarStyle.collapsedSize}>
        {props.children}
    </Heading>
);

const mapStateToProps = (state: IRootState) => ({
    navigationVisible: state.content.navigationVisible,
    navigationWidth: state.content.navigationWidth
});

const mapDispatchToProps = {

};

export default connect<IHeadingContainerState, IHeadingContainerDispatch, IHeadingContainerProps>(mapStateToProps, mapDispatchToProps)(HeadingContainer);