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
import * as propTypes from 'prop-types';

import Protypo from '../Protypo';
import api from 'lib/api';

export interface IBlobDataProps {
    link: string;
}

interface IBlobDataContext {
    protypo: Protypo;
}

const IBlobData: React.SFC<IBlobDataProps> = (props, context: IBlobDataContext) => (
    <a className="btn btn-link p0" href={api.resolveData(props.link)} target="_blank">
        {props.children}
    </a>
);

IBlobData.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default IBlobData;