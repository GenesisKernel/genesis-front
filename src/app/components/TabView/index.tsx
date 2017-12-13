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

export interface ITabViewProps {
    tabs: string[];
    children: JSX.Element[];
    className?: string;
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
            <div>
                <ul className="nav nav-tabs">
                    {this.props.tabs.map((tab, index) => (
                        <li key={index} className={`uib-tab ${index === this.state.tabIndex ? 'active' : ''}`}>
                            <a href="javascript:void(0)" onClick={this.onTabSwitch.bind(this, index)}>{tab}</a>
                        </li>
                    ))}
                </ul>
                <div className={`tab-content ${this.props.className || ''}`}>
                    {this.props.children.map((element, index) => (
                        <div key={index} className={`tab-pane ${this.state.tabIndex === index ? 'active' : ''}`}>
                            {element}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}