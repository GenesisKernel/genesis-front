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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { getPage } from 'modules/admin/actions';

// import Constructor, { IConstructorProps } from 'components/Main/Admin/Interface/Constructor';
import Constructor from 'containers/Main/containers/Admin/Interface/Constructor';
import ConstructorTabs from 'components/ConstructorTabs';
import { loadTabList, removeTabList } from 'modules/admin/actions';

export interface IConstructorTabbedProps {
    pageID?: string;
    pageName?: string;
    page?: any;
    tabs: any;
    tabList: string[];
    // template: string;
    treeCode?: any;
    session: string;
    loadTabList: typeof loadTabList;
    removeTabList: typeof removeTabList;
}

class ConstructorTabbed extends React.Component<IConstructorTabbedProps & { getPage: typeof getPage.started, match?: { params: { pageID: string, pageName: string } } }> {
    componentWillMount() {
        this.props.loadTabList({ add_id: this.props.match.params.pageID });
    }

    onTabClose(index: number) {
        // alert('close ' + index);
        this.props.removeTabList({ index: index });
    }

    renderTabsContent() {
        let tabs: JSX.Element[] = [];
        if (this.props.tabList.length) {
            for (let tabId of this.props.tabList) {
                tabs.push(
                    <Constructor pageID={tabId} key={tabId}/>
                );
            }
        }
        return tabs;
    }

    render() {
        let tabTitles = [];

        if (this.props.tabList.length) {
            for (let tabId of this.props.tabList) {
                if (this.props.tabs && this.props.tabs[tabId]) {
                    tabTitles.push(
                        this.props.tabs[tabId].data.name
                    );
                }
                else {
                    tabTitles.push('ID ' + tabId);
                }
            }
        }

        return (
            <ConstructorTabs
                tabs={tabTitles}
                onTabClose={this.onTabClose.bind(this)}
            >
                {/*<Constructor pageID={pageID}/>*/}
                {this.renderTabsContent()}
            </ConstructorTabs>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    // page: state.admin.page,
    tabList: (state.admin.constructor && state.admin.constructor.tabList) || [],
    tabs: (state.admin.constructor && state.admin.constructor.tabs) || null,
    session: state.auth.sessionToken
});

const mapDispatchToProps = {
    getPage: getPage.started,
    loadTabList,
    removeTabList
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorTabbed);