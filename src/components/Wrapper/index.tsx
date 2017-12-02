// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { Link } from 'react-router-dom';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'containers/Widgets/Heading';

type TMixedContent =
    JSX.Element | string;

export interface IWrapperProps {
    type: 'fullscreen' | 'noscroll';
    title: { title: string, defaultTitle: string };
    heading: {
        content: TMixedContent;
        toolButtons?: {
            url: string;
            icon: string;
            title: TMixedContent;
        }[];
    };
    breadcrumbs: IBreadcrumbProps[];
}

export interface IBreadcrumbProps {
    title: TMixedContent;
    url?: string;
}

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
    fullscreen: 'fullscreen',
    noscroll: 'fullscreen-wrapper'
};

const Wrapper: React.SFC<IWrapperProps> = props => (
    <DocumentTitle title={props.title.title} defaultTitle={props.title.defaultTitle}>
        <div className="fullscreen animated fadeIn">
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

            {props.breadcrumbs && (
                <ol className="breadcrumb">
                    {props.breadcrumbs.map((breadcrumb, index) => (
                        <Breadcrumb key={index} {...breadcrumb} />
                    ))}
                </ol>
            )}

            <div className={bodyClasses[props.type]}>
                {props.children}
            </div>
        </div>
    </DocumentTitle>
);

export default Wrapper;