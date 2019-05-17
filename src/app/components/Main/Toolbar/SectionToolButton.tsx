/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';

export interface ISectionToolButtonProps {
    className?: string;
    disabled?: boolean;
    activeIndex: number;
    items: React.ReactNode[];
    onChange?: (index: number) => void;
}

const SectionToolButton: React.SFC<ISectionToolButtonProps> = props => (
    <ul className={classNames('button-sections', props.className)}>
        {props.items.map((l, i) => (
            <li key={i} className={props.activeIndex === i ? 'active' : null}>
                <button type="button" onClick={props.onChange && props.onChange.bind(null, i)}>
                    {l}
                </button>
            </li>
        ))}
    </ul>
);

const StyledSectionToolButton = themed(SectionToolButton)`
    border: solid 1px ${props => props.theme.sectionButtonOutline};
    border-radius: 2px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 0;
    display: inline-block;

    li {
        display: inline-block;

        button {
            background: 0;
            outline: 0;
            border: 0;
            border-right: solid 1px ${props => props.theme.sectionButtonOutline};
            height: 20px;
            font-size: 13px;
            padding: 0 10px;
            color: ${props => props.theme.sectionButtonForeground};
        }

        &:last-child button {
            border-right: 0;
        }

        &:hover button {
            background: ${props => props.theme.sectionButtonBackground};
        }
        
        &.active button {
            background: ${props => props.theme.sectionButtonActive};
            color: ${props => props.theme.sectionButtonPrimary};
        }
    }
`;

export default StyledSectionToolButton;