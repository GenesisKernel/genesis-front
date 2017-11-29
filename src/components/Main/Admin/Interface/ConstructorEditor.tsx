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
import styled from 'styled-components';
import * as classnames from 'classnames';
import Protypo from 'containers/Widgets/Protypo';

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

import imgGrid from 'images/constructor/grid.png';

interface IConstructorEditorProps {
    session: string;
    pageTreeCode: any;
    page?: { id: string, name: string, value: string };
}

const ConstructorDiv = styled.div`
    margin: -20px;
    min-height: 300px;
    position: relative;
    height: 100%;

    .left-panel {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 286px;
        min-height: 100px;
    }
    
    .right-panel {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 286px;
        min-height: 100px;
    }
    
    .center-panel {
        margin: 0 286px 0 286px;
        min-height: 400px;
    }

`;

const PanelDiv = styled.div`

    .b-panel__header {
        position: relative;
        height: 31px;
        background-color: #3a4653;
        padding-left: 20px;
    }
    
    .b-panel__header__text {
        line-height: 31px;
        font-size: 14px;
        font-family: "Avenir-Book", "Source Sans Pro", sans-serif;
        text-transform: uppercase;
        color: #707c91;
    }
    
    .b-panel__header__toggle {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 16px;
        height: 3px;
        background-color: #dcdfe2;
        cursor: pointer;
    }
    
    .b-panel__body {
        background-color: #465669;
        min-height: 100px;
    }   
`;

const DivGrid = styled.div`
    margin: 0 20px;
    min-height: 600px;
    border-left: 1px solid #b1b1b1;
    border-right: 1px solid #b1b1b1;
    background-repeat: repeat;
    background-image: url(${imgGrid});
`;

interface IConstructorPanelProps {
    title: string;
}

const ConstructorPanel: React.SFC<IConstructorPanelProps> = (props) => (
    <PanelDiv>
        <div className="b-panel__header">
            <div className="b-panel__header__text">
                {props.title}
            </div>
            <div className="b-panel__header__toggle"/>
        </div>
        <div className="b-panel__body">
            {props.children}
        </div>
    </PanelDiv>
);

interface ICollapsedListItemProps {
    text: string;
    icon?: string;
}

interface ICollapsedListItemState {
    collapsed: boolean;
}

class CollapsedListItem extends React.Component<ICollapsedListItemProps, ICollapsedListItemState> {

    constructor(props: ICollapsedListItemProps) {
        super(props);
        this.state = {
            collapsed: true
        };
    }
    render() {
        const classes = classnames({
            collapsed: this.state.collapsed
        });

        return (
            <li className={classes}>
                <div onClick={this.toggleCollapsed.bind(this)}>
                    <img src={this.props.icon} />
                    {this.props.text}
                </div>
                {this.props.children}
            </li>
        );
    }
    toggleCollapsed() {
        this.setState({
           collapsed: !this.state.collapsed
        });
    }
}

const ConstructorEditor: React.SFC<IConstructorEditorProps> = (props) => (
    <ConstructorDiv>
        <div className="left-panel">
            <ConstructorPanel title="Objects">
                <ul className="b-category-list">
                    <CollapsedListItem text="Structure" icon={imgGroup11}>
                        <ul className="b-category-sublist">
                            <li>Panel</li>
                            <li>Block</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Text" icon={imgGroup12}>
                        <ul className="b-category-sublist">
                            <li>Heading</li>
                            <li>Paragraph</li>
                            <li>Span</li>
                            <li>Strong</li>
                            <li>Tag</li>
                            <li>Emphasize</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Lists" icon={imgGroup37}>
                        <ul className="b-category-sublist">
                            <li>Ordered</li>
                            <li>Unordered</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Containers" icon={imgGroup36}>
                        <ul className="b-category-sublist">
                            <li>Wrapper</li>
                            <li>Block</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Forms" icon={imgGroup34}>
                        <ul className="b-category-sublist">
                            <li>Form</li>
                            <li>Input</li>
                            <li>Button</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Image" icon={imgGroup35}>
                        <ul className="b-category-sublist">
                            <li>Picture</li>
                            <li>Animation</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Navigation" icon={imgStroke75}>
                        <ul className="b-category-sublist">
                            <li>Breadcrumps</li>
                            <li>Link</li>
                            <li>Back</li>
                        </ul>
                    </CollapsedListItem>
                    <CollapsedListItem text="Tables" icon={imgGroup13}>
                        <ul className="b-category-sublist">
                            <li>Table</li>
                            <li>Row</li>
                            <li>Column</li>
                        </ul>
                    </CollapsedListItem>
                    <li/>
                </ul>
            </ConstructorPanel>
            <ConstructorPanel title="Structure">
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
            </ConstructorPanel>
        </div>
        <div className="center-panel">
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

            <DivGrid>
                <Protypo
                    payload={props.pageTreeCode}
                    editable={true}
                />
            </DivGrid>

        </div>
        <div className="right-panel">
            <ConstructorPanel title="Properties">

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
            </ConstructorPanel>
        </div>
    </ConstructorDiv>

);

export default ConstructorEditor;