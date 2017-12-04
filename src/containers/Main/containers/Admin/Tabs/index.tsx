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
import { getTabList, removeTabList } from 'modules/admin/actions';
import styled from 'styled-components';
import ContractEditTabbed from 'containers/Main/containers/Admin/Contracts/EditTabbed';
import ParameterEditTabbed from 'containers/Main/containers/Admin/Parameters/EditTabbed';
import InterfacePageEditTabbed from 'containers/Main/containers/Admin/Interface/EditPageTabbed';
import InterfaceBlockEditTabbed from 'containers/Main/containers/Admin/Interface/EditBlockTabbed';
import InterfaceMenuEditTabbed from 'containers/Main/containers/Admin/Interface/EditMenuTabbed';
import InterfaceConstructorTabbed from 'containers/Main/containers/Admin/Interface/ConstructorTabbed';

const Title = styled.div`
    padding-left: 20px;
    line-height: 30px;
    font-weight: bold;
    color: #777;
`;

interface ITabsContainerProps {
    tabData: any;
    tabList: { id: string, type: string, name?: string, visible?: boolean }[];
    getTabList: typeof getTabList.started;
    removeTabList: typeof removeTabList.started;
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
        // this.props.loadTabList(addTab);
        this.props.getTabList(addTab);
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
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}>
                            <Title>Interface Page</Title>
                            <InterfacePageEditTabbed pageID={tabListItem.id}/>
                        </div>
                    );
                }
                else
                if (tabListItem.type === 'interfaceBlock') {
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}>
                            <Title>Interface Block</Title>
                            <InterfaceBlockEditTabbed blockID={tabListItem.id}/>
                        </div>
                    );
                }
                else
                if (tabListItem.type === 'interfaceMenu') {
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}>
                            <Title>Interface Menu</Title>
                            <InterfaceMenuEditTabbed menuID={tabListItem.id}/>
                        </div>
                    );
                }
                else
                if (tabListItem.type === 'interfaceConstructor') {
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}>
                            <Title>Interface Constructor</Title>
                            <InterfaceConstructorTabbed pageID={tabListItem.id} pageName={tabListItem.name}/>
                        </div>
                    );
                }
                else
                if (tabListItem.type === 'contract') {
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}>
                            <Title>Smart Contract</Title>
                            <ContractEditTabbed contractID={tabListItem.id}/>
                        </div>
                    );
                }
                else
                if (tabListItem.type === 'parameter') {
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}>
                            <Title>Ecosystem Parameter</Title>
                            <ParameterEditTabbed parameterName={tabListItem.id}/>
                        </div>
                    );
                }
                else {
                    tabsContent.push(
                        <div key={tabListItem.type + tabListItem.id}/>
                    );
                }
            }

        }
        return tabsContent;
    }

    render() {
        let tabTitles = [];

        if (this.props.tabList.length) {
            for (let tabListItem of this.props.tabList) {
                tabTitles.push({
                    id: tabListItem.id,
                    type: tabListItem.type,
                    name: tabListItem.name || tabListItem.id,
                    visible: tabListItem.visible
                });
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
    getTabList: getTabList.started,
    removeTabList: removeTabList.started
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);