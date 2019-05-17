/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { sectionsInit } from '../actions';
import { Reducer } from 'modules';
import { TSection } from 'apla/content';

const sectionsInitDoneHandler: Reducer<typeof sectionsInit.done, State> = (state, payload) => {
    const sections: { [key: string]: TSection } = {};
    payload.result.sections.forEach(section => {
        sections[section.name] = section;
    });

    state.systemSections.forEach(section => {
        sections[section.name] = section;
    });

    return {
        ...state,
        inited: true,
        mainSection: payload.result.mainSection,
        section: payload.result.section,
        sections
    };
};

export default sectionsInitDoneHandler;