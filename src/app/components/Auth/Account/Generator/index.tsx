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
import { Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Validation from 'components/Validation';
import GeneratorTool from './GeneratorTool';

export interface IAccountGeneratorProps {
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

const Generator: React.SFC<IAccountGeneratorProps> = props => (
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
                        <FormattedMessage id="auth.seed" defaultMessage="Account seed" />
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