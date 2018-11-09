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
import { IBreadcrumb } from 'genesis/content';

import themed from 'components/Theme/themed';
import PageLink from 'components/Routing/PageLink';

export interface IBreadcrumbsProps {
    values: IBreadcrumb[];
}

const StyledBreadcrumbs = themed.ul`
    border-bottom: solid 1px ${props => props.theme.headerBackground};
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    margin: 0;
    font-size: 0;
    
    > li {
        display: inline-block;
        font-size: 15px;
        font-weight: 400;
        height: 45px;
        margin-right: 10px;
    }
`;

const Breadcrumbs: React.SFC<IBreadcrumbsProps> = (props) => (
    <StyledBreadcrumbs>
        {props.values.map((breadcrumb, i) => (
            <li key={i}>
                <PageLink
                    section={breadcrumb.section}
                    page={breadcrumb.page}
                    params={breadcrumb.params}
                >
                    {breadcrumb.page} &gt;
                </PageLink>
            </li>
        ))}
    </StyledBreadcrumbs>
);

export default Breadcrumbs;