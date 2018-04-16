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
import * as classnames from 'classnames';
import styled from 'styled-components';

interface IRadioButtonProps {
    src?: any;
    value: string;
    selectedValue?: string;
    onClick?: any;

}

interface IRadioButtonState {

}

const Wrapper = styled.div`
    display: inline-block;
    
    .b-bullet {
        display: inline-block;
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid #9aa7b3;
        margin-left: 1px;
        margin-right: 1px;
        cursor: pointer;
    }
    
    .b-bullet_selected {
        border-color: #62b2fc;
        background-color: #62b2fc;
    }
    
    .b-bullet>img {
        display: block;
        width: 100%;
        height: 100%;
        padding: 2px;
        box-sizing: border-box;
    }
`;

export default class RadioButton extends React.Component<IRadioButtonProps, IRadioButtonState> {

    constructor(props: IRadioButtonProps) {
        super(props);
    }

    render() {
        const classes = classnames({
            'b-bullet': true,
            'b-bullet_selected': this.props.value === this.props.selectedValue
        });
        return (
            <Wrapper>
                <div className={classes} onClick={this.props.onClick.bind(this, this.props.value)}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}