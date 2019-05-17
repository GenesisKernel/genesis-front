/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import propTypes from 'prop-types';

import Protypo from '../Protypo';

export interface IToolButtonProps {
    title?: string;
    icon?: string;
    page?: string;
    pageparams?: {
        [name: string]: string;
    };
    onClick: (e: any) => void;
}

interface IToolButtonContext {
    protypo: Protypo;
}

const ToolButton: React.SFC<IToolButtonProps> = (props, context: IToolButtonContext) => {
    return (
        <a href="#" className="ml btn-tool" onClick={props.onClick}>
            <em className={`icon ${props.icon}`} />
            <span>
                <span>{props.title}</span>
            </span>
        </a>
    );
};

ToolButton.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default ToolButton;