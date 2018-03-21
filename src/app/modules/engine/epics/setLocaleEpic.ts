// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import { Action } from 'redux';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { setLocale } from '../actions';
import { addLocaleData } from 'react-intl';
import defaultLocaleMessages from 'lib/en-US.json';
import { saveLocale } from 'modules/storage/actions';

const defaultLocale = 'en-US';

export const setLocaleEpic: Epic<Action, IRootState> =
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