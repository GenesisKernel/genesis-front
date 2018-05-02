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

const Tab = styled.div`
    overflow-y: auto;
`;

export interface ITabViewProps {
    tabs: string[];
    children: JSX.Element[];
    className?: string;
    tabsClassName?: string;
    wrapperClassName?: string;
    paneClassName?: string;
}

interface ITabViewState {
    tabIndex: number;
}

export default class TabView extends React.Component<ITabViewProps, ITabViewState> {
    constructor(props: ITabViewProps) {
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

    render() {
        return (
            <Tab className={`${this.props.wrapperClassName || ''}`}>
                <ul className={`nav nav-tabs ${this.props.tabsClassName || ''}`}>
                    {this.props.tabs.map((tab, index) => (
                        <li key={index} className={`uib-tab ${index === this.state.tabIndex ? 'active' : ''}`}>
                            <a href="javascript:void(0)" onClick={this.onTabSwitch.bind(this, index)}>{tab}</a>
                        </li>
                    ))}
                </ul>
                <div className={`tab-content ${this.props.className || ''}`}>
                    {this.props.children.map((element, index) => (
                        <div key={index} className={`tab-pane ${this.props.paneClassName || ''} ${this.state.tabIndex === index ? 'active' : ''}`}>
                            {element}
                        </div>
                    ))}
                </div>
            </Tab>
        );
    }
}