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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export interface IPageSwitcherProps {
    className?: string;
    index: number;
    count: number;
    onChange: (index: number) => void;
}

const PageSwitcher: React.SFC<IPageSwitcherProps> = props => (
    <div className={props.className}>
        <div className="switcher-body">
            <div className="pull-right">
                <Button className="switcher-control" bsStyle="link" disabled={props.count - 1 <= props.index} onClick={props.onChange.bind(null, props.index + 1)}>
                    <span>
                        <FormattedMessage id="history.older" defaultMessage="Older" />
                    </span>
                    <em className="icon icon-arrow-right" />
                </Button>
            </div>
            <div className="pull-left">
                <Button className="switcher-control" bsStyle="link" disabled={0 >= props.index} onClick={props.onChange.bind(null, props.index - 1)}>
                    <em className="icon icon-arrow-left" />
                    <span>
                        <FormattedMessage id="history.newer" defaultMessage="Newer" />
                    </span>
                </Button>
            </div>
            <div className="switcher-text">
                {props.children}
            </div>
        </div>
        <div className="mt">
            <input type="range" min="1" max={props.count} value={props.index + 1} onChange={e => props.onChange(e.target.valueAsNumber - 1)} />
        </div>
    </div>
);

const StyledPageSwitcher = styled(PageSwitcher) ` 
    .switcher-body {
        height: 25px;
        text-align: center;

        .switcher-text {
            line-height: 25px;
        }
    }

    .switcher-control {
        margin: 0;
        padding: 0;
        text-decoration: none !important;

        .icon {
            font-size: 10px;
            margin: 10px;
        }
    }
`;

export default StyledPageSwitcher;