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
import SourceElement from './SourceElement';
import CollapsedListItem from './CollapsedListItem';

import imgGroup11 from 'images/constructor/group-11.svg';
import imgGroup12 from 'images/constructor/group-12.svg';
import imgGroup13 from 'images/constructor/group-13.svg';
import imgGroup34 from 'images/constructor/group-34.svg';
import imgGroup35 from 'images/constructor/group-35.svg';

interface ISourceElementsProps {}

interface ISourceElementsState {}

class SourceElements extends React.Component<ISourceElementsProps, ISourceElementsState> {
    render() {
        return (
            <ul className="b-category-list">
                <CollapsedListItem text="Structure" icon={imgGroup11}>
                    <ul className="b-category-sublist">
                        <SourceElement text="Panel" element="div" />
                        <SourceElement text="Block" element="div" />
                    </ul>
                </CollapsedListItem>
                <CollapsedListItem text="Text" icon={imgGroup12}>
                    <ul className="b-category-sublist">
                        <SourceElement text="Paragraph" element="p" />
                        <SourceElement text="Span" element="span" />
                        <SourceElement text="Strong" element="strong" />
                        <SourceElement text="Emphasize" element="em" />
                    </ul>
                </CollapsedListItem>
                {/*
                 <CollapsedListItem text="Lists" icon={imgGroup37}>
                 <ul className="b-category-sublist">
                 <li>Ordered</li>
                 <li>Unordered</li>
                 </ul>
                 </CollapsedListItem>
                 < CollapsedListItem text="Containers" icon={imgGroup36}>
                 <ul className="b-category-sublist">
                 <li>Wrapper</li>
                 <li>Block</li>
                 </ul>
                 </CollapsedListItem>
                 */}
                <CollapsedListItem text="Forms" icon={imgGroup34}>
                    <ul className="b-category-sublist">
                        <SourceElement text="Form" element="form" />
                        <SourceElement text="Input" element="input" />
                        <SourceElement text="Label" element="label" />
                        <SourceElement text="Button" element="button" />
                        <SourceElement text="Image input" element="imageinput" />
                    </ul>
                </CollapsedListItem>
                <CollapsedListItem text="Image" icon={imgGroup35}>
                    <ul className="b-category-sublist">
                        <SourceElement text="Picture" element="image" />
                    </ul>
                </CollapsedListItem>
                {/*<CollapsedListItem text="Navigation" icon={imgStroke75}>
                 <ul className="b-category-sublist">
                 <li>Breadcrumps</li>
                 <li>Link</li>
                 </ul>
                 </CollapsedListItem>*/}
                <CollapsedListItem text="Tables" icon={imgGroup13}>
                    <ul className="b-category-sublist">
                        <SourceElement text="Table" element="table" />
                    </ul>
                </CollapsedListItem>
                <li />
            </ul>
        );
    }
}

export default SourceElements;