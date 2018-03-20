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
import { ReactNode } from 'react';

export interface IModalProps<P, R> {
    params: P;
    onResult: (data: R) => void;
    onCancel: () => void;
    children: ReactNode[];
}

export type TModalComponentClass<P, R> =
    React.ComponentType<IModalProps<P, R>> |
    React.SFC<IModalProps<P, R>>;

const StyledHeader = styled.div`
    background: #4b7dbd;
    color: #fff;
    margin: -1px -1px 0 -1px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
`;

const StyledBody = styled.div`
    padding: 15px;
    min-width: 300px;
`;

const StyledFooter = styled.div`
    padding: 15px;
    background: #efefef;
    border-top: solid 1px #d0dff3;
`;

export default abstract class Modal<P, R, S = {}> extends React.Component<IModalProps<P, R>, S> {
    public static Header = StyledHeader;
    public static Body = StyledBody;
    public static Footer = StyledFooter;
}