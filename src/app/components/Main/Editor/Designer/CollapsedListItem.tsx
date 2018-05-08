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
import * as classnames from 'classnames';

interface ICollapsedListItemProps {
    text: string;
    icon?: string;
}

interface ICollapsedListItemState {
    collapsed: boolean;
}

export default class CollapsedListItem extends React.Component<ICollapsedListItemProps, ICollapsedListItemState> {

    constructor(props: ICollapsedListItemProps) {
        super(props);
        this.state = {
            collapsed: true
        };
    }
    render() {
        const classes = classnames({
            collapsed: this.state.collapsed
        });

        return (
            <li className={classes}>
                <div onClick={this.toggleCollapsed.bind(this)}>
                    <img src={this.props.icon} />
                    {this.props.text}
                </div>
                {this.props.children}
            </li>
        );
    }
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
}