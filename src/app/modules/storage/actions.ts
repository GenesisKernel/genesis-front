// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import { IWallet, ISaveEncKeyCall } from 'apla/auth';

const actionCreator = actionCreatorFactory('storage');
export const saveLocale = actionCreator<string>('SAVE_LOCALE');
export const saveWallet = actionCreator<IWallet>('SAVE_WALLET');
export const removeWallet = actionCreator<IWallet>('REMOVE_WALLET');
export const saveNavigationSize = actionCreator<number>('SAVE_NAVIGATION_SIZE');
export const mergeFullNodes = actionCreator<string[]>('MERGE_FULL_NODES');
export const saveEncKey = actionCreator<ISaveEncKeyCall>('SAVE_ENC_KEY');
export const closeSecurityWarning = actionCreator<string>('CLOSE_SECURITY_WARNING');