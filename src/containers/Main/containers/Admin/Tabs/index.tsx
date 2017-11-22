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
import Tabs from 'components/Tabs';
import { loadTabList, removeTabList } from 'modules/admin/actions';
// import ContractTabbed from 'containers/Main/containers/Admin/Contracts/EditTabbed.tsx';

interface ITabsContainerProps {
    tabData: any;
    tabList: { id: string, type: string, name?: string, visible?: boolean }[];
    loadTabList: typeof loadTabList;
    removeTabList: typeof removeTabList;
}

class TabsContainer extends React.Component<ITabsContainerProps & { match: { params: { type: string, id: string, name: string } } }> {
    componentWillMount() {
        let addTab = {};
        if (this.props.match.params.type && this.props.match.params.id) {
            addTab = {
                addID: this.props.match.params.id,
                addName: this.props.match.params.name,
                addType: this.props.match.params.type
            };
        }
        this.props.loadTabList(addTab);
    }

    onTabClose(id: string, type: string) {
        // alert('close ' + index);
        this.props.removeTabList({ id: id, type: type });
    }

    renderTabsContent() {
        let tabsContent: JSX.Element[] = [];
        if (this.props.tabList.length) {
            for (let tabListItem of this.props.tabList) {
                // switch components depending on tabListItem.type: page, contract, etc
                if (tabListItem.type === 'interfacePage') {
                    // tabs.push(
                    //    <InterfaceConstructor pageID={tabListItem.id} key={tabListItem.type + tabListItem.id}/>
                    //);
                    tabsContent.push(<div>interfacePage</div>);
                }
                if (tabListItem.type === 'contract') {
                    // tabs.push(
                    //     <ContractTabbed contractID={tabListItem.id} key={tabListItem.type + tabListItem.id} {...this.props}/>
                    // );
                    tabsContent.push(<div>contract!</div>);
                }
            }

        }
        return tabsContent;
    }

    render() {
        let tabTitles = [];

        if (this.props.tabList.length) {
            for (let tabListItem of this.props.tabList) {
                if (this.props.tabData && this.props.tabData[tabListItem.type + tabListItem.id]) {
                    tabTitles.push({
                        id: tabListItem.id,
                        type: tabListItem.type,
                        name: this.props.tabData[tabListItem.type + tabListItem.id].data.name || tabListItem.name || 'no name',
                        visible: tabListItem.visible
                    });
                }
                else {
                     tabTitles.push({
                         id: tabListItem.id,
                         type: tabListItem.type,
                         name: tabListItem.type + ' ID ' + tabListItem.id,
                         visible: tabListItem.visible
                     });
                }
            }
        }

        let openedTab = { id: '', type: '' };
        if (this.props.match.params.id && this.props.match.params.type) {
            openedTab.id = this.props.match.params.id;
            openedTab.type = this.props.match.params.type;
        }

        return (
            <Tabs
                tabList={tabTitles}
                openedTab={openedTab}
                onTabClose={this.onTabClose.bind(this)}
            >
                {this.renderTabsContent()}
            </Tabs>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabList: (state.admin.tabs && state.admin.tabs.list) || [],
    tabData: (state.admin.tabs && state.admin.tabs.data) || null,
});

const mapDispatchToProps = {
    loadTabList,
    removeTabList
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
