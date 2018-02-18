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
import * as _ from 'lodash';
import SourceElement from './SourceElement';
import CollapsedListItem from './CollapsedListItem';

import imgGroup11 from 'images/constructor/group-11.svg';
import imgGroup12 from 'images/constructor/group-12.svg';
import imgGroup13 from 'images/constructor/group-13.svg';
import imgGroup34 from 'images/constructor/group-34.svg';
import imgGroup35 from 'images/constructor/group-35.svg';

interface ISourceElementsProps {
    search?: boolean;
}

interface ISourceElementsState {
    searchText: string;
}

interface IItem {
    text: string;
    element?: string;
    template?: string;
}

class SourceElements extends React.Component<ISourceElementsProps, ISourceElementsState> {
    private groups: {
        text: string,
        icon: string,
        items: IItem []
    }[];
    constructor(props: ISourceElementsProps) {
        super(props);
        this.state = {
            searchText: ''
        };

        this.groups = [
            {
                text: 'Structure',
                icon: imgGroup11,
                items: [
                    {
                        text: 'Form with header',
                        template: 'formWithHeader'
                    },
                    {
                        text: 'Table with header',
                        template: 'tableWithHeader'
                    },
                    {
                        text: 'Search form',
                        template: 'searchForm'
                    },
                    {
                        text: 'Radio panel',
                        template: 'radioPanel'
                    },
                    {
                        text: 'Div',
                        element: 'div'
                    }
                ]
            },
            {
                text: 'Text',
                icon: imgGroup12,
                items: [
                    {
                        text: 'Paragraph',
                        element: 'p'
                    },
                    {
                        text: 'Span',
                        element: 'span'
                    },
                    {
                        text: 'Strong',
                        element: 'strong'
                    },
                    {
                        text: 'Emphasize',
                        element: 'em'
                    }
                ]
            },
            {
                text: 'Forms',
                icon: imgGroup34,
                items: [
                    {
                        text: 'Form',
                        element: 'form'
                    },
                    {
                        text: 'Input',
                        element: 'input'
                    },
                    {
                        text: 'RadioGroup',
                        element: 'radiogroup'
                    },
                    {
                        text: 'Label',
                        element: 'label'
                    },
                    {
                        text: 'Button',
                        element: 'button'
                    },
                    {
                        text: 'Image input',
                        element: 'imageinput'
                    }
                ]
            },
            {
                text: 'Image',
                icon: imgGroup35,
                items: [
                    {
                        text: 'Picture',
                        element: 'image'
                    }
                ]
            },
            {
                text: 'Tables',
                icon: imgGroup13,
                items: [
                    {
                        text: 'Table',
                        element: 'table'
                    }
                ]
            }
        ];
    }
    onSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchText: e.target.value
        });
    }
    render() {
        if (this.props.search) {
            let items: IItem [] = [];

            for (const group of this.groups) {
                items = items.concat(group.items);
            }

            items = _.sortBy(items, ['text']);

            if (this.state.searchText !== '') {
                items = _.filter(items, item => new RegExp('^' + this.state.searchText + '| ' + this.state.searchText, 'ig').test(item.text));
            }

            return (
                <div>
                    <form className="form-horizontal b-panel-light">
                        <input type="text" className="form-control input-sm " placeholder="Search..." value={this.state.searchText} onChange={this.onSearchTextChange.bind(this)}/>
                    </form>
                    <ul className="b-category-sublist">
                        { items.map(item =>
                            item.element ?
                                (<SourceElement text={item.text} element={item.element} />)
                                :
                                (<SourceElement text={item.text} template={item.template} />)
                        ) }
                    </ul>
                </div>

            );
        }

        return (
            <ul className="b-category-list">
                { this.groups.map(group => (
                        <CollapsedListItem text={group.text} icon={group.icon}>
                            <ul className="b-category-sublist">
                            { group.items.map(item =>
                                item.element ?
                                    (<SourceElement text={item.text} element={item.element} />)
                                    :
                                    (<SourceElement text={item.text} template={item.template} />)
                            ) }
                            </ul>
                        </CollapsedListItem>
                    )
                )}
            </ul>
        );

        // <CollapsedListItem text="Lists" icon={imgGroup37}>
        // <ul className="b-category-sublist">
        // <li>Ordered</li>
        // <li>Unordered</li>
        // </ul>
        // </CollapsedListItem>
        // < CollapsedListItem text="Containers" icon={imgGroup36}>
        // <ul className="b-category-sublist">
        // <li>Wrapper</li>
        // <li>Block</li>
        // </ul>
        // </CollapsedListItem>
        //
        // <CollapsedListItem text="Navigation" icon={imgStroke75}>
        // <ul className="b-category-sublist">
        // <li>Breadcrumps</li>
        // <li>Link</li>
        // </ul>
        // </CollapsedListItem>
    }
}

export default SourceElements;