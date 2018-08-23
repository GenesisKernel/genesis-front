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

import * as React from 'react';
import { resolveHandler } from 'components/ProtypoConstructor';
import * as propTypes from 'prop-types';
import { TProtypoElement } from 'genesis/protypo';
import { IConstructorElementProps } from 'genesis/editor';

export interface IProtypoConstructorProps extends IConstructorElementProps {
    apiHost: string;
    editable?: boolean;
    wrapper?: JSX.Element;
    context: string;
    page: string;
    content: TProtypoElement[];
}

export interface IParamsSpec {
    [key: string]: IParamSpec;
}

export interface IParamSpec {
    type: string;
    text?: string;
    params: string[];
}

class ProtypoConstructor extends React.Component<IProtypoConstructorProps> {
    private _lastID: number;
    private _renderElementsBind: Function;
    private _errors: { name: string, description: string }[];

    constructor(props: IProtypoConstructorProps) {
        super(props);
        this._renderElementsBind = this.renderElements.bind(this);
    }

    getChildContext() {
        return {
            protypo: this,
            renderElements: this._renderElementsBind
        };
    }

    getCurrentPage() {
        return this.props.page;
    }

    resolveData(name: string) {
        return `${this.props.apiHost}${name}`;
    }

    renderHandler(Handler: typeof resolveHandler, element: TProtypoElement, key: string): React.ReactNode {
        const selected = this.props.selectedTag && this.props.selectedTag.id === element.id;
        return (
            <Handler
                {...element.attr}
                {...element.sysAttr}
                key={key}
                id={key}
                tag={element}
                childrenTree={element.children}
                childrenText={element.childrenText}
                editable={this.props.editable}
                changePage={this.props.changePage}
                setTagCanDropPosition={this.props.setTagCanDropPosition}
                addTag={this.props.addTag}
                moveTag={this.props.moveTag}
                copyTag={this.props.copyTag}
                removeTag={this.props.removeTag}
                selectTag={this.props.selectTag}
                selected={selected}
                logic={this.props.logic}
                tail={this.renderElements(element.tail)}
            >
                {this.renderElements(element.children)}
            </Handler>
        );
    }

    renderElement(element: TProtypoElement, optionalKey?: string): React.ReactNode {
        switch (element.tag) {
            case 'text':
                return element.text;

            default:
                const Handler = resolveHandler(element.tag);
                if (Handler) {
                    const key = optionalKey || (this._lastID++).toString();
                    return this.renderHandler(Handler, element, key);
                }
                else {
                    this._errors.push({
                        name: 'E_UNREGISTERED_HANDLER',
                        description: `Unknown template handler '${element.tag}'. This error must be reported`
                    });
                    return null;
                }
        }
    }

    renderElements(elements: TProtypoElement[], keyPrefix?: string): React.ReactNode[] {
        if (!elements) {
            return null;
        }

        return elements.map((element, index) => (
            this.renderElement(element, keyPrefix ? `${keyPrefix}_${index}` : undefined)
        ));
    }

    getChildren(): React.ReactNode[] {
        const body = this.renderElements(this.props.content);
        return [
            this._errors.length ? (
                <div key="errors">
                    {this._errors.map((error, errorIndex) => (
                        <div key={errorIndex} className="alert alert-danger">
                            <strong>[{error.name}]</strong>
                            <span className="mr">:</span>
                            <span>{error.description}</span>
                        </div>
                    ))}
                </div>
            ) : null,
            ...body
        ];
    }

    render() {
        this._lastID = 0;
        this._errors = [];

        const children = this.getChildren();

        if (this.props.wrapper) {
            return React.cloneElement(this.props.wrapper, this.props.wrapper.props, children);
        }
        else {
            if (this.props.editable) {
                return (
                    <div>
                        {children}
                    </div>
                );
            }
            return (
                <div className="fullscreen">
                    {children}
                </div>
            );
        }
    }
}

(ProtypoConstructor as any).childContextTypes = {
    protypo: propTypes.object.isRequired,
    renderElements: propTypes.func.isRequired
};

export default ProtypoConstructor;
