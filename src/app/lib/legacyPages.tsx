/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Backup from 'containers/Main/Backup';
import Editor from 'containers/Main/Editor';

export interface ILegacyPage {
    menu: string;
    section: string;
    render: (props?: { [key: string]: any }) => React.ReactNode;
}

const LEGACY_PAGES: { [page: string]: ILegacyPage } = {
    'backup': { section: null, menu: null, render: () => <Backup /> },
    'editor': { section: 'editor', menu: null, render: (props: { open?: string, create?: string, name?: string, vde?: string }) => <Editor {...props} /> }
};

export {
    LEGACY_PAGES
};