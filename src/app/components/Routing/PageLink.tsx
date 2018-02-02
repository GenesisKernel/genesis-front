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

export interface IPageLinkProps {
    section?: string;
    page: string;
    params?: {
        [key: string]: string
    };
    className?: string;
    vde?: boolean;
    navigatePage: (params: { name: string, section: string, params: { [key: string]: string }, vde?: boolean }) => void;
}

const PageLink: React.SFC<IPageLinkProps> = props => {
    const navigateUrl = `/${props.section}/${props.page}`;
    const navigatePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.navigatePage({
            name: props.page,
            section: props.section,
            params: props.params,
            vde: props.vde
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