// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { resolveHandler, resolveFunction } from 'components/Protypo';
import * as propTypes from 'prop-types';
import api from 'lib/api';
import contextDefinitions from './contexts';

import Heading from 'components/Heading';
import { IValidationResult } from 'components/Validation/ValidatedForm';
import ToolButton, { IToolButtonProps } from 'components/Protypo/components/ToolButton';

export interface IProtypoProps {
    vde?: boolean;
    editable?: boolean;
    wrapper?: JSX.Element;
    context: string;
    page: string;
    payload: IProtypoElement[];
    menuPush: (params: { name: string, content: IProtypoElement[] }) => void;
    navigatePage: (params: { name: string, params: any, vde?: boolean }) => void;
    navigate: (url: string) => void;
    changePage?: any;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
    removeTag?: any;
    setTagCanDropPosition?: any;
    selectTag?: any;
    selectedTag?: any;
}

export interface IProtypoElement {
    tag: string;
    id?: string;
    text?: string;
    // attr?: { [key: string]: string };
    attr?: { [key: string]: any };  // attr can be structured
    children?: IProtypoElement[];
}

export interface IParamsSpec {
    [key: string]: IParamSpec;
}

export interface IParamSpec {
    type: string;
    text?: string;
    params: string[];
}

class Protypo extends React.Component<IProtypoProps> {
    private _lastID: number;
    private _menuPushBind: Function;
    private _navigatePageBind: Function;
    private _navigateBind: Function;
    private _title: string;
    private _toolButtons: IToolButtonProps[];
    private _sources: { [key: string]: { columns: string[], types: string[], data: string[][] } };
    private _errors: { name: string, description: string }[];

    constructor(props: IProtypoProps) {
        super(props);
        this._menuPushBind = props.menuPush.bind(this);
        this._navigatePageBind = props.navigatePage.bind(this);
        this._navigateBind = props.navigate.bind(this);
    }

    getChildContext() {
        return {
            protypo: this,
            menuPush: this._menuPushBind,
            navigatePage: this._navigatePageBind,
            navigate: this._navigateBind,
            vde: this.props.vde
        };
    }

    getCurrentPage() {
        return this.props.page;
    }

    setTitle(title: string) {
        this._title = title;
    }

    addToolButton(props: IToolButtonProps) {
        this._toolButtons.push(props);
    }

    registerSource(name: string, payload: { columns: string[], types: string[], data: string[][] }) {
        this._sources[name] = payload;
    }

    resolveSource(name: string) {
        return this._sources[name];
    }

    resolveData(name: string) {
        return api.resolveData(name);
    }

    resolveParams(values: IParamsSpec, formValues?: { [key: string]: IValidationResult }) {
        const result: { [key: string]: string } = {};
        for (let itr in values) {
            if (values.hasOwnProperty(itr)) {
                const param = values[itr];
                switch (param.type) {
                    case 'text': result[itr] = param.text; break;
                    case 'Val':
                        const inputName = param.params[0];
                        const inputValue = formValues && formValues[inputName] && formValues[inputName].value;
                        result[itr] = inputValue;
                        break;
                    default: break;
                }
            }
        }
        return result;
    }

    renderElement(element: IProtypoElement, optionalKey?: string): React.ReactNode {
        switch (element.tag) {
            case 'text':
                return element.text;

            default:
                const Handler = resolveHandler(element.tag);
                const func = resolveFunction(element.tag);
                if (Handler) {
                    const selected = this.props.selectedTag && this.props.selectedTag.id === element.id;

                    if (-1 !== contextDefinitions[this.props.context].disabledHandlers.indexOf(element.tag)) {
                        return null;
                    }
                    else {
                        const key = optionalKey || (this._lastID++).toString();
                        return (
                            <Handler
                                {...element.attr}
                                key={key}
                                id={key}
                                tag={element}
                                childrenTree={element.children}
                                editable={this.props.editable}
                                changePage={this.props.changePage}
                                setTagCanDropPosition={this.props.setTagCanDropPosition}
                                addTag={this.props.addTag}
                                moveTag={this.props.moveTag}
                                copyTag={this.props.copyTag}
                                removeTag={this.props.removeTag}
                                selectTag={this.props.selectTag}
                                selected={selected}
                            >
                                {this.renderElements(element.children)}
                            </Handler>
                        );
                    }
                }
                else if (func) {
                    if (-1 !== contextDefinitions[this.props.context].disabledFunctions.indexOf(element.tag)) {
                        return null;
                    }
                    else {
                        func(this, { ...element.attr });
                        return null;
                    }
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

    renderElements(elements: IProtypoElement[], keyPrefix?: string): React.ReactNode[] {
        if (!elements) {
            return null;
        }

        return elements.map((element, index) => (
            this.renderElement(element, keyPrefix ? `${keyPrefix}_${index}` : undefined)
        ));
    }

    renderHeading() {
        return (this.props.context === 'page' && !this.props.editable) ? (
            <Heading key="func_heading">
                <span>{this._title}</span>
                <div className="pull-right">
                    {this._toolButtons.map((props, index) => (
                        <ToolButton {...props} key={index} />
                    ))}
                </div>
            </Heading>
        ) : null;
    }

    render() {
        this._lastID = 0;
        this._sources = {};
        this._toolButtons = [];
        this._title = null;
        this._errors = [];

        const body = this.renderElements(this.props.payload);
        const head = this.renderHeading();
        const children = [
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
            head,
            ...body
        ];

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

(Protypo as any).childContextTypes = {
    protypo: propTypes.object.isRequired,
    navigatePage: propTypes.func.isRequired,
    navigate: propTypes.func.isRequired,
    menuPush: propTypes.func.isRequired,
    vde: propTypes.bool
};

export default Protypo;
