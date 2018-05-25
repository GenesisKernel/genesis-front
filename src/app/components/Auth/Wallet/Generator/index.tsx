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
import { Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Validation from 'components/Validation';
import GeneratorTool from './GeneratorTool';

export interface IWalletGeneratorProps {
    descriptionValue: React.ReactNode;
    className?: string;
    seed: string;
    password: string;
    compareSeed?: string;
    comparePassword?: string;
    onSeedChange: (seed: string) => void;
    onPasswordChange: (password: string) => void;
    onGenerate?: () => void;
    onSave?: () => void;
    onLoad?: () => void;
}

const Generator: React.SFC<IWalletGeneratorProps> = props => (
    <div className={props.className}>
        <fieldset>
            <p className="text-center">
                {props.descriptionValue}
            </p>
        </fieldset>
        <fieldset>
            <Validation.components.ValidatedFormGroup for="seed">
                <Col md={3} className="clearfix">
                    <div className="pull-left">
                        <FormattedMessage id="auth.seed" defaultMessage="Wallet seed" />
                    </div>
                    <div className="pull-right visible-sm visible-xs">
                        <Validation.components.ValidationMessage for="seed" />
                    </div>
                </Col>
                <Col md={9}>
                    <div>
                        <Validation.components.ValidatedTextarea
                            className="input-seed"
                            onChange={e => props.onSeedChange(e.target.value)}
                            value={props.seed}
                            name="seed"
                            validators={props.compareSeed ?
                                [Validation.validators.required, Validation.validators.compare(props.compareSeed)] :
                                [Validation.validators.required]
                            }
                        />
                    </div>
                    <div>
                        {props.onGenerate && (
                            <GeneratorTool onClick={props.onGenerate}>
                                <FormattedMessage id="auth.seed.generate" defaultMessage="Generate" />
                            </GeneratorTool>
                        )}
                        {props.onSave && (
                            <GeneratorTool disabled={!props.seed} onClick={props.onSave}>
                                <FormattedMessage id="auth.seed.save" defaultMessage="Save" />
                            </GeneratorTool>
                        )}
                        {props.onLoad && (
                            <GeneratorTool onClick={props.onLoad}>
                                <FormattedMessage id="auth.seed.load" defaultMessage="Load" />
                            </GeneratorTool>
                        )}
                    </div>
                    <div className="visible-md visible-lg text-left">
                        <Validation.components.ValidationMessage for="seed" />
                    </div>
                </Col>
            </Validation.components.ValidatedFormGroup>
        </fieldset>
        <fieldset>
            <Validation.components.ValidatedFormGroup for="password">
                <Col md={3} className="clearfix">
                    <div className="pull-left">
                        <FormattedMessage id="general.password" defaultMessage="Password" />
                    </div>
                    <div className="pull-right visible-sm visible-xs">
                        <Validation.components.ValidationMessage for="password" />
                    </div>
                </Col>
                <Col md={9}>
                    <Validation.components.ValidatedControl
                        onChange={e => props.onPasswordChange((e.target as any).value)}
                        value={props.password}
                        name="password"
                        type="password"
                        validators={props.comparePassword ?
                            [Validation.validators.required, Validation.validators.minlength(6), Validation.validators.compare(props.comparePassword)] :
                            [Validation.validators.required, Validation.validators.minlength(6)]
                        }
                    />
                    <div className="visible-md visible-lg text-left">
                        <Validation.components.ValidationMessage for="password" />
                    </div>
                </Col>
            </Validation.components.ValidatedFormGroup>
        </fieldset>
        <div />
    </div>
);

const StyledGenerator = styled(Generator) `
    textarea.input-seed {
        height: 60px;
        resize: none;
    }
`;

export default StyledGenerator;