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

export type TAction = {
    'input_change': {
        name: string;
        value: string;
    };
};

export type TReaction =
    'show' | 'hide';

export interface ICondition {
    [input: string]: string;
}

export type TConditionMap = {
    [K in TReaction]?: boolean;
};

class InteractionManager {
    private _inputValues: {
        [input: string]: string;
    } = {};
    private _listeners: {
        [id: string]: {
            reaction: TReaction;
            conditions: ICondition[];
        }[];
    } = {};

    registerCondition(id: string, reaction: TReaction, conditions: ICondition[]) {
        if (!this._listeners[id]) {
            this._listeners[id] = [];
        }

        this._listeners[id].push({
            reaction,
            conditions
        });
    }

    on<T extends keyof TAction>(action: T, event: TAction[T]) {
        switch (action) {
            case 'input_change':
                this._inputValues[event.name] = event.value;
                break;

            default:
                return;
        }
    }

    getConditionMap<A>(): { [id: string]: TConditionMap } {
        const result: { [id: string]: TConditionMap } = {};

        Object.keys(this._listeners).forEach(id => {
            const listener = this._listeners[id];
            listener.forEach(value => {
                result[id] = {};
                for (let i = 0; i < value.conditions.length; i++) {
                    const condition = value.conditions[i];
                    Object.keys(condition).forEach(input => {
                        result[id][value.reaction] = this._inputValues[input] === condition[input];
                    });
                }
            });
        });

        return result;
    }
}

export default InteractionManager;