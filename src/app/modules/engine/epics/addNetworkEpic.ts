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

import uuid from 'uuid';
import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { addNetwork, navigate } from '../actions';
import { discover } from 'services/network';
import NetworkError from 'services/network/errors';
import { saveNetwork } from 'modules/storage/actions';
import { modalShow } from 'modules/modal/actions';
import { Action } from 'redux';

const addNetworkEpic: Epic = (action$, _store, { defaultKey }) => action$.ofAction(addNetwork.started)
    .flatMap(action => {
        const uniqueID = uuid.v4();

        return Observable.from(discover({ uuid: uniqueID, apiHost: action.payload.apiHost }, defaultKey, action.payload.networkID))
            .flatMap(result => Observable.of(
                navigate('/networks'),
                saveNetwork({
                    uuid: uniqueID,
                    id: result.networkID,
                    fullNodes: result.fullNodes,
                    name: action.payload.name
                }),
                addNetwork.done(null)
            ))
            .catch((e: NetworkError) => Observable.of<Action>(
                modalShow({
                    id: 'NETWORK_ERROR',
                    params: {
                        error: e
                    },
                    type: 'NETWORK_ERROR'
                }),
                addNetwork.failed({
                    params: action.payload,
                    error: e
                })
            ));
    });

export default addNetworkEpic;