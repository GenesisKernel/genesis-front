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

import { Observable } from 'rxjs';
import { IAPIDependency } from 'modules/dependencies';

const NodeObservable = (params: { nodes: string[], count: number, timeout?: number, concurrency?: number, api: IAPIDependency }) =>
    Observable.from(params.nodes)
        .distinct()
        .flatMap(l => {
            const client = params.api({ apiHost: l });
            return Observable.from(client.getUid())
                .map(() => l)

                // Set request timeout, try the next one
                .timeout(params.timeout || 60000)
                .catch(timeout => Observable.empty<never>());
        }, params.concurrency)
        .take(params.count);

export default NodeObservable;