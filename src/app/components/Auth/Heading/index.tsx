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

import BackButton from './BackButton';

export interface IHeadingProps {
    className?: string;
    returnUrl?: string;
    onReturn?: () => void;
}

const Heading: React.SFC<IHeadingProps> = props => (
    <div className={props.className}>
        <div className="heading-content">
            <div className="heading-left">
                {(props.returnUrl || props.onReturn) && (
                    <BackButton returnUrl={props.returnUrl} onClick={props.onReturn} />
                )}
            </div>
            <div className="heading-title">
                {props.children}
            </div>
        </div>
    </div>
);

export default styled(Heading) `
    background: ${platform.select({ web: '#4c7dbd', desktop: 'transparent' })};
    margin: -15px -15px ${platform.select({ desktop: '0', web: '15px' })};
    padding: 0 15px;
    height: 45px;
    line-height: 43px;

    .heading-content {
        position: relative;

        .heading-left {
            position: absolute;
            top: 2px;
            left: 0;
            bottom: 0;
        }

        .heading-title {
            color: ${platform.select({ web: '#fff', desktop: '#000' })};
            font-size: 18px;
        }
    }
`;