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

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Wrapper';
import LocaleEditor from './LocaleEditor';

export interface IEditProps {
    vde?: boolean;
    translation: {
        name: string;
        res: string;
        conditions: string;
    };
}

interface IEditState {
    translations: {
        name: string;
        value: string;
    }[];
}

class Edit extends React.Component<IEditProps, IEditState> {
    constructor(props: IEditProps) {
        super(props);

        this.state = {
            translations: props.translation ? this.receiveValue(props.translation.res) : []
        };
    }

    componentWillReceiveProps(props: IEditProps) {
        if (!this.props.translation && props.translation) {
            this.setState({
                translations: this.receiveValue(props.translation.res)
            });
        }
    }

    receiveValue(data: string) {
        const translations = JSON.parse(data);
        const array = [];
        for (let itr in translations) {
            if (translations.hasOwnProperty(itr)) {
                array.push({
                    name: itr,
                    value: translations[itr].toString()
                });
            }
        }
        return array;
    }

    mapContractParams(values: { [key: string]: any }) {
        const localizations = {};
        this.state.translations.forEach(l => {
            localizations[l.name] = l.value;
        });
        return {
            Name: values.name,
            Trans: JSON.stringify(localizations)
        };
    }

    onNewLocale() {
        this.setState({
            translations: [
                ...this.state.translations,
                {
                    name: '',
                    value: ''
                }
            ]
        });
    }

    onDropLocale(index: number) {
        if (1 >= this.state.translations.length) {
            return;
        }

        this.setState({
            translations: [
                ...this.state.translations.slice(0, index),
                ...this.state.translations.slice(index + 1)
            ]
        });
    }

    onTranslationUpdate(index: number, property: string, value: any) {
        const translation = this.state.translations[index];
        if (translation) {
            this.setState({
                translations: [
                    ...this.state.translations.slice(0, index),
                    {
                        ...translation,
                        [property]: value

                    },
                    ...this.state.translations.slice(index + 1)
                ]
            });
        }
        else {
            // TODO: Impossible happened
        }
    }

    resolveTranslationValue(index: number, property: string) {
        const translation = this.state.translations[index];
        if (translation) {
            return translation[property];
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Wrapper
                type="noscroll"
                title={{
                    title: 'admin.languages',
                    defaultTitle: 'Language resources'
                }}
                heading={{
                    content: (
                        <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
                    )
                }}
                breadcrumbs={[
                    {
                        url: this.props.vde ? '/vdeadmin/languages' : '/admin/languages',
                        title: (
                            <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
                        )
                    },
                    {
                        title: this.props.translation.name
                    }
                ]}
            >
                <LocaleEditor
                    vde={this.props.vde}
                    contractName={this.props.vde ? 'EditLang' : '@1EditLang'}
                    translation={this.props.translation.name}
                    translations={this.state.translations}
                    onNewLocale={this.onNewLocale.bind(this)}
                    onDropLocale={this.onDropLocale.bind(this)}
                    onTranslationUpdate={this.onTranslationUpdate.bind(this)}
                    resolveTranslationValue={this.resolveTranslationValue.bind(this)}
                    mapContractParams={this.mapContractParams.bind(this)}
                />
            </Wrapper>
        );
    }
}

export default Edit;