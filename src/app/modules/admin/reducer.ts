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

import * as actions from './actions';
import * as _ from 'lodash';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { IListResponse, ITableResponse, ITablesResponse, IInterfacesResponse, IContract, IParameterResponse, IHistoryResponse } from 'lib/api';
import { findTagById, resolveTagHandler, Properties, generateId } from 'lib/constructor';
import { IProtypoElement } from 'components/Protypo/Protypo';

export type State = {
    readonly pending: boolean;
    readonly block: { id: string, name: string, value: string, conditions: string };
    readonly menu: { id: string, name: string, value: string, conditions: string };
    readonly menus: { id: string, name: string, value: string, conditions: string }[];
    readonly tables: ITablesResponse;
    readonly table: ITableResponse;
    readonly tableData: IListResponse;
    readonly history: IHistoryResponse;
    readonly page: { id: string, name: string, menu: string, conditions: string, value: string };
    readonly pageTreeCode: any;
    readonly interfaces: IInterfacesResponse;
    readonly contract: { id: string, active: string, name: string, conditions: string, address: string, value: string };
    readonly contracts: IContract[];
    readonly tabs: {
        data: {
            [key: string]: {
                type: string,
                data: any,
                selectedTag?: IProtypoElement
            }
        },
        history: {
            [key: string]: {
                data: any,
                position?: number,
                canUndo?: boolean,
                canRedo?: boolean
            }
        },
        list: { id: string, type: string, name?: string, visible?: boolean }[] };
    readonly language: { id: string, res: any, name: string, conditions: string };
    readonly languages: { id: string, res: any, name: string, conditions: string }[];
    readonly parameter: IParameterResponse;
    readonly parameters: IParameterResponse[];
    readonly exportPayload: Object;
    readonly importPayload: {
        pages: { Name: string }[];
        blocks: { Name: string }[];
        menus: { Name: string }[];
        parameters: { Name: string }[];
        languages: { Name: string }[];
        contracts: { Name: string }[];
        tables: { Name: string }[];
        data: {
            Table: string;
            Columns: string[];
            Data: any[][];
        }[];
    };
};

export const initialState: State = {
    block: null,
    menu: null,
    menus: null,
    pending: false,
    tables: null,
    table: null,
    tableData: null,
    history: null,
    page: null,
    pageTreeCode: null,
    interfaces: null,
    contract: null,
    contracts: null,
    tabs: { data: {}, history: {}, list: [] },
    language: null,
    languages: null,
    parameter: null,
    parameters: null,
    exportPayload: null,
    importPayload: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.getInterface.started)) {
        return {
            ...state,
            pending: true,
            interfaces: null
        };
    }
    else if (isType(action, actions.getInterface.done)) {
        return {
            ...state,
            pending: false,
            interfaces: action.payload.result
        };
    }
    else if (isType(action, actions.getInterface.failed)) {
        return {
            ...state,
            pending: false,
            interfaces: null
        };
    }

    if (isType(action, actions.getPage.started)) {
        return {
            ...state,
            pending: true,
            page: null
        };
    }
    else if (isType(action, actions.getPage.done)) {
        return {
            ...state,
            pending: false,
            page: action.payload.result.page as { id: string, name: string, menu: string, conditions: string, value: string },
            menus: action.payload.result.menus,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfacePage' + action.payload.result.page.id]: {
                        type: 'interfacePage',
                        data: action.payload.result.page
                    }
                }
            }
        };
    }
    else if (isType(action, actions.getPage.failed)) {
        return {
            ...state,
            pending: false,
            page: null,
            menus: null
        };
    }

    if (isType(action, actions.getPageTreeCode.started)) {
        return {
            ...state,
            pending: true,
            pageTreeCode: null
        };
    }
    else if (isType(action, actions.getPageTreeCode.done)) {
        let pageTreeCode = action.payload.result.pageTreeCode;
        return {
            ...state,
            pending: false,
            pageTreeCode: pageTreeCode
        };
    }
    else if (isType(action, actions.getPageTreeCode.failed)) {
        return {
            ...state,
            pending: false,
            pageTreeCode: null
        };
    }

    if (isType(action, actions.getPageTree.started)) {
        return {
            ...state,
            pending: true,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.id]: null
                }
            }
        };
    }
    else if (isType(action, actions.getPageTree.done)) {
        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.params.id]: {
                        type: 'interfaceConstructor',
                        data: action.payload.result.page.tree
                    }
                }
            }
        };
    }
    else if (isType(action, actions.getPageTree.failed)) {
        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.params.id]: null
                }
            }
        };
    }

    if (isType(action, actions.changePage)) {
        const tabData = state.tabs.data['interfaceConstructor' + action.payload.pageID];
        const pageTreeOrig = tabData && tabData.data || null;
        let selectedTag = tabData && tabData.selectedTag || null;

        let pageTree = null;
        if (pageTreeOrig) {
            pageTree = _.cloneDeep(pageTreeOrig);
        }

        let tag = findTagById(pageTree, action.payload.tagID).el;
        if (tag) {
            if (action.payload.text) {
                // todo: parse contentEditable tags and create children array

                const regex = /(<[^\/>]+>[^<]*<\/[^>]+>)/ig; // remove tags
                let plainText = action.payload.text.replace(regex, '');
                const regex2 = /(<[^>]+>)/ig;    // remove empty tags
                plainText = plainText.replace(regex2, '');

                if (tag.children && tag.children.length) {
                    for (let i = 0; i < tag.children.length; i++) {
                        if (tag.children[i].tag === 'text') {
                            tag.children[i].text = plainText;
                            break;
                        }
                    }
                    // let child = tag.children[0];
                    // if (child.text) {
                    //     child.text = action.payload.text + '';
                    // }
                    // tag.children = [child];
                }
            }

            if (!tag.attr) {
                tag.attr = {};
            }

            if ('string' === typeof action.payload.class) {
                tag.attr.class = action.payload.class || '';
            }

            let properties = new Properties();

            if ('string' === typeof action.payload.align) {
                tag.attr.class = properties.updateClassList(tag.attr.class || '', 'align', action.payload.align);
            }

            if ('string' === typeof action.payload.transform) {
                tag.attr.class = properties.updateClassList(tag.attr.class || '', 'transform', action.payload.transform);
            }

            if ('string' === typeof action.payload.wrap) {
                tag.attr.class = properties.updateClassList(tag.attr.class || '', 'wrap', action.payload.wrap);
            }

            if ('string' === typeof action.payload.color) {
                tag.attr.class = properties.updateClassList(tag.attr.class || '', 'color', action.payload.color);
            }
        }

        if (selectedTag && tag && selectedTag.id === tag.id) {
            selectedTag = _.cloneDeep(tag);
        }

        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.pageID]: {
                        type: 'interfaceConstructor',
                        data: pageTree,
                        selectedTag: selectedTag
                    }
                }
            }
        };
    }

    if (isType(action, actions.selectTag)) {
        const tabData = state.tabs.data['interfaceConstructor' + action.payload.pageID];
        const pageTree = tabData && tabData.data || null;

        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.pageID]: {
                        type: 'interfaceConstructor',
                        data: pageTree,
                        selectedTag: action.payload.tag
                    }
                }
            }
        };
    }

    if (isType(action, actions.setTagCanDropPosition)) {
        let pageTree = state.tabs.data['interfaceConstructor' + action.payload.pageID] && state.tabs.data['interfaceConstructor' + action.payload.pageID].data || null;
        pageTree = _.cloneDeep(pageTree);

        let tag = findTagById(pageTree, action.payload.tagID).el;
        if (tag) {
            if (!tag.attr) {
                tag.attr = {};
            }
            if ('string' === typeof action.payload.position) {
                tag.attr.canDropPosition = action.payload.position;
            }
        }

        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.pageID]: {
                        type: 'interfaceConstructor',
                        data: pageTree
                    }
                }
            }
        };
    }

    if (isType(action, actions.addTag)) {
        let pageTree = state.tabs.data['interfaceConstructor' + action.payload.pageID] && state.tabs.data['interfaceConstructor' + action.payload.pageID].data || null;
        pageTree = _.cloneDeep(pageTree);
        // destinationTagID
        if (!pageTree) {
            pageTree = [];
        }

        let Tag: any = null;

        const Handler = resolveTagHandler(action.payload.tag.element);
        if (Handler) {
            Tag = new Handler();
        }

        if ('string' === typeof action.payload.destinationTagID &&
            'string' === typeof action.payload.position) {
            let tag = findTagById(pageTree, action.payload.destinationTagID);
            if (tag.el) {
                switch (action.payload.position) {
                    case 'inside':
                        tag.el.children.push(Tag.generateTreeJSON(action.payload.tag.text));
                        break;
                    case 'before':
                        // tag.el.children.push(Tag.generateTreeJSON(action.payload.tag.text));
                        if (tag.parent && tag.parent.id && tag.parent.children) {
                            tag.parent.children.splice(tag.parentPosition, 0, Tag.generateTreeJSON(action.payload.tag.text));
                        }
                        else {
                            pageTree.splice(tag.parentPosition, 0, Tag.generateTreeJSON(action.payload.tag.text));
                        }
                        break;
                    case 'after':
                        if (tag.parent && tag.parent.id && tag.parent.children) {
                            tag.parent.children.splice(tag.parentPosition + 1, 0, Tag.generateTreeJSON(action.payload.tag.text));
                        }
                        else {
                            pageTree.splice(tag.parentPosition + 1, 0, Tag.generateTreeJSON(action.payload.tag.text));
                        }
                        // tag.el.children.push(Tag.generateTreeJSON(action.payload.tag.text));
                        break;
                    default:
                        break;
                }

            }
            // alert(tag.el.id + ' parent ' + (tag.parent && tag.parent.id || 'root') + " pos " + tag.parentPosition);
        }
        else {
            pageTree = pageTree.concat(
                Tag.generateTreeJSON(action.payload.tag.text)
            );
        }

        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.pageID]: {
                        type: 'interfaceConstructor',
                        data: pageTree
                    }
                }
            }
        };
    }

    if (isType(action, actions.moveTag)) {
        let pageTree = state.tabs.data['interfaceConstructor' + action.payload.pageID] && state.tabs.data['interfaceConstructor' + action.payload.pageID].data || null;
        pageTree = _.cloneDeep(pageTree);
        if (!pageTree) {
            pageTree = [];
        }

        if ('string' === typeof action.payload.destinationTagID &&
            'string' === typeof action.payload.position) {
            let tag = findTagById(pageTree, action.payload.destinationTagID);
            // alert(JSON.stringify(tag));
            if (tag.el) {
                // generate new id for inserted tag
                // todo: generate subtags ids for copy function
                let tagCopy = Object.assign({}, action.payload.tag);
                tagCopy.id = generateId();
                switch (action.payload.position) {
                    case 'inside':
                        tag.el.children.push(tagCopy);
                        break;
                    case 'before':
                        // tag.el.children.push(Tag.generateTreeJSON(action.payload.tag.text));
                        if (tag.parent && tag.parent.id && tag.parent.children) {
                            tag.parent.children.splice(tag.parentPosition, 0, tagCopy);
                        }
                        else {
                            pageTree.splice(tag.parentPosition, 0, tagCopy);
                        }
                        break;
                    case 'after':
                        if (tag.parent && tag.parent.id && tag.parent.children) {
                            tag.parent.children.splice(tag.parentPosition + 1, 0, tagCopy);
                        }
                        else {
                            pageTree.splice(tag.parentPosition + 1, 0, tagCopy);
                        }
                        // tag.el.children.push(Tag.generateTreeJSON(action.payload.tag.text));
                        break;
                    default:
                        break;
                }

            }
            // alert(tag.el.id + ' parent ' + (tag.parent && tag.parent.id || 'root') + " pos " + tag.parentPosition);
        }
        else {
            pageTree = pageTree.concat(
                action.payload.tag
            );
        }

        // delete moved element, skip for copying, todo: check ids
        let sourceTag = findTagById(pageTree.concat(), action.payload.tag.id);
        if (sourceTag.parent) {
            sourceTag.parent.children.splice(sourceTag.parentPosition, 1);
        }
        else {
            // root
            pageTree.splice(sourceTag.parentPosition, 1);
        }

        return {
            ...state,
            pending: false,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceConstructor' + action.payload.pageID]: {
                        type: 'interfaceConstructor',
                        data: pageTree
                    }
                }
            }
        };
    }

    if (isType(action, actions.saveConstructorHistory)) {
        let pageTree = state.tabs.data['interfaceConstructor' + action.payload.pageID] && state.tabs.data['interfaceConstructor' + action.payload.pageID].data || null;
        pageTree = _.cloneDeep(pageTree);
        let data = state.tabs.history['page' + action.payload.pageID] && state.tabs.history['page' + action.payload.pageID].data || [];
        data = _.cloneDeep(data);
        const position = state.tabs.history['page' + action.payload.pageID] && state.tabs.history['page' + action.payload.pageID].position || 0;

        // alert(JSON.stringify(data));
        if (position < data.length) {
            data = [...data.slice(0, position)];
        }

        const canUndo = position > 0;
        const canRedo = false;

        return {
            ...state,
            tabs: {
                ...state.tabs,
                history: {
                    ...state.tabs.history,
                    ['page' + action.payload.pageID]: { data: data.concat([pageTree]), position: position + 1, canUndo, canRedo }
                }
            }
        };
    }

    if (isType(action, actions.constructorUndo)) {
        // alert('undo ' + action.payload.pageID);
        let data = state.tabs.history['page' + action.payload.pageID] && state.tabs.history['page' + action.payload.pageID].data || [];
        data = _.cloneDeep(data);
        let position = state.tabs.history['page' + action.payload.pageID] && state.tabs.history['page' + action.payload.pageID].position || 0;
        if (position > 1 && data.length > 1) {
            position--;
            const canUndo = position > 1;
            const canRedo = true;
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    history: {
                        ...state.tabs.history,
                        ['page' + action.payload.pageID]: { data: data, position: position, canUndo, canRedo }
                    },
                    data: {
                        ...state.tabs.data,
                        ['interfaceConstructor' + action.payload.pageID]: {
                            type: 'interfaceConstructor',
                            data: data[position - 1]
                        }
                    }
                }
            };
        }
    }

    if (isType(action, actions.constructorRedo)) {
        let data = state.tabs.history['page' + action.payload.pageID] && state.tabs.history['page' + action.payload.pageID].data || [];
        data = _.cloneDeep(data);
        let position = state.tabs.history['page' + action.payload.pageID] && state.tabs.history['page' + action.payload.pageID].position || 0;
        if (position < data.length && data.length > 0) {
            position++;
            const canUndo = position > 1;
            const canRedo = position < data.length;
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    history: {
                        ...state.tabs.history,
                        ['page' + action.payload.pageID]: { data: data, position: position, canUndo, canRedo }
                    },
                    data: {
                        ...state.tabs.data,
                        ['interfaceConstructor' + action.payload.pageID]: {
                            type: 'interfaceConstructor',
                            data: data[position - 1]
                        }
                    }
                }
            };
        }
    }

    if (isType(action, actions.getMenu.started)) {
        return {
            ...state,
            pending: true,
            menu: null
        };
    }
    else if (isType(action, actions.getMenu.done)) {
        return {
            ...state,
            pending: false,
            menu: action.payload.result,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceMenu' + action.payload.result.id]: {
                        type: 'interfaceMenu',
                        data: action.payload.result
                    }
                }
            }
        };
    }
    else if (isType(action, actions.getMenu.failed)) {
        return {
            ...state,
            pending: false,
            menu: null
        };
    }

    if (isType(action, actions.getTables.started)) {
        return {
            ...state,
            pending: true,
            tables: null
        };
    }
    else if (isType(action, actions.getTables.done)) {
        return {
            ...state,
            pending: false,
            tables: action.payload.result
        };
    }
    else if (isType(action, actions.getTables.failed)) {
        return {
            ...state,
            pending: false,
            tables: null
        };
    }

    if (isType(action, actions.getHistory.started)) {
        return {
            ...state,
            pending: true,
            history: null
        };
    }
    else if (isType(action, actions.getHistory.done)) {
        return {
            ...state,
            pending: false,
            history: action.payload.result
        };
    }
    else if (isType(action, actions.getHistory.failed)) {
        return {
            ...state,
            pending: false,
            history: null
        };
    }

    if (isType(action, actions.getTable.started)) {
        return {
            ...state,
            pending: true,
            table: null,
            tableData: null
        };
    }
    else if (isType(action, actions.getTable.done)) {
        return {
            ...state,
            pending: false,
            table: action.payload.result.table,
            tableData: action.payload.result.data
        };
    }
    else if (isType(action, actions.getTable.failed)) {
        return {
            ...state,
            pending: false,
            table: null,
            tableData: null
        };
    }

    if (isType(action, actions.getTableStruct.started)) {
        return {
            ...state,
            pending: true,
            table: null
        };
    }
    else if (isType(action, actions.getTableStruct.done)) {
        return {
            ...state,
            pending: false,
            table: action.payload.result
        };
    }
    else if (isType(action, actions.getTableStruct.failed)) {
        return {
            ...state,
            pending: false,
            table: null
        };
    }

    if (isType(action, actions.getMenus.started)) {
        return {
            ...state,
            pending: true,
            menus: null
        };
    }
    else if (isType(action, actions.getMenus.done)) {
        return {
            ...state,
            pending: false,
            menus: action.payload.result
        };
    }
    else if (isType(action, actions.getMenus.failed)) {
        return {
            ...state,
            pending: false,
            menus: null
        };
    }

    if (isType(action, actions.getContract.started)) {
        return {
            ...state,
            pending: true,
            contract: null
        };
    }
    else if (isType(action, actions.getContract.done)) {
        return {
            ...state,
            pending: false,
            contract: action.payload.result,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['contract' + action.payload.result.id]: {
                        type: 'contract',
                        data: action.payload.result
                    }
                }
            }
        };
    }
    else if (isType(action, actions.getContract.failed)) {
        return {
            ...state,
            pending: false,
            contract: null
        };
    }

    if (isType(action, actions.getContracts.started)) {
        return {
            ...state,
            pending: true,
            contracts: null
        };
    }
    else if (isType(action, actions.getContracts.done)) {
        return {
            ...state,
            pending: false,
            contracts: action.payload.result.list
        };
    }
    else if (isType(action, actions.getContracts.failed)) {
        return {
            ...state,
            pending: false,
            contracts: null
        };
    }

    if (isType(action, actions.getBlock.started)) {
        return {
            ...state,
            pending: true,
            block: null
        };
    }
    else if (isType(action, actions.getBlock.done)) {
        return {
            ...state,
            pending: false,
            block: action.payload.result,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['interfaceBlock' + action.payload.result.id]: {
                        type: 'interfaceBlock',
                        data: action.payload.result
                    }
                }
            }
        };
    }
    else if (isType(action, actions.getBlock.failed)) {
        return {
            ...state,
            pending: false,
            block: null
        };
    }

    if (isType(action, actions.getLanguages.started)) {
        return {
            ...state,
            pending: true,
            languages: null
        };
    }
    else if (isType(action, actions.getLanguages.done)) {
        return {
            ...state,
            pending: false,
            languages: action.payload.result
        };
    }
    else if (isType(action, actions.getLanguages.failed)) {
        return {
            ...state,
            pending: false,
            languages: null
        };
    }

    if (isType(action, actions.getLanguage.started)) {
        return {
            ...state,
            pending: true,
            language: null
        };
    }
    else if (isType(action, actions.getLanguage.done)) {
        return {
            ...state,
            pending: false,
            language: action.payload.result
        };
    }
    else if (isType(action, actions.getLanguage.failed)) {
        return {
            ...state,
            pending: false,
            language: null
        };
    }

    if (isType(action, actions.getParameters.started)) {
        return {
            ...state,
            pending: true,
            parameters: null
        };
    }
    else if (isType(action, actions.getParameters.done)) {
        return {
            ...state,
            pending: false,
            parameters: action.payload.result
        };
    }
    else if (isType(action, actions.getParameters.failed)) {
        return {
            ...state,
            pending: false,
            parameters: null
        };
    }

    if (isType(action, actions.getParameter.started)) {
        return {
            ...state,
            pending: true,
            parameter: null
        };
    }
    else if (isType(action, actions.getParameter.done)) {
        return {
            ...state,
            pending: false,
            parameter: action.payload.result,
            tabs: {
                ...state.tabs,
                data: {
                    ...state.tabs.data,
                    ['parameter' + action.payload.result.name]: {
                        type: 'parameter',
                        data: action.payload.result
                    }
                }
            }
        };
    }
    else if (isType(action, actions.getParameter.failed)) {
        return {
            ...state,
            pending: false,
            parameter: null
        };
    }

    if (isType(action, actions.exportData.started)) {
        return {
            ...state,
            pending: true,
            exportPayload: null
        };
    }
    else if (isType(action, actions.exportData.done)) {
        return {
            ...state,
            pending: false,
            exportPayload: action.payload.result
        };
    }
    else if (isType(action, actions.exportData.failed)) {
        return {
            ...state,
            pending: false,
            exportPayload: null
        };
    }

    if (isType(action, actions.importData.started)) {
        return {
            ...state,
            pending: true,
            importPayload: null
        };
    }
    else if (isType(action, actions.importData.done)) {
        return {
            ...state,
            pending: false,
            importPayload: action.payload.result
        };
    }
    else if (isType(action, actions.importData.failed)) {
        return {
            ...state,
            pending: false,
            importPayload: null
        };
    }

    if (isType(action, actions.importDataPrune)) {
        let payload: any = null;
        if ('number' === typeof action.payload.index) {
            const table = state.importPayload[action.payload.name].find((l: any) => l.Table === action.payload.key);
            const otherTables = state.importPayload[action.payload.name].filter((l: any) => l.Table !== action.payload.key);

            payload = [
                ...otherTables,
                {
                    Table: table.Table,
                    Columns: table.Columns,
                    Data: table.Data.filter((v: any, i: number) => i !== action.payload.index)
                }
            ];
        }
        else {
            payload = state.importPayload[action.payload.name].filter((l: any) => l.Name !== action.payload.key);
        }

        return {
            ...state,
            pending: true,
            importPayload: {
                ...state.importPayload,
                [action.payload.name]: payload
            }
        };
    }

    if (isType(action, actions.getTabList.done)) {
        let tabList = action.payload.result.tabList;
        return {
            ...state,
            tabs: {
                ...state.tabs,
                list: tabList
            }
        };
    }

    if (isType(action, actions.removeTabList.done)) {
        let tabList = action.payload.result.tabList;
        return {
            ...state,
            tabs: {
                ...state.tabs,
                list: tabList
            }
        };

    }

    return state;
};