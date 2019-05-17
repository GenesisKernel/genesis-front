/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { menuPop } from '../actions';
import { Reducer } from 'modules';

const menuPopHandler: Reducer<typeof menuPop, State> = (state, payload) => {
    if (1 >= state.sections[state.section].menus.length) {
        return state;
    }
    else {
        return {
            ...state,
            sections: {
                ...state.sections,
                [state.section]: {
                    ...state.sections[state.section],
                    menus: state.sections[state.section].menus.slice(0, -1)
                }
            }
        };
    }
};

export default menuPopHandler;