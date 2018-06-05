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
import styled from 'styled-components';
import imgAvatar from './avatar.svg';

export interface IAvatarProps {
    className?: string;
    url: string;
    size?: number;
}

interface IAvatarState {
    error: boolean;
}

class Avatar extends React.Component<IAvatarProps, IAvatarState> {
    constructor(props: IAvatarProps) {
        super(props);
        this.state = {
            error: false
        };
    }

    onError = () => {
        this.setState({
            error: true
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <img
                    className="avatar__image"
                    src={this.state.error ? imgAvatar : this.props.url}
                    onError={this.onError}
                />
            </div>
        );
    }
}

export default styled(Avatar) `
    display: inline-block;
    vertical-align: top;
    width: ${props => props.size ? props.size + 'px' : 'auto'};
    height: ${props => props.size ? props.size + 'px' : 'auto'};

    .avatar__image {
        max-width: ${props => props.size ? props.size + 'px' : 'none'};
        max-height: ${props => props.size ? props.size + 'px' : 'none'};
    }
`;