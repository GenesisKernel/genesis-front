/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { importSeedConfirmation } from '../actions';
import { Observable } from 'rxjs/Observable';
import { readTextFile } from 'lib/fs';

const importSeedConfirmationEpic: Epic = (action$, store) => action$.ofAction(importSeedConfirmation.started)
    .switchMap(action =>
        Observable.from(readTextFile(action.payload))
            .map(payload =>
                importSeedConfirmation.done({
                    params: null,
                    result: payload
                })

            ).catch(e =>
                Observable.of(importSeedConfirmation.failed({
                    params: null,
                    error: null
                }))
            )
    );

export default importSeedConfirmationEpic;