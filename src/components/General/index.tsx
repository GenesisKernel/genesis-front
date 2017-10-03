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
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import imgLogo from 'images/logo.svg';
import styled from 'styled-components';

import Center from 'components/Center';

const StyledBackButton = styled.em`
    font-size: 20px;
    margin-top: 4px;
`;

export interface IGeneralProps {
    return?: string | (() => void);
}

const General: React.SFC<IGeneralProps> = (props) => (
    <Center>
        <Col lg={5} md={6} xs={12} className="no-float align-middle" style={{ margin: '0 auto' }}>
            <div className="block-center">
                <div className="panel panel-flat panel-dark">
                    <div className="panel-heading text-center clearfix">
                        {props.return && (
                            <div style={{ position: 'absolute' }}>
                                {typeof props.return === 'function' ?
                                    (
                                        <a className="text-muted" href="#" onClick={props.return}>
                                            <StyledBackButton className="fa fa-chevron-left" />
                                        </a>
                                    ) : (
                                        <Link to={props.return.toString()} className="text-muted">
                                            <StyledBackButton className="fa fa-chevron-left" />
                                        </Link>
                                    )
                                }
                            </div>
                        )}
                        <Link to="/">
                            <img src={imgLogo} className="block-center" style={{ height: 25 }} />
                        </Link>
                    </div>
                    <div className="panel-body">
                        {props.children}
                    </div>
                </div>
                <div className="p-lg text-center">
                    <div className="pull-left">
                        <div>Apla &copy; {new Date().getFullYear()} - <a href="http://apla.io">http://apla.io</a></div>
                    </div>
                    <div className="pull-right">
                        <a href="#">English(US)</a>
                    </div>
                </div>
            </div>
        </Col>
    </Center >
);

export default General;