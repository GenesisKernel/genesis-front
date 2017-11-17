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
import styled from 'styled-components';

const TabItems = styled.div`
    background-color: #707c91;
`;

const TabsContainer = styled.div`
    .tab-pane {
        display: none; 
    }
    
    .tab-pane.active {
        display: block; 
    }
`;

const TabItem = styled.div`
    display: inline-block;
    color: #FFF;
    line-height: 26px;
    
    background-color: #465669;
    opacity: 0.7;
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
`;

export interface IConstructorTabsProps {
    tabs: { id: string, type: string, name?: string, visible?: boolean }[];
    children: JSX.Element[];
    onTabClose?: any;
    className?: string;
}

interface IConstructorTabsState {
    tabIndex: number;
}

export default class ConstructorTabs extends React.Component<IConstructorTabsProps, IConstructorTabsState> {
    constructor(props: IConstructorTabsProps) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    onTabSwitch(tabIndex: number) {
        this.setState({
            tabIndex
        });
    }

    onTabClose(id: string, type: string) {
        // if closed tab was active, set first tab active

        if (this.props.tabs) {
            let closedTabItemIndex = this.props.tabs.findIndex((tabItem: any) => tabItem.id === id);
            if (closedTabItemIndex === this.state.tabIndex) {
                let switchToTabIndex = this.props.tabs.findIndex((tabItem: any, index: number) =>
                    tabItem.visible !== false && index !== closedTabItemIndex
                );
                if (switchToTabIndex !== -1) {
                    this.setState({
                        tabIndex: switchToTabIndex
                    });
                }
            }
        }

        let openedTabs = this.props.tabs.filter((tabItem: any, index: number) =>
            tabItem.visible !== false
        ).length;

        if (this.props.onTabClose && openedTabs > 1) {
            this.props.onTabClose(id, type);
        }
    }

    render() {
        return (
            <TabsContainer>
                <TabItems>
                    {this.props.tabs.map((tab, index) => (
                        <TabItem key={index} className={`${index === this.state.tabIndex ? 'active' : ''} ${tab.visible === false ? 'hidden' : ''}`}>
                            <span onClick={this.onTabSwitch.bind(this, index)}>{tab.name}</span>
                            <a href="javascript:void(0)" onClick={this.onTabClose.bind(this, tab.id, tab.type)}>&times;</a>
                        </TabItem>
                    ))}
                </TabItems>
                <div className={`${this.props.className || ''}`}>
                    {this.props.children.map((element, index) => (
                        <div key={index} className={`tab-pane ${this.state.tabIndex === index ? 'active' : ''}`}>
                            {element}
                        </div>
                    ))}
                </div>
            </TabsContainer>
        );
    }
}