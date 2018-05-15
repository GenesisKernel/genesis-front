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

import { TProtypoElement } from 'genesis/protypo';
import constructorModule from 'lib/constructor';
import Tag from './Tag';

class RadioGroup extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'RadioGroup';
        this.canHaveChildren = false;
        this.attr = {
            'name': 'Name',
            'source': 'Source',
            'namecolumn': 'NameColumn',
            'valuecolumn': 'ValueColumn',
            'value': 'Value',
            'class': 'Class'
        };
        this.editProps = ['class', 'name', 'source', 'namecolumn', 'valuecolumn', 'value'];
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: (constructorModule.IdGenerator.Instance).generateId(),
            attr: {
                name: 'name'
            }
        };
    }
}

export default RadioGroup;