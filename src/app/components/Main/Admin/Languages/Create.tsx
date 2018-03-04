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

export interface ICreateProps {
    vde?: boolean;
    navigatePage: (params: { name?: string, section?: string, force?: boolean, params: { [key: string]: any }, vde?: boolean }) => void;
}

interface ICreateState {
    translations: {
        name: string;
        value: string;
    }[];
}

class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);
        this.state = {
            translations: [{
                name: '',
                value: ''
            }]
        };
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

    onExec(block: string, error: string) {
        if (block) {
            this.props.navigatePage({ name: 'languages', vde: this.props.vde, params: {} });
        }
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
                        title: (
                            <FormattedMessage id="admin.languages.create" defaultMessage="Create localization" />
                        )
                    }
                ]}
            >
                <LocaleEditor
                    vde={this.props.vde}
                    contractName={this.props.vde ? 'NewLang' : '@1NewLang'}
                    translations={this.state.translations}
                    onNewLocale={this.onNewLocale.bind(this)}
                    onDropLocale={this.onDropLocale.bind(this)}
                    onTranslationUpdate={this.onTranslationUpdate.bind(this)}
                    resolveTranslationValue={this.resolveTranslationValue.bind(this)}
                    mapContractParams={this.mapContractParams.bind(this)}
                    onExec={this.onExec.bind(this)}
                />
            </Wrapper>
        );
    }
}

export default Create;