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
import themed from 'components/Theme/themed';
import Tooltip from 'components/Tooltip';

export interface IHintProps {
    'icon'?: string;
    'title'?: string;
    'text'?: string;
}

export const HintWrapper = themed.div`
    display: inline-block;
    width: 40px;
    line-height: 40px;
    text-align: center;
    
    .tool-body {
        min-width: 40px;
        height: 40px;
        padding: 0 12px;
        font-weight: 300;

        em.tool-icon {
            color: ${props => props.theme.toolbarIconColor};
            transition: color .15s;
            vertical-align: middle;
            height: 18px;
            display: inline-block;
        }

        > span.button-label {
            margin-left: 8px;
            color: ${props => props.theme.toolbarForeground};
        }

        &:hover {
            em.tool-icon {
                color: ${props => props.theme.toolbarIconHighlight};
            }
        }
    }
`;

class Hint extends React.Component<IHintProps> {
    render() {
        return (
            <HintWrapper>
                <Tooltip title={this.props.title} body={this.props.text}>
                    <div className="tool-body">
                        <em className={`tool-icon ${this.props.icon || 'icon-question'}`} />
                        {this.props.children && (<span className="button-label">{this.props.children}</span>)}
                    </div>
                </Tooltip>
            </HintWrapper>
        );
    }
}

export default Hint;
