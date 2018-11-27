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

import actionCreatorFactory, { Action, ActionCreator } from 'typescript-fsa';
import { IModalPageCall } from 'genesis/modal';
import { IModal, TModalType } from 'lib/modal';

const actionCreator = actionCreatorFactory('modal');

export const modalShow = actionCreator<IModal<TModalType>>('MODAL_SHOW') as
    ActionCreator<IModal<never>> &
    (<T extends TModalType>(params: IModal<T>) => Action<IModal<T>>);

export const modalClose = actionCreator('MODAL_CLOSE');
export const modalPage = actionCreator<IModalPageCall>('MODAL_PAGE');
export const tryAuthorize = actionCreator<string>('TRY_AUTHORIZE');