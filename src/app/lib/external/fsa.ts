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

// Copyright (c) 2017 <https://github.com/m0a/typescript-fsa-redux-observable>
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

/* tslint:disable */
import { ActionsObservable } from 'redux-observable';
import { Action, ActionCreator, isType } from 'typescript-fsa';
import { Action as ReduxAction } from 'redux';
import 'rxjs/add/operator/filter';

declare module 'redux-observable' {
    interface ActionsObservable<T extends ReduxAction> {
        ofAction<P>(action: ActionCreator<P>): ActionsObservable<Action<P>>;
        ofAction<P1, P2>(item1: ActionCreator<P1>, item2: ActionCreator<P2>): ActionsObservable<Action<P1 | P2>>;
        ofAction<P1, P2, P3>(item1: ActionCreator<P1>, item2: ActionCreator<P2>, item3: ActionCreator<P3>): ActionsObservable<Action<P1 | P2 | P3>>;
        ofAction<P1, P2, P3, P4>(item1: ActionCreator<P1>, item2: ActionCreator<P2>, item3: ActionCreator<P3>, item4: ActionCreator<P4>): ActionsObservable<Action<P1 | P2 | P3 | P4>>;
        ofAction<P1, P2, P3, P4, P5>(item1: ActionCreator<P1>, item2: ActionCreator<P2>, item3: ActionCreator<P3>, item4: ActionCreator<P4>, item5: ActionCreator<P5>): ActionsObservable<Action<P1 | P2 | P3 | P4 | P5>>;
        ofAction<P1, P2, P3, P4, P5, P6>(item1: ActionCreator<P1>, item2: ActionCreator<P2>, item3: ActionCreator<P3>, item4: ActionCreator<P4>, item5: ActionCreator<P5>, item6: ActionCreator<P6>): ActionsObservable<Action<P1 | P2 | P3 | P4 | P5 | P6>>;
    }
}

ActionsObservable.prototype.ofAction =
    function (this: ActionsObservable<Action<any>>, ...actionCreators: ActionCreator<any>[]): ActionsObservable<Action<any>> {
        return this.filter(action =>
            actionCreators.some(actionCreator => isType(action, actionCreator))
        ) as ActionsObservable<Action<any>>;
    };