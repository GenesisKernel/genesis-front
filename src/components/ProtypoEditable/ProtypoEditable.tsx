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
import { resolveHandler } from 'components/ProtypoEditable';
import * as propTypes from 'prop-types';

import { IValidationResult } from 'components/Validation/ValidatedForm';

export interface IProtypoEditableProps {
    wrapper?: JSX.Element;
    page: string;
    payload: IProtypoEditableElement[];
}

export interface IProtypoEditableElement {
    tag: string;
    text?: string;
    attr?: { [key: string]: string };
    children?: IProtypoEditableElement[];
}

export interface IParamsSpec {
    [key: string]: IParamSpec;
}

export interface IParamSpec {
    type: string;
    text?: string;
    params: string[];
}

export default class ProtypoEditable extends React.Component<IProtypoEditableProps> {
    private _lastID: number;
    private _sources: { [key: string]: { columns: string[], types: string[], data: string[][] } };
    private _errors: { name: string, description: string }[];

    constructor(props: IProtypoEditableProps) {
        super(props);
    }

    getChildContext() {
        return {
            protypo: this,
        };
    }

    getCurrentPage() {
        return this.props.page;
    }

    registerSource(name: string, payload: { columns: string[], types: string[], data: string[][] }) {
        this._sources[name] = payload;
    }

    resolveSource(name: string) {
        return this._sources[name];
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

    renderElement(element: IProtypoEditableElement): React.ReactNode {
        switch (element.tag) {
            case 'text':
                return element.text;

            default:
                const Handler = resolveHandler(element.tag);
                if (Handler) {
                    return (
                        <Handler {...element.attr} key={this._lastID++} childrenTree={element.children}>
                            {this.renderElements(element.children)}
                        </Handler>
                    );
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

    renderElements(elements: IProtypoEditableElement[]): React.ReactNode[] {
        if (!elements) {
            return null;
        }

        return elements.map(element => (
            this.renderElement(element)
        ));
    }

    render() {
        this._lastID = 0;
        this._sources = {};
        this._errors = [];
        const body = this.renderElements(this.props.payload);

        return React.cloneElement(this.props.wrapper || <div />, null, [
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
        ]);
    }
}

(ProtypoEditable as any).childContextTypes = {
    protypo: propTypes.object.isRequired,
};