/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IProtypoContext {
    disabledFunctions: string[];
    disabledHandlers: string[];
}

const contextDefinitions: { [key: string]: IProtypoContext } = {
    menu: {
        disabledFunctions: ['setTitle', 'addToolButton'],
        disabledHandlers: []
    },
    page: {
        disabledFunctions: [],
        disabledHandlers: ['menuitem', 'menugroup']
    }
};

export default contextDefinitions;