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
import StyledComponent from 'components/Protypo/handlers/StyledComponent';
import DnDComponent from './DnDComponent';
import EditableBlock from './EditableBlock';

class Table extends EditableBlock {
    protected editableDisplay = 'block';
    protected editable = false;
    getClasses() {
        return classnames({
            'table': true,
            [this.props.className]: true,
            'b-selected': this.props.selected
        });
    }

    renderChildren(classes: string) {
        return (
            <table
                className={classes}
            >
                <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                </tbody>
            </table>
        );
    }

    renderRow(row: number) {
        return (
            <tr>
                <td>
                    Row {row}
                </td>
                <td>
                    Value 1
                </td>
                <td>
                    Value 2
                </td>
            </tr>
        );
    }
}

export default DnDComponent(StyledComponent(Table));