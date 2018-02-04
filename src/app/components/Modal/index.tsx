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
import ModalContainer from 'containers/Modal';

export interface IModalProps<P, R> {
    active: boolean;
    params: P;
    onResult: (data: R) => void;
    onCancel: () => void;
}

export type TModalComponentClass<P, R> =
    React.ComponentType<IModalProps<P, R>> |
    React.SFC<IModalProps<P, R>>;

function createModal<P, R>(type: string, component: TModalComponentClass<P, R>): React.SFC<IModalProps<P, R>> {
    return (props: IModalProps<P, R>) => (
        <ModalContainer
            {...props}
            type={type}
            component={component} 
        />
    );
}

export default createModal;