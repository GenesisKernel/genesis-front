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
import RadioButton from './RadioButton';

import imgItalic from 'images/constructor/group-15.svg';
import imgBold from 'images/constructor/group-16.svg';

interface IFormatButtonsProps {
    onClick?: any;
}

export default class FormatButtons extends React.Component<IFormatButtonsProps> {
    render() {
        return (
            <div>
                <RadioButton onClick={this.props.onClick.bind(this, 'bold')} value="bold" title="make selected text bold">
                    <img src={imgBold}/>
                </RadioButton>
                <RadioButton onClick={this.props.onClick.bind(this, 'italic')} value="bold" title="make selected text italic">
                    <img src={imgItalic}/>
                </RadioButton>
                <RadioButton onClick={this.props.onClick.bind(this, 'removeFormat')} value="removeFormat" title="remove formatting on selected text">
                    <span>&times;</span>
                </RadioButton>
            </div>
        );
    }
}