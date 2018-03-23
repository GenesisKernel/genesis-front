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
import { LEGACY_PAGES } from 'lib/legacyPages';

export interface IPageLinkProps {
    section?: string;
    currentSection: string;
    page: string;
    params?: {
        [key: string]: string
    };
    className?: string;
    navigatePage: (params: { name: string, section: string, params: { [key: string]: string } }) => void;
}

const PageLink: React.SFC<IPageLinkProps> = props => {
    const sectionName = ((LEGACY_PAGES[props.page] && LEGACY_PAGES[props.page].section)) || props.section || props.currentSection;

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