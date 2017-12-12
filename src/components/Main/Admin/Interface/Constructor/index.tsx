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
import styled from 'styled-components';

import Protypo from 'containers/Widgets/Protypo';
import CollapsedListItem from './CollapsedListItem';
import Panel from './Panel';
import Properties from './Properties';
import Switch from './Switch';

import imgViewMobile from 'images/constructor/group-2.svg';
import imgViewTablet from 'images/constructor/group.svg';
import imgViewLaptop from 'images/constructor/group-30.svg';
import imgViewDesktop from 'images/constructor/group-3.svg';
import imgUndo from 'images/constructor/group-7.svg';
import imgRedo from 'images/constructor/group-6.svg';
import imgGroup11 from 'images/constructor/group-11.svg';
import imgGroup12 from 'images/constructor/group-12.svg';
import imgGroup13 from 'images/constructor/group-13.svg';
import imgGroup34 from 'images/constructor/group-34.svg';
import imgGroup35 from 'images/constructor/group-35.svg';
import imgGroup36 from 'images/constructor/group-36.svg';
import imgGroup37 from 'images/constructor/group-37.svg';
import imgStroke75 from 'images/constructor/stroke-75.svg';
import imgGrid from 'images/constructor/grid.png';

interface IConstructorProps {
    pageTree: any;
    changePage?: any;
    selectTag?: any;
    selectedTag?: any;
    save?: any;
    grid: boolean;
    toggleGrid: any;
}

const ConstructorDiv = styled.div`
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
    
    .b-constructor-layout {
        margin: 0 20px;
        min-height: 600px;
        border-left: 1px solid #b1b1b1;
        border-right: 1px solid #b1b1b1;
        background-repeat: repeat;
        
    }
    
    .b-constructor-layout_grid {
        background-image: url(${imgGrid});
    }

`;

const Constructor: React.SFC<IConstructorProps> = (props) => (
    <ConstructorDiv>
        <div className="left-panel">
            <Panel title="Objects">
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
            </Panel>
            <Panel title="Structure">
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
            </Panel>
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
                            <Switch initialValue={props.grid ? 'grid' : ''} onValue="grid" offValue="" onChange={props.toggleGrid} />
                        </div>

                        <div className="b-switch">
                            <span>SNAP</span>
                            <Switch initialValue="snap" onValue="snap" offValue=""/>
                        </div>
                    </div>

                </div>
            </div>

            <div className={props.grid ? 'b-constructor-layout b-constructor-layout_grid' : 'b-constructor-layout'}>
                <Protypo
                    payload={props.pageTree}
                    editable={true}
                    changePage={props.changePage}
                    selectTag={props.selectTag}
                    selectedTag={props.selectedTag}
                />
            </div>

        </div>
        <div className="right-panel">
            <Properties
                tag={props.selectedTag}
                changePage={props.changePage}
            />
            <br/>
            <div className="btn btn-primary" onClick={props.save}>Save</div>
        </div>
    </ConstructorDiv>

);

export default Constructor;
