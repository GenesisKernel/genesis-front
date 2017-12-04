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

import StyledComponent from './StyledComponent';

export interface IPProps {
    'className'?: string;
    'class'?: string;
    'children': any;
    'editable'?: boolean;
    'changePage'?: any;
    'selectTag'?: any;
    'tagID'?: string;
}

interface IPState {
    focused: boolean;
    _onPaste_StripFormatting_IEPaste: boolean;
}

class P extends React.Component<IPProps, IPState> {

    constructor(props: IPProps) {
        super(props);
        this.state = {
            focused: false,
            _onPaste_StripFormatting_IEPaste: false
        };
    }

    onPaste(e: any) {
        this.OnPaste_StripFormatting(this, e);
    }

    onFocus(e: any) {
        this.setState(Object.assign(this.state, {
            focused: true
        }));
        this.props.selectTag({ tagID: this.props.tagID });
    }

    onBlur(e: any) {
        this.setState(Object.assign(this.state, {
            focused: false
        }));

        // alert(e.target.textContent);
        // alert(e.target.innerHTML);
        // alert(e.target.innerText);
        this.props.changePage({ text: e.target.textContent, tagID: this.props.tagID });
    }

    onChange(e: any) {
        // alert('onChange');
    }

    OnPaste_StripFormatting(elem: any, e: any) {
        let text: string;
        if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
            e.preventDefault();
            text = e.originalEvent.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        }
        else if (e.clipboardData && e.clipboardData.getData) {
            e.preventDefault();
            text = e.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        }
        else if (window['clipboardData'] && window['clipboardData'].getData) {
            // Stop stack overflow
            if (!this.state._onPaste_StripFormatting_IEPaste) {
                this.setState(Object.assign(this.state, {
                    _onPaste_StripFormatting_IEPaste: true,
                }));
                e.preventDefault();
                window.document.execCommand('ms-pasteTextOnly', false);
            }
            this.setState(Object.assign(this.state, {
                _onPaste_StripFormatting_IEPaste: false,
            }));
        }
    }

    render() {
        if (this.props.editable) {
            return (
                <p
                    className={[this.props.class, this.props.className, this.state.focused ? 'editable' : ''].join(' ')}
                    contentEditable={true}
                    onPaste={this.onPaste.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)}
                >
                    {this.props.children}
                </p>
            );
        }
        return (
            <p
                className={[this.props.class, this.props.className].join(' ')}
            >
                {this.props.children}
            </p>
        );

    }
}

export default StyledComponent(P);