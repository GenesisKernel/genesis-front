// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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