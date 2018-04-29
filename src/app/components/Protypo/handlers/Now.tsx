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

import React from 'react';
import moment from 'moment';

const parseInterval = (interval: string) => {
    const matches = /([-+])([0-9]+) ([a-z]+)/.exec(interval);
    if (matches && matches.length) {
        const value = parseInt(matches[2], 10);
        const op = '-' === matches[1] ? 'sub' : 'add';
        return {
            op,
            value,
            type: matches[3]
        };
    }
    else {
        return {
            op: 'add',
            value: 0,
            type: 'days'
        };
    }
};

export interface INowProps {
    format?: string;
    interval?: string;
}

const Now: React.SFC<INowProps> = (props) => {
    if (!props.format) {
        return (
            <span>
                {Math.round(Date.now() / 1000).toString()}
            </span>
        );
    }
    else {
        const interval = parseInterval(props.format);
        const now = moment();
        switch (interval.op) {
            case 'add': now.add(interval.value, interval.type as any); break;
            case 'sub': now.subtract(interval.value, interval.type as any); break;
            default: break;
        }

        return (
            <span>
                {now.format(props.format === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : props.format)}
            </span>
        );
    }
};

export default Now;