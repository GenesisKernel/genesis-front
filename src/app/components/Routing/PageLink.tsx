/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { LEGACY_PAGES } from 'lib/legacyPages';

export interface IPageLinkProps {
    section?: string;
    mainSection: string;
    currentSection: string;
    page: string;
    params?: {
        [key: string]: string
    };
    className?: string;
    navigatePage: (params: { name: string, section: string, params: { [key: string]: string } }) => void;
}

const PageLink: React.SFC<IPageLinkProps> = props => {
    const sectionName = ((LEGACY_PAGES[props.page] && (LEGACY_PAGES[props.page].section || props.mainSection))) || props.section || props.currentSection;

    const navigateUrl = `/${sectionName}/${props.page}`;
    const navigatePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.navigatePage({
            name: props.page,
            section: sectionName,
            params: props.params
        });
        return false;
    };

    return (
        <a href={navigateUrl} className={props.className} onClick={navigatePage}>
            {props.children}
        </a>
    );
};

export default PageLink;