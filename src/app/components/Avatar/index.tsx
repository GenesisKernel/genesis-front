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