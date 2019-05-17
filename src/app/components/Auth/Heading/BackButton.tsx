/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import platform from 'lib/platform';

export interface IBackButtonProps {
    className?: string;
    returnUrl?: string;
    onClick?: () => void;
}

const BackButton: React.SFC<IBackButtonProps> = props => props.returnUrl ?
    (
        <Link to={props.returnUrl} className={props.className}>
            <em className="button-icon icon-arrow-left" />
            <div className="button-title">
                <FormattedMessage id="general.back" defaultMessage="Back" />
            </div>
        </Link>
    ) : (
        <button type="button" className={props.className} onClick={props.onClick}>
            <em className="button-icon icon-arrow-left" />
            <div className="button-title">
                <FormattedMessage id="general.back" defaultMessage="Back" />
            </div>
        </button>
    );

export default styled(BackButton) `
    text-decoration: none !important;
    border: 0;
    background: 0;
    padding: 0;
    color: ${platform.select({ desktop: '#4085dc', web: '#fff' })};
    font-size: 14px;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        margin-right: 5px;
    }

    .button-title {
        vertical-align: top;
        display: inline-block;
        line-height: 40px;
    }
`;