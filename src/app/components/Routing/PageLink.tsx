// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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