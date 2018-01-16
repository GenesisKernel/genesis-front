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
import * as propTypes from 'prop-types';

import Protypo from '../Protypo';

export interface ILongTextProps {
    link: string;
}

interface ILongTextContext {
    protypo: Protypo;
}

const LongText: React.SFC<ILongTextProps> = (props, context: ILongTextContext) => {
    const onClick = () => {
        context.protypo.displayData(props.link);
    };

    return (
        <button className="btn btn-link p0" onClick={onClick}>
            {props.children}...
        </button>
    );
};

LongText.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default LongText;