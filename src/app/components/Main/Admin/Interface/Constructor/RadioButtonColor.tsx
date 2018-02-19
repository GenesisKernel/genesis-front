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

interface IRadioButtonColorProps {
    src?: any;
    value: string;
    selectedValue?: string;
    onClick?: any;
}

interface IRadioButtonColorState {

}

const BulletColor = styled.div`
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    border: 1px solid #9aa7b3;
    margin-left: 1px;
    margin-right: 1px;
    cursor: pointer;
    
    &.basic {
        background-color: #DDD;
    }
    
    &.default {
        background-color: #FFF;
    }
    
    &.muted {
        background-color: #777;
    }
    
    &.primary {
        background-color: #337ab7;;
    }
    
    &.success {
        background-color: #3c763d;
    }
    
    &.info {
        background-color: #31708f;
    }
    
    &.warning {
        background-color: #8a6d3b;
    }
    
    &.danger {
        background-color: #a94442;
    }
    
    &.link {
        background-color: #23527c;
    }
    
    &.selected {
        border-color: #62b2fc;
    }
        
    &.selected:after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        margin-top: -5px;
        background-color: #FFF;
        border-radius: 5px;
        border: 1px solid #000;
    }
`;

export default class RadioButtonColor extends React.Component<IRadioButtonColorProps, IRadioButtonColorState> {

    constructor(props: IRadioButtonColorProps) {
        super(props);
    }

    render() {
        // alert(this.props.value + ' selected: ' + this.props.selectedValue);
        const classes = classnames({
            [this.props.value]: true,
            'selected': this.props.value === this.props.selectedValue
        });
        return (
            <BulletColor className={classes} onClick={this.props.onClick.bind(this, this.props.value)}>
                {this.props.children}
            </BulletColor>
        );
    }
}