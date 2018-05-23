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

import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from 'components/Heading';

type TMixedContent =
    JSX.Element | string;

export interface IWrapperProps {
    type: 'default' | 'fullscreen' | 'noscroll';
    title: { title: string, defaultTitle: string };
    heading?: {
        content: TMixedContent;
        toolButtons?: {
            url: string;
            icon: string;
            title: TMixedContent;
        }[];
    };
    description?: React.ReactNode;
    breadcrumbs?: IBreadcrumbProps[];
}

export interface IBreadcrumbProps {
    title: TMixedContent;
    url?: string;
}

const StyledDescription = styled.div`
    padding: 10px 20px;
    color: #84909e;
    border-bottom: 1px solid #cfdbe2;
`;

const StyledBreadcrumbs = styled.ul`
    padding: 10px 20px;
    color: #84909e;
    border-bottom: 1px solid #cfdbe2;
    list-style: none;
`;

const Breadcrumb: React.SFC<IBreadcrumbProps> = props => (
    <li>
        {props.url ?
            (
                <Link to={props.url}>{props.title}</Link>
            ) : (
                <span>{props.title}</span>
            )
        }
    </li>
);

const bodyClasses = {
    default: 'content-wrapper',
    fullscreen: 'fullscreen',
    noscroll: 'fullscreen-wrapper'
};

const Wrapper: React.SFC<IWrapperProps> = props => (
    <LocalizedDocumentTitle title={props.title.title} defaultTitle={props.title.defaultTitle}>
        <div className="fullscreen">
            {props.heading && (
                <Heading>
                    <div className="pull-right">
                        {props.heading.toolButtons && props.heading.toolButtons.map((button, index) => (
                            <Link key={index} to={button.url} className="ml btn-tool">
                                <em className={`icon ${button.icon}`} />
                                <span>{button.title}</span>
                            </Link>
                        ))}
                    </div>
                    <div>{props.heading.content}</div>
                </Heading>
            )}

            {props.description && (
                <StyledDescription>
                    {props.description}
                </StyledDescription>
            )}

            {props.breadcrumbs && (
                <StyledBreadcrumbs className="breadcrumb">
                    {props.breadcrumbs.map((breadcrumb, index) => (
                        <Breadcrumb key={index} {...breadcrumb} />
                    ))}
                </StyledBreadcrumbs>
            )}

            <div className={bodyClasses[props.type || 'default']}>
                {props.children}
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default Wrapper;