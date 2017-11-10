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

export interface IDivProps {
    'className'?: string;
    'class'?: string;
}

interface IDivState {
    children: any;
    _onPaste_StripFormatting_IEPaste: boolean;
}

/*
const Div: React.SFC<IDivProps> = (props) => {

    let _onPaste_StripFormatting_IEPaste = false;

    // const OnPaste_StripFormatting = (elem:any, e:any) => {
    //
    //     if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
    //         e.preventDefault();
    //         var text = e.originalEvent.clipboardData.getData('text/plain');
    //         window.document.execCommand('insertText', false, text);
    //     }
    //     else if (e.clipboardData && e.clipboardData.getData) {
    //         e.preventDefault();
    //         var text = e.clipboardData.getData('text/plain');
    //         window.document.execCommand('insertText', false, text);
    //     }
    //     else if (window.clipboardData && window.clipboardData.getData) {
    //         // Stop stack overflow
    //         if (!_onPaste_StripFormatting_IEPaste) {
    //             _onPaste_StripFormatting_IEPaste = true;
    //             e.preventDefault();
    //             window.document.execCommand('ms-pasteTextOnly', false);
    //         }
    //         _onPaste_StripFormatting_IEPaste = false;
    //     }
    // };
    //
    // const onPaste = (e) => {
    //     return OnPaste_StripFormatting(this, e);
    // };

    const onPaste = (e) => {
        return false;
    };

    return (
        <div className={[props.class, props.className].join(' ')} contentEditable={true}
         onPaste={onPaste}>{props.children}</div>
    );
}
*/

class Div extends React.Component<IDivProps, IDivState> {

    constructor(props: IDivProps) {
        super(props);
        this.state = {
            children: this.props.children,
            _onPaste_StripFormatting_IEPaste: false
        };
    }

    componentWillMount() {
        //alert(window);

    }

    onPaste(e:any) {
        //alert(this.props.children);
        //return "a";
        return "pasted" + (this.OnPaste_StripFormatting(this, e) ? '' : '');
    }

    OnPaste_StripFormatting(elem:any, e:any) {
        if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
            e.preventDefault();
            var text = e.originalEvent.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        }
        else if (e.clipboardData && e.clipboardData.getData) {
            e.preventDefault();
            var text = e.clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        }
        else if (window["clipboardData"] && window["clipboardData"].getData) {
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
    };

    render() {
        return (
            <div className={[this.props.class, this.props.className].join(' ')} contentEditable={true} onPaste={this.onPaste.bind(this)}
                 >{this.state.children}</div>
        );
    }
}

export default StyledComponent(Div);