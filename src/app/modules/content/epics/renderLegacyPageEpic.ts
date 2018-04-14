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

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { renderLegacyPage } from 'modules/content/actions';

const renderLegacyPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderLegacyPage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        if (action.payload.menu) {
            return Observable.fromPromise(client.content({
                type: 'menu',
                name: action.payload.menu,
                params: {},
                locale: state.storage.locale

            })).map(payload =>
                renderLegacyPage.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: action.payload.menu,
                            content: payload.tree
                        }
                    }
                })

            ).catch(error =>
                Observable.of(renderLegacyPage.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: action.payload.menu,
                            content: []
                        }
                    }
                }))
            );
        }
        else {
            return Observable.of(renderLegacyPage.done({
                params: action.payload,
                result: {
                    menu: null
                }
            }));
        }
    });

export default renderLegacyPageEpic;