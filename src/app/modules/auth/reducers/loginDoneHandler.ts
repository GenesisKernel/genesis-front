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

import { State } from '../reducer';
import { login } from '../actions';
import { Reducer } from 'modules';

const loginDoneHandler: Reducer<typeof login.done, State> = (state, payload) => {
    const hasRoles = !!(payload.result.roles && payload.result.roles.length);
    return {
        ...state,
        isAuthenticated: !hasRoles,
        isLoggingIn: hasRoles,
        wallet: payload.result.wallet,
        roles: payload.result.roles,
        ecosystem: payload.result.wallet.ecosystem,
        session: payload.result.session,
        privateKey: payload.result.privateKey,
        id: payload.result.wallet.id
    };
};

export default loginDoneHandler;