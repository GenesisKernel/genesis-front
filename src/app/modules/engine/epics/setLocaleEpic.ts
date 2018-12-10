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
import { of } from 'rxjs';
import { Epic } from 'modules';
import { setLocale } from '../actions';
import { addLocaleData } from 'react-intl';
import { saveLocale } from 'modules/storage/actions';
import defaultLocaleMessages from 'lib/en-US.json';
import platform from 'lib/platform';
import urlJoin from 'url-join';
import { delay, flatMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const defaultLocale = 'en-US';

const setLocaleEpic: Epic = (action$) => action$.ofAction(setLocale.started).pipe(
    delay(0),
    flatMap(action => {
        if (!action.payload || 'en-US' === action.payload) {
            return of<Action>(
                saveLocale(defaultLocale),
                setLocale.done({
                    params: defaultLocale,
                    result: defaultLocaleMessages
                }),
            );
        }
        else {
            const requestUrl = platform.target({
                web: urlJoin(process.env.PUBLIC_URL || location.origin, `locales/${action.payload}.json`),
                desktop: `./locales/${action.payload}.json`
            });

            return ajax(requestUrl).pipe(
                flatMap(result => {
                    if ('json' === result.responseType) {
                        addLocaleData({
                            locale: action.payload,
                            fields: result.response,
                            pluralRuleFunction: (n: number) => n.toString()
                        });
                        return of<Action>(
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
                }),
                catchError(() => of<Action>(
                    saveLocale(defaultLocale),
                    setLocale.done({
                        params: defaultLocale,
                        result: defaultLocaleMessages
                    }),
                ))
            );
        }
    })
);

export default setLocaleEpic;