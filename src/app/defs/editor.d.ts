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

declare module 'genesis/editor' {
    import { TProtypoElement } from 'genesis/protypo';

    type TConstructorData = {
        // type: string,
        jsonData: any,
        treeData?: any,
        pageTemplate?: string,
        selectedTag?: TProtypoElement
    };

    type TConstructorTreeElement = {
        title: string,
        children?: TConstructorTreeElement[],
        expanded?: boolean,
        id?: string,
        selected: boolean,
        logic: boolean,
        canMove: boolean,
        canDrop: boolean,
        tag?: TProtypoElement
    };

    type TEditorTab = {
        readonly type: string;
        readonly id: string;
        readonly new: boolean;
        readonly name: string;
        readonly tool: string;
        readonly value: string;
        readonly initialValue: string;
        readonly preview?: TProtypoElement[];
        readonly designer?: {
            data: TConstructorData,
            history?: {
                data: TConstructorData[],
                position?: number,
                canUndo?: boolean,
                canRedo?: boolean
            };
        };
        readonly dirty: boolean;
    };

    interface IEditorTabCreateCall {
        id: string;
        name: string;
        value: string
    }

    interface ILoadEditorTabCall {
        type: string;
        name: string;
    }

    interface IReloadEditorTabCall {
        type: string;
        id: string;
        data: Partial<TEditorTab>;
    }
}