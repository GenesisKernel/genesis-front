// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import actionCreatorFactory from 'typescript-fsa';
import { IMenu, IPage, ISection } from 'genesis/content';
import { TProtypoElement } from 'genesis/protypo';
import { Location } from 'history';

const actionCreator = actionCreatorFactory('navigator');

export const updateSection = actionCreator<ISection>('UPDATE_SECTION');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<{ section: string, menu: IMenu }>('MENU_PUSH');
export const navigatePage = actionCreator.async<{ name?: string, section?: string, force?: boolean, params: { [key: string]: any } }, { section: string }, undefined>('NAVIGATE_PAGE');
export const renderPage = actionCreator.async<{ section: string, name: string, params: { [key: string]: string }, location: Location }, TProtypoElement[], string>('RENDER_PAGE');
export const reloadPage = actionCreator.async<{}, { params: { [key: string]: any }, menu: IMenu, page: IPage }, string>('RELOAD_PAGE');
export const popPage = actionCreator<{ section: string, name: string, location: Location }>('POP_PAGE');
export const sectionsInit = actionCreator<{ mainSection: string, sections: { [name: string]: ISection } }>('SECTIONS_INIT');