/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import * as classNames from 'classnames';
import imgClose from 'images/close.svg';

import themed from 'components/Theme/themed';

const StyledSectionButton = themed.button`
    position: relative;
    border-radius: 0;
    padding: 0 20px;
    margin: 0;
    outline: 0;
    border: 0;
    background: 0;
    color: ${props => props.theme.headerForeground};
    font-size: 16px;
    font-weight: 300;
    transition: background .15s;

    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &.active {
        background: ${props => props.theme.headerBackgroundActive};
        color: ${props => props.theme.headerForegroundActive};
    }

    &.closeable {
        padding-right: 0;
    }

    .section-close {
        padding: 0 10px 0 8px;
        width: 0;
        font-size: 15px;
        opacity: 0.5;
        transition: opacity ease-in-out .17s;
        font-weight: bold;

        &:hover {
            opacity: 1;
        }
    }
`;

export interface ISectionButtonProps {
    active?: boolean;
    closeable?: boolean;
    onClick?: () => void;
    onClose?: () => void;
}

const SectionButton: React.SFC<ISectionButtonProps> = props => {
    const onClose = props.closeable ? (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        props.onClose();
    } : null;

    return (
        <StyledSectionButton onClick={props.onClick} className={classNames({ active: props.active, closeable: props.closeable })}>
            {props.children}
            {props.closeable && (
                <span className="section-close" onClick={onClose}>
                    <img src={imgClose} />
                </span>
            )}
        </StyledSectionButton>
    );
};

export default SectionButton;