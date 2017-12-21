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
import styled from 'styled-components';
import platform from 'lib/platform';

const StyledControls = styled.div`
    position: relative;

    .window-title {
        position: absolute;
        text-align: center;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
`;

const Titlebar = platform.select<React.SFC>({
    web: () => null,
    desktop: props => {
        const DarwinTitlebar = require('./DarwinTitlebar').default;
        const LinuxTitlebar = require('./LinuxTitlebar').default;
        const WinTitlebar = require('./WinTitlebar').default;

        return (
            <StyledControls>
                {platform.select({
                    darwin: (<DarwinTitlebar />),
                    linux: (<LinuxTitlebar />),
                    win32: (<WinTitlebar />),

                    // Fallback for unsupported platforms
                    desktop: (<LinuxTitlebar />)
                })}
                <div className="window-title">{props.children}</div>
            </StyledControls>
        );
    }
});

export default Titlebar;