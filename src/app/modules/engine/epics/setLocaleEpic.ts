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

import { Action } from 'redux';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { setLocale } from '../actions';
import { addLocaleData } from 'react-intl';
import defaultLocaleMessages from 'lib/en-US.json';
import { saveLocale } from 'modules/storage/actions';

const defaultLocale = 'en-US';

const setLocaleEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(setLocale.started)
        .delay(0)
        .flatMap(action => {
            if (!action.payload || 'en-US' === action.payload) {
                return Observable.of<Action>(
                    saveLocale(defaultLocale),
                    setLocale.done({
                        params: defaultLocale,
                        result: defaultLocaleMessages
                    }),
                );
            }
            else {
                return Observable.ajax(`/locales/${action.payload}.json`)
                    .flatMap(result => {
                        if ('json' === result.responseType) {
                            addLocaleData({
                                locale: action.payload,
                                fields: result.response,
                                pluralRuleFunction: (n: number, ord: boolean) => n.toString()
                            });
                            return Observable.of<Action>(
                                saveLocale(action.payload),
                                setLocale.done({
                                    params: action.payload,
                                    result: result.response
                                })
                            );
                        }
                        else {
                            throw 'E_FAILED';
                        }
                    })
                    .catch(e => Observable.of<Action>(
                        saveLocale(defaultLocale),
                        setLocale.done({
                            params: defaultLocale,
                            result: defaultLocaleMessages
                        }),
                    ));
            }
        });

export default setLocaleEpic;