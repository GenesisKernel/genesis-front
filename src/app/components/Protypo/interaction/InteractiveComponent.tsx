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

import React from 'react';
import propTypes from 'prop-types';
import InteractionManager, { TConditionMap, TReaction } from '../interaction';

type TComponentConstructor<T> = React.ComponentClass<T> | React.SFC<T>;

export interface IVisibilityCondition {
    [key: string]: string;
}

export interface IInteractiveComponentReactions {
    show?: IVisibilityCondition[];
    hide?: IVisibilityCondition[];
}

export interface IInteractiveComponentProps extends IInteractiveComponentReactions {
    id: string;
}

export interface IInteractiveComponentContext {
    interactionManager: InteractionManager;
    conditionMap: { [id: string]: TConditionMap };
}

const conditionContext: { [K in TReaction]: keyof IInteractiveComponentReactions } = {
    show: 'show',
    hide: 'hide'
};

const tryRegisterConditions = (props: IInteractiveComponentProps, interactionManager: InteractionManager) => {
    if (interactionManager) {
        Object.keys(conditionContext).forEach((reaction: TReaction) => {
            const dependentPropName = conditionContext[reaction];
            const dependentProp = props[dependentPropName];

            if (dependentProp && dependentProp.length) {
                interactionManager.registerReaction(props.id, reaction, dependentProp);
            }
        });
    }
};

const bindComponent: <T>(Component: TComponentConstructor<T>) => React.SFC<IInteractiveComponentProps> = (Component) => {
    const BoundComponent: React.SFC<IInteractiveComponentProps> = (props, context: IInteractiveComponentContext) => {
        const conditionMap = (context.conditionMap && context.conditionMap[props.id]) || {};
        tryRegisterConditions(props, context.interactionManager);

        if (false === conditionMap.show || true === conditionMap.hide) {
            return null;
        }
        else {
            return <Component {...props} />;
        }
    };
    BoundComponent.contextTypes = {
        interactionManager: propTypes.instanceOf(InteractionManager),
        conditionMap: propTypes.object
    };

    return BoundComponent;
};

export default function interactiveComponent<T>(Component: TComponentConstructor<T>) {
    const BoundComponent = bindComponent<T>(Component);

    return (props: T & IInteractiveComponentProps) => (
        <BoundComponent {...props} />
    );
}