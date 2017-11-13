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
import imgLogo from 'images/logo.svg';
import styled from 'styled-components';

import imgBack from 'images/back.png';

const StyledSplash = styled.div`
    background: url(${imgBack}) no-repeat;
    background-attachment: fixed;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: table;

    .content {
        display: table-cell;
        vertical-align: middle;
        height: 100%;
        padding: 10px;
    }

    .content > .loader {
        position: relative;
        width: 200px;
        height: 65px;
        margin: 0 auto;
    }
`;

export default class extends React.Component {
    render() {
        return (
            <StyledSplash className="bg-dark">
                <div className="content">
                    <div className="loader">
                        <img className="logo" src={imgLogo} />
                    </div>
                </div>
            </StyledSplash>
        );
    }
}