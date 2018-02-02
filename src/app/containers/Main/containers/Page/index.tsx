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
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { renderPage, ecosystemInit, renderLegacyPage } from 'modules/content/actions';
import { TSection } from 'genesis/content';
import LEGACY_PAGES from 'lib/legacyPages';

import Page from 'components/Main/Page';

export interface IPageContainerProps {
    match?: { params: { [key: string]: string } };
    location?: {
        state: { params?: { [key: string]: any } };
    };
}

interface IPageContainerState {
    section: string;
    sections: {
        [name: string]: TSection;
    };
}

interface IPageContainerDispatch {
    renderPage: typeof renderPage.started;
    renderLegacyPage: typeof renderLegacyPage.started;
    ecosystemInit: typeof ecosystemInit.started;
}

class PageContainer extends React.Component<IPageContainerProps & IPageContainerState & IPageContainerDispatch> {
    componentDidMount() {
        this.props.ecosystemInit({
            section: this.props.match.params.section
        });
    }

    componentWillReceiveProps(props: IPageContainerProps & IPageContainerState & IPageContainerDispatch) {
        if (this.props.match.params.section !== props.match.params.section) {
            //console.log('Section change detected::', props.match.params.section);
        }
        this.renderPage(props);
    }

    renderPage(props: IPageContainerProps & IPageContainerState & IPageContainerDispatch) {
        //const isVDE = props.match.params && props.match.params['0'] === 'vde';
        const section = props.sections[props.match.params.section];
        const isPending = section.pending;
        const requestPage = (props.match.params.pageName || section.defaultPage);

        if (!isPending) {
            if (!section.page) {
                props.renderPage({
                    section: section.name,
                    name: section.defaultPage,
                    params: {},
                    vde: false
                });
            }
            else if (section.page.name !== requestPage || section.force) {
                const legacyPage = LEGACY_PAGES[requestPage];

                if (legacyPage && section.name === legacyPage.section) {
                    props.renderLegacyPage({
                        section: legacyPage.section || section.name,
                        name: requestPage,
                        menu: legacyPage.menu,
                        params: props.location && props.location.state && props.location.state.params,
                        vde: false
                    });
                }
                else {
                    props.renderPage({
                        section: section.name,
                        name: requestPage,
                        params: props.location && props.location.state && props.location.state.params,
                        vde: false
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="flex-col flex-stretch">
                {_.map(this.props.sections, section => {
                    const isVDE = this.props.match.params && this.props.match.params['0'] === 'vde';
                    const isLegacy = section.page && section.page.legacy;
                    const legacyPage = isLegacy ? LEGACY_PAGES[section.page.name] : null;

                    return (
                        <div key={section.name} className="flex-col flex-stretch" style={{ display: this.props.section === section.name ? null : 'none', overflowX: 'hidden', overflowY: 'auto' }}>
                            {isLegacy ?
                                (
                                    legacyPage.render(section.page.params)
                                ) :
                                (
                                    <Page
                                        vde={isVDE}
                                        error={section.page && section.page.error}
                                        name={section.page && section.page.name}
                                        params={section.page && section.page.params}
                                        content={section.page && section.page.content}
                                    />
                                )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    section: state.content.section,
    sections: state.content.sections
});

const mapDispatchToProps = {
    renderPage: renderPage.started,
    renderLegacyPage: renderLegacyPage.started,
    ecosystemInit: ecosystemInit.started
};

export default connect<IPageContainerState, IPageContainerDispatch, IPageContainerProps>(mapStateToProps, mapDispatchToProps)(PageContainer);