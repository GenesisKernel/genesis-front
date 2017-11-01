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
import { Col, Row } from 'react-bootstrap';

import imgViewMobile from 'images/constructor/group-2.svg';
import imgViewTablet from 'images/constructor/group.svg';
import imgViewLaptop from 'images/constructor/group-30.svg';
import imgViewDesktop from 'images/constructor/group-3.svg';
import imgUndo from 'images/constructor/group-7.svg';
import imgRedo from 'images/constructor/group-6.svg';
import imgGroup11 from 'images/constructor/group-11.svg';
import imgGroup12 from 'images/constructor/group-12.svg';
import imgGroup13 from 'images/constructor/group-13.svg';
import imgAlignLeft from 'images/constructor/group-28.svg';
import imgAlignCenter from 'images/constructor/group-27.svg';
import imgAlignRight from 'images/constructor/group-26.svg';
import imgSwitchOff from 'images/constructor/group-29.svg';
import imgSwitchOn from 'images/constructor/group-18.svg';
import imgGroup34 from 'images/constructor/group-34.svg';
import imgGroup35 from 'images/constructor/group-35.svg';
import imgGroup36 from 'images/constructor/group-36.svg';
import imgGroup37 from 'images/constructor/group-37.svg';
import imgStroke75 from 'images/constructor/stroke-75.svg';
import imgLowercase from 'images/constructor/tt-lower.svg';
import imgUppercase from 'images/constructor/tt-upper.svg';

interface IConstructorEditorProps {
    session: string;
    template: string;
    treeCode: any;
    page?: { id: string, name: string, value: string };
}

const ConstructorEditor: React.SFC<IConstructorEditorProps> = (props) => (
    <div className="b-constructor">
        <div className="b-constructor__left-panel">
            <div className="b-panel">
                <div className="b-panel__header">
                    <div className="b-panel__header__text">
                        Objects
                    </div>
                    <div className="b-panel__header__toggle"/>
                </div>
                <div className="b-panel__body">
                    <ul className="b-category-list">
                        <li>
                            <img src={imgGroup11} />
                            Structure
                        </li>
                        <li>
                            <img src={imgGroup12} />
                            Text
                        </li>
                        <li>
                            <img src={imgGroup37} />
                            Lists
                        </li>
                        <li>
                            <img src={imgGroup36} />
                            Containers
                        </li>
                        <li>
                            <img src={imgGroup34} />
                            Forms
                        </li>
                        <li>
                            <img src={imgGroup35} />
                            Image
                        </li>
                        <li>
                            <img src={imgStroke75} />
                            Navigation
                        </li>
                        <li>
                            <img src={imgGroup13} />
                            Tables
                        </li>
                        <li/>
                    </ul>
                </div>
            </div>
            <div className="b-panel">
                <div className="b-panel__header">
                    <div className="b-panel__header__text">
                        Structure
                    </div>
                    <div className="b-panel__header__toggle"/>
                </div>
                <div className="b-panel__body">
                    <ul className="b-tree">
                        <li>
                            <i className="fa fa-caret-down"/>
                            HTML
                        </li>
                        <li>
                            <span className="b-tree-indent"/>
                            <i className="fa fa-caret-right"/>
                            Header
                        </li>
                        <li>
                            <span className="b-tree-indent"/>
                            <i className="fa fa-caret-down"/>
                            Body
                        </li>
                        <li>
                            <span className="b-tree-indent"/>
                            <span className="b-tree-indent"/>
                            <i className="fa fa-caret-down"/>
                            Header
                        </li>
                        <li className="selected">
                            <i className="fa fa-close b-tree-delete"/>
                            <span className="b-tree-indent"/>
                            <span className="b-tree-indent"/>
                            <span className="b-tree-indent"/>
                            <i className="fa fa-caret-down"/>
                            Paragraph
                        </li>
                        <li>
                            <span className="b-tree-indent"/>
                            <span className="b-tree-indent"/>
                            <span className="b-tree-indent"/>
                            <i/>
                            Strong
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="b-constructor__center-panel">
            <div className="b-instrument-panel b-panel-light">
                <div className="b-instrument-panel__inner pull-left">
                    <div className="b-icon pull-left">
                        <img src={imgUndo} />
                    </div>
                    <div className="b-icon pull-left">
                        <img src={imgRedo} />
                    </div>
                </div>
                <div className="b-instrument-panel__inner b-instrument-panel__inner_dark pull-left">
                    <div className="b-page-title">
                        {props.page ?
                            (
                                props.page.name
                            ) : (
                            'New page'
                        )
                        }
                        &nbsp;&nbsp;<i className="fa fa-close"/>
                    </div>
                </div>
                <div className="b-instrument-panel__inner pull-right">
                    <div className="b-icon-group pull-left">
                        <div className="b-icon pull-left">
                            <img src={imgViewMobile} />
                        </div>
                        <div className="b-icon pull-left">
                            <img src={imgViewTablet} />
                        </div>
                        <div className="b-icon pull-left">
                            <img src={imgViewLaptop} />
                        </div>
                        <div className="b-icon pull-left">
                            <img src={imgViewDesktop} />
                        </div>
                    </div>
                    <div className="b-icon-group pull-left">
                        <div className="b-switch">
                            <span>GRID</span>
                            <img src={imgSwitchOn} />
                        </div>

                        <div className="b-switch">
                            <span>SNAP</span>
                            <img src={imgSwitchOn} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="b-instrument-panel">
                <div className="b-instrument-panel__inner pull-right"/>
            </div>

            <div className="b-grid">
                {props.template}
                <br/>
                <br/>
                {JSON.stringify(props.treeCode)}
            </div>

        </div>
        <div className="b-constructor__right-panel">
            <div className="b-panel">
                <div className="b-panel__header">
                    <div className="b-panel__header__text">
                        Properties
                    </div>
                </div>
                <div className="b-panel__body">
                    <div className="content-wrapper b-panel-light">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-xs-3 control-label g-no-padding"><small>ID</small></label>
                                <Col xs={9}>
                                    <input type="text" className="form-control input-sm" placeholder="Element ID"/>
                                </Col>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-3 control-label g-no-padding"><small>CSS CLASS</small></label>
                                <Col xs={9}>
                                    <input type="text" className="form-control input-sm" placeholder="Element Classes"/>
                                </Col>
                            </div>
                        </form>
                    </div>
                    <div className="content-wrapper"/>
                    <div className="content-wrapper b-panel-light">
                        <Row className="g-padding-bottom">
                            <Col xs={3} className="text-uppercase">
                                position
                            </Col>
                            <Col xs={9}>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet b-position-bullet_selected"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                                <div className="b-position-bullet"/>
                            </Col>
                        </Row>
                        <Row className="g-padding-bottom">
                            <Col xs={4} className="text-center">
                                <div className="text-uppercase">
                                    alignment
                                </div>
                                <div className="b-bullet b-bullet_selected">
                                    <img src={imgAlignLeft} />
                                </div>
                                <div className="b-bullet">
                                    <img src={imgAlignCenter} />
                                </div>
                                <div className="b-bullet">
                                    <img src={imgAlignRight} />
                                </div>
                            </Col>
                            <Col xs={4} className="text-center">
                                <div className="text-uppercase">
                                    transform
                                </div>
                                <div className="b-bullet b-bullet_selected">
                                    <img src={imgUppercase} />
                                </div>
                                <div className="b-bullet">
                                    <img src={imgLowercase} />
                                </div>
                            </Col>
                            <Col xs={4} className="text-center">
                                <div className="text-center text-uppercase">
                                    no wrap
                                </div>
                                <div className="b-switch">
                                    <img src={imgSwitchOff} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-padding-bottom">
                            <Col xs={12}>
                                <div className="text-uppercase">
                                    color
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="b-bullet-color b-bullet-color_blue"/>
                                <div className="b-bullet-color b-bullet-color_green b-bullet-color_selected"/>
                                <div className="b-bullet-color b-bullet-color_red"/>
                                <div className="b-bullet-color b-bullet-color_yellow"/>
                                <div className="b-bullet-color b-bullet-color_magenta"/>
                                <div className="b-bullet-color b-bullet-color_dark-blue"/>
                                <div className="b-bullet-color b-bullet-color_light-grey"/>
                                <div className="b-bullet-color b-bullet-color_black"/>
                                <div className="b-bullet-color b-bullet-color_grey"/>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        </div>

    </div>

);

export default ConstructorEditor;