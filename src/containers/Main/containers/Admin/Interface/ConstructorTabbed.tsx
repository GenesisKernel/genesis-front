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
import { getPage, getContract } from 'modules/admin/actions';

// import Constructor, { IConstructorProps } from 'components/Main/Admin/Interface/Constructor';
import InterfaceConstructor from 'containers/Main/containers/Admin/Interface/Constructor';
import ContractConstructor from 'containers/Main/containers/Admin/Contracts/Constructor';
import ConstructorTabs from 'components/ConstructorTabs';
import { loadTabList, removeTabList } from 'modules/admin/actions';

export interface IConstructorTabbedProps {
    pageID?: string;
    pageName?: string;
    contractID?: string;
    contractName?: string;
    page?: any;
    tabs: any;
    tabList: { id: string, type: string, name?: string, visible?: boolean }[];
    // template: string;
    treeCode?: any;
    session: string;
    loadTabList: typeof loadTabList;
    removeTabList: typeof removeTabList;
}

class ConstructorTabbed extends React.Component<IConstructorTabbedProps & {
    getPage: typeof getPage.started,
    getContract: typeof getContract.started,
    match?: {
        params: {
            pageID?: string, pageName?: string,
            contractID?: string, contractName?: string
        }
    } }> {
    componentWillMount() {
        if (this.props.match.params.pageID) {
            this.props.loadTabList({addID: this.props.match.params.pageID, addName: this.props.match.params.pageName, addType: 'page'});
        }
        if (this.props.match.params.contractID) {
            this.props.loadTabList({addID: this.props.match.params.contractID, addName: this.props.match.params.contractName, addType: 'contract'});
        }
    }

    onTabClose(id: string, type: string) {
        // alert('close ' + index);
        this.props.removeTabList({ id: id, type: type });
    }

    renderTabsContent() {
        let tabs: JSX.Element[] = [];
        if (this.props.tabList.length) {
            for (let tabListItem of this.props.tabList) {
                // todo switch components depending on tabListItem.type: page, contract, etc
                if (tabListItem.type === 'page') {
                    tabs.push(
                        <InterfaceConstructor pageID={tabListItem.id} key={tabListItem.type + tabListItem.id}/>
                    );
                }
                if (tabListItem.type === 'contract') {
                    tabs.push(
                        <ContractConstructor contractID={tabListItem.id} key={tabListItem.type + tabListItem.id} {...this.props}/>
                    );
                }
            }
        }
        return tabs;
    }

    render() {
        let tabTitles = [];

        if (this.props.tabList.length) {
            // alert(JSON.stringify(this.props.tabs));
            for (let tabListItem of this.props.tabList) {
                if (this.props.tabs && this.props.tabs[tabListItem.type + tabListItem.id]) {
                    tabTitles.push({
                        id: tabListItem.id,
                        type: tabListItem.type,
                        name: this.props.tabs[tabListItem.type + tabListItem.id].data.name || tabListItem.name || 'no name',
                        visible: tabListItem.visible
                    });
                }
                // else {
                //      tabTitles.push({
                //          id: tabListItem.id,
                //          type: tabListItem.type,
                //          name: 'ID ' + tabListItem.id,
                //          visible: tabListItem.visible
                //      });
                // }
            }
        }

        let openedTab = { id: '', type: '' };
        if (this.props.match.params.pageID) {
            openedTab.id = this.props.match.params.pageID;
            openedTab.type = 'page';
        }
        if (this.props.match.params.contractID) {
            openedTab.id = this.props.match.params.contractID;
            openedTab.type = 'contract';
        }

        return (
            <ConstructorTabs
                tabs={tabTitles}
                openedTab={openedTab}
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
    getContract: getContract.started,
    loadTabList,
    removeTabList
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorTabbed);