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
import { OnPasteStripFormatting } from 'lib/constructor';
import StyledComponent from './StyledComponent';

export interface IPProps {
    'className'?: string;
    'class'?: string;
    'children': any;
    'editable'?: boolean;
    'changePage'?: any;
    'selectTag'?: any;
    'selected'?: boolean;
    'tag'?: any;
}

class Span extends React.Component<IPProps> {

    onPaste(e: any) {
        OnPasteStripFormatting(this, e);
    }

    onFocus(e: any) {
        this.props.selectTag({ tag: this.props.tag });
    }

    onBlur(e: any) {
        this.props.changePage({ text: e.target.textContent, tagID: this.props.tag.id });
    }

    render() {
        if (this.props.editable) {
            return (
                <span
                    className={[this.props.class, this.props.className, this.props.selected ? 'editable' : ''].join(' ')}
                    contentEditable={true}
                    onPaste={this.onPaste.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                >
                    {this.props.children}
                </span>
            );
        }
        return (
            <span
                className={[this.props.class, this.props.className].join(' ')}
            >
                {this.props.children}
            </span>
        );

    }
}

export default StyledComponent(Span);