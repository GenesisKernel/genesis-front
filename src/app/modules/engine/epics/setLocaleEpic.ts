/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { setLocale } from '../actions';
import { addLocaleData } from 'react-intl';
import { saveLocale } from 'modules/storage/actions';
import defaultLocaleMessages from 'lib/en-US.json';
import platform from 'lib/platform';
import urlJoin from 'url-join';

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
                const requestUrl = platform.select({
                    web: urlJoin(process.env.PUBLIC_URL || location.origin, `locales/${action.payload}.json`),
                    desktop: `./locales/${action.payload}.json`
                });

                return Observable.ajax(requestUrl)
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