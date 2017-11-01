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

import Protypo from './';

export interface IDataProps {
    source: string;
    columns: string[];
    data: string[][];
}

interface IDataContext {
    protypo: Protypo;
}

const Data: React.SFC<IDataProps> = (props, context: IDataContext) => {
    context.protypo.registerSource(props.source, {
        columns: props.columns,
        data: props.data
    });
    return null;
};

Data.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default Data;