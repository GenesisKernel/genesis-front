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
import _ from 'lodash';
import { TSection } from 'genesis/content';

import themed from 'components/Theme/themed';
import Navigation from 'containers/Main/Navigation';
import Selector from './Selector';
import LoadingBar from '../LoadingBar';
import Section from './Section';

const StyledSections = themed.div`
    display: flex;
    flex-direction: column;

    .sections-heading {
        background: ${props => props.theme.headerBackground};
        border-bottom: solid 1px ${props => props.theme.menuOutline};
        padding: 15px 15px 12px;
        height: ${props => props.theme.menuHeight};
    }

    .sections-content {
        flex: 1;
        display: flex;
        flex-direction: row;
    }
`;

export interface ISectionsProps {
    section: string;
    values: {
        [key: string]: TSection;
    };
    navigationSize: number;
}

const mapSectionParam = (section: TSection) => {
    const lastPage = section.pages[section.pages.length - 1];
    const page = lastPage ? lastPage.name : section.defaultPage;
    const params = lastPage ? lastPage.params : {};

    return {
        title: section.title,
        name: section.name,
        page,
        params
    };
};

const Sections: React.SFC<ISectionsProps> = (props) => (
    <StyledSections className="fullscreen">
        <div className="sections-heading">
            <Selector
                section={props.section}
                values={_.map(props.values, mapSectionParam)}
            />
            <LoadingBar />
        </div>
        <div className="sections-content">
            <Navigation section={props.section} />
            <Section
                name={props.section}
                pages={props.values[props.section].pages}
            />
        </div>
    </StyledSections>
);

export default Sections;