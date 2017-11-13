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
import ReduxToastr from 'react-redux-toastr';
import { OrderedMap } from 'immutable';
import styled from 'styled-components';
import sidebarStyle from './Sidebar/style';

import Navigation from 'containers/Main/Navigation';
import Sidebar from 'containers/Main/Sidebar';

const StyledWrapper = styled.div`
    background-color: #f6f8fa;
`;

const StyledContent = styled.section`
    margin-top: 0 !important;
    margin-left: ${sidebarStyle.fullSize}px !important;
`;

export interface IMainProps {
    session: string;
    pending: boolean;
    stylesheet: string;
    pendingTransactions: OrderedMap<string, { uuid: string, block: string, error: string, contract: string }>;
    transactionsCount: number;
}

const Main: React.SFC<IMainProps> = props => (
    <StyledWrapper className="wrapper component-main">
        <style type="text/css">
            {props.stylesheet}
        </style>
        <Sidebar />
        <Navigation />
        <StyledContent>
            <ReduxToastr
                timeOut={3000}
                newestOnTop
                position="top-center"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
            />
            {props.children}
        </StyledContent>
    </StyledWrapper>
);

export default Main;