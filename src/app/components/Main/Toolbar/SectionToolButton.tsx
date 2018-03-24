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

export interface ISectionToolButtonProps {
    className?: string;
    disabled?: boolean;
    activeIndex: number;
    items: React.ReactNode[];
    onChange?: (index: number) => void;
}

const SectionToolButton: React.SFC<ISectionToolButtonProps> = props => (
    <li className={props.className}>
        <ul className="button-sections">
            {props.items.map((l, i) => (
                <li key={i} className={props.activeIndex === i ? 'active' : null}>
                    <button onClick={props.onChange && props.onChange.bind(null, i)}>
                        {l}
                    </button>
                </li>
            ))}
        </ul>
    </li>
);

const StyledSectionToolButton = styled(SectionToolButton) `
    display: inline-block;
    height: 40px;
    padding: 9px;
    float: right;

    ul.button-sections {
        border: solid 1px #9eb4d0;
        border-radius: 2px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-size: 0;

        li {
            display: inline-block;

            button {
                background: 0;
                outline: 0;
                border: 0;
                border-right: solid 1px #9eb4d0;
                height: 20px;
                font-size: 13px;
                padding: 0 10px;
                color: #194a8a;
            }

            &:last-child button {
                border-right: 0;
            }

            &:hover button {
                background: #e9eef5;
            }

            &.active button {
                background: #9eb4d1;
                color: #fff;
            }
        }
    }
`;

export default StyledSectionToolButton;