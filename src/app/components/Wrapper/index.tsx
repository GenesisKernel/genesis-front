/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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