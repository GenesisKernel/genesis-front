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

import actionCreatorFactory from 'typescript-fsa';
import { IProtypoElement } from 'components/Protypo/Protypo';

const actionCreator = actionCreatorFactory('content');

export const alertShow = actionCreator<{ id: string, type: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined, title: string, text: string, confirmButton?: string, cancelButton?: string }>('ALERT_SHOW');
export const alertClose = actionCreator<{ id: string, success: string, error: string }>('ALERT_CLOSE');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<{ name: string, content: IProtypoElement[] }>('MENU_PUSH');
export const menuInit = actionCreator.async<{ session: string }, { name: string, content: IProtypoElement[] }, string>('MENU_INIT');
export const renderPage = actionCreator.async<{ session: string, name: string, params?: { [key: string]: any } }, { menu: { name: string, content: IProtypoElement[] }, page: { name: string, content: IProtypoElement[], error?: string } }, string>('GET_PAGE');
export const reset = actionCreator.async<undefined, { menu: { name: string, content: IProtypoElement[] }, page: { name: string, content: IProtypoElement[], error?: string } }, string>('RESET');