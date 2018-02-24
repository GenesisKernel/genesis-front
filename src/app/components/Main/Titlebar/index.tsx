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
import styled from 'styled-components';
import platform from 'lib/platform';

export interface ITitlebarProps {
    maximizable?: boolean;
}

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

const Titlebar = platform.select<React.SFC<ITitlebarProps>>({
    web: () => null,
    desktop: props => {
        const DarwinTitlebar = require('./DarwinTitlebar').default;
        const LinuxTitlebar = require('./LinuxTitlebar').default;
        const WinTitlebar = require('./WinTitlebar').default;

        return (
            <StyledControls>
                {platform.select({
                    darwin: (<DarwinTitlebar {...props} />),
                    linux: (<LinuxTitlebar {...props} />),
                    win32: (<WinTitlebar {...props} />),

                    // Fallback for unsupported platforms
                    desktop: (<LinuxTitlebar {...props} />)
                })}
                <div className="window-title">{props.children}</div>
            </StyledControls>
        );
    }
});

export default Titlebar;