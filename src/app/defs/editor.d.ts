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
        jsonData: TProtypoElement[],
        treeData?: TConstructorTreeElement[],
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
                data: TProtypoElement[][],
                position?: number,
                canUndo?: boolean,
                canRedo?: boolean
            };
        };
        readonly dirty: boolean;
        readonly appId?: number;
    };

    interface IEditorTabCreateCall {
        id: string;
        name: string;
        value: string
    }

    interface ICreateEditorTabCall{
        type: string;
        appId: number;
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

    interface IChangePageCall {
        text?: string;
        class?: string;
        name?: string;
        source?: string;
        align?: string;
        transform?: string;
        wrap?: string;
        color?: string;
        btn?: string;
        width?: string;
        ratio?: string;
        condition?: string;
        canDropPosition?: string;
        tagID: string;
        pageID?: string;
    }

    interface IChangePageResult {
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
        selectedTag?: TProtypoElement;
    }

    interface IAddTagCall {
        tag: ISourceElement;
        destinationTagID?: string;
        position?: string;
    }

    interface IOperateTagCall {
        tag: TProtypoElement;
        destinationTagID?: string;
        position?: string;
    }

    interface IOperateTagResult {
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
    }

    interface IMoveTreeTag {
        treeData: TConstructorTreeElement[];
        tagID: string;
    }

    interface ISaveConstructorHistoryResult {
        data: TProtypoElement[][];
        position: number;
        canUndo: boolean;
        canRedo: boolean;
    }

    interface IConstructorUndoRedoResult {
        position: number;
        canUndo: boolean;
        canRedo: boolean;
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
    }

    interface ISetTagCanDropPositionCall {
        tagID: string;
        position: string;
    }

    interface ISetTagCanDropPositionResult {
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
    }

    interface ISelectTagResult {
        selectedTag: TProtypoElement;
        treeData: TConstructorTreeElement[];
    }

    interface ISourceElement {
        new: boolean;
        element: string;
        template?: string;
        text?: string;
    }

    interface IConstructorElementProps {
        editable?: boolean;
        selected?: boolean;
        logic?: boolean;
        changePage?: (attrs: IChangePageCall) => void;
        setTagCanDropPosition?: (attrs: ISetTagCanDropPositionCall) => void;
        addTag?: (attrs: IAddTagCall) => void;
        copyTag?: (attrs: IOperateTagCall) => void;
        moveTag?: (attrs: IOperateTagCall) => void;
        removeTag?: (attrs: IOperateTagCall) => void;
        selectTag?: (attrs: TProtypoElement) => void;
        selectedTag?: TProtypoElement;
        tag?: TProtypoElement;
        canDropPosition?: string;
        isOver?: boolean;
        isDragging?: boolean;

        connectDropTarget?: any;
        connectDragSource?: any;
        connectDragPreview?: any;
    }
}