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
import styled from 'styled-components';

const TabItems = styled.div`
    background-color: #707c91;
    background-color: rgba(0, 0, 0, 0.1);
`;

const TabsContainer = styled.div`
    display: flex;
    flex: 1 1;
    -ms-flex-direction: column;
    flex-direction: column;

    .tab-pane {
        display: none; 
        flex: 1 1;
        -ms-flex-direction: column;
        flex-direction: column;
    }
    
    .tab-pane.active {
        display: flex; 
    }
`;

const TabContent = styled.div`
    display: flex;
    flex: 1 1;
    flex-direction: column;
`;

const TabItem = styled.div`
    display: inline-block;
    color: #FFF;
    line-height: 26px;
    
    background-color: #465669;
    opacity: 0.5;
    cursor: pointer;
    
    margin-right: 1px;
    
    span {
        padding-left: 10px;
        padding-right: 10px;
    }
    
    a {
        color: #FFF;
        padding-left: 5px;
        padding-right: 10px;
        text-decoration: none;
        font-size: 16px;
    }
    
    a:hover {
        color: #FF5555;
    }
    
    &:hover {
        opacity: 0.8;
    }
    
    &.active {        
        opacity: 1;
    }
    
    &.interfacePage {
        background-color: #883498;
    }
    
    &.interfaceBlock {
        background-color: #349837;
    }
    
    &.interfaceMenu {
        background-color: #985f34;
    }
    
    &.contract {
        background-color: #346198;
    }
    
    &.parameter {
        background-color: #333333;
    }
`;

export interface IConstructorTabsProps {
    tabList: { id: string, type: string, name?: string, vde?: boolean, visible?: boolean }[];
    children: JSX.Element[];
    openedTab: { id: string, type: string, vde: boolean };
    onTabClose?: any;
    className?: string;
}

interface IConstructorTabsState {
    tabIndex: number;
    loaded: boolean;
}

export default class ConstructorTabs extends React.Component<IConstructorTabsProps, IConstructorTabsState> {
    constructor(props: IConstructorTabsProps) {
        super(props);
        this.state = {
            tabIndex: 0,
            loaded: false
        };
    }

    onTabSwitch(tabIndex: number) {
        this.setState({
            tabIndex,
            loaded: true
        });
    }

    componentWillReceiveProps(props: IConstructorTabsProps) {
        // open selected tab
        if (props.tabList && !this.state.loaded) {
            let tabIndex = props.tabList.findIndex((item: any) => item.id === props.openedTab.id && item.type === props.openedTab.type && !!item.vde === !!props.openedTab.vde);
            if (tabIndex >= 0 && this.state.tabIndex < tabIndex) {
                this.setState({
                    tabIndex,
                    loaded: false
                });
            }
        }
    }

    onTabClose(id: string, type: string, vde: boolean) {
        // if closed tab was active, set first tab active

        if (this.props.tabList) {
            let closedTabItemIndex = this.props.tabList.findIndex((tabItem: any) => tabItem.id === id && tabItem.type === type && !!tabItem.vde === !!vde);
            if (closedTabItemIndex === this.state.tabIndex) {
                let switchToTabIndex = this.props.tabList.findIndex((tabItem: any, index: number) =>
                    tabItem.visible !== false && index !== closedTabItemIndex
                );
                if (switchToTabIndex !== -1) {
                    this.setState({
                        tabIndex: switchToTabIndex,
                        loaded: true
                    });
                }
            }
        }

        let openedTabs = this.props.tabList.filter((tabItem: any, index: number) =>
            tabItem.visible !== false
        ).length;

        if (this.props.onTabClose && openedTabs > 1) {
            this.props.onTabClose(id, type, vde);
        }
    }

    render() {
        return (
            <TabsContainer>
                <TabItems>
                    {this.props.tabList && this.props.tabList.map((tab, index) => (
                        <TabItem key={index} className={`${index === this.state.tabIndex ? 'active' : ''} ${tab.visible === false ? 'hidden' : ''} ${tab.type}`}>
                            <span onClick={this.onTabSwitch.bind(this, index)}>{(tab.vde ? 'VDE: ' : '') + tab.name}</span>
                            <a href="javascript:void(0)" onClick={this.onTabClose.bind(this, tab.id, tab.type, tab.vde)}>&times;</a>
                        </TabItem>
                    ))}
                </TabItems>
                <TabContent>
                    {this.props.children.map((element, index) => (
                        <div key={index} className={`tab-pane ${this.state.tabIndex === index ? 'active' : ''}`}>
                            {element}
                        </div>
                    ))}
                </TabContent>
            </TabsContainer>
        );
    }
}