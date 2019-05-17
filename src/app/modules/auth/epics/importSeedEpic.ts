/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { importSeed } from '../actions';
import { Observable } from 'rxjs/Observable';
import { readTextFile } from 'lib/fs';

const importSeedEpic: Epic = (action$, store) => action$.ofAction(importSeed.started)
    .switchMap(action =>
        Observable.from(readTextFile(action.payload))
            .map(payload =>
                importSeed.done({
                    params: null,
                    result: payload
                })

            ).catch(e =>
                Observable.of(importSeed.failed({
                    params: null,
                    error: null
                }))
            )
    );

export default importSeedEpic;