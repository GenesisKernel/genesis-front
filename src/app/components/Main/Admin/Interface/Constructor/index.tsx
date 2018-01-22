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
import Layout from './Layout';
import EditPage from 'components/Main/Admin/Interface/EditPage';

import Panel from './Panel';

import SourceElements from './SourceElements';
import Properties from './Properties';
import Switch from './Switch';
// import SortableTree from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
// import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
// import TreeTheme from './Tree/Theme';

import imgGrid from 'images/constructor/grid.png';

interface IConstructorProps {
    pageTree: any;
    treeData: any;
    page?: any;
    pageTemplate: string;
    changePage?: any;
    setTagCanDropPosition?: any;
    selectTag?: any;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
    removeTag?: any;
    selectedTag?: any;
    grid: boolean;
    toggleGrid: any;
    undo?: any;
    redo?: any;
    canUndo: boolean;
    canRedo: boolean;

    navigatePage?: (params: { name: string, params?: any }) => void;
    menus?: { id: string, name: string, conditions: string, value: string }[];
    onSave?: (block: string, error?: { type: string, error: string }) => void;
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
    
    .b-constructor-layout_can-drop {
        background-color: rgba(150, 190, 255, 0.3);
    }

`;

const Constructor: React.SFC<IConstructorProps> = (props) => (
    <ConstructorDiv>
        <div className="left-panel">
            <Panel title="Objects">
                <SourceElements/>
            </Panel>

            <div style={{ height: 500 }}>
                <SortableTree
                    treeData={props.treeData}
                    onChange={(treeData: any) => {}}
                />
            </div>

            {/*<Panel title="Structure">
                <ul className="b-tree">
                    <li>
                        <i className="fa fa-caret-down" />
                        HTML
                    </li>
                    <li>
                        <span className="b-tree-indent" />
                        <i className="fa fa-caret-right" />
                        Header
                    </li>
                    <li>
                        <span className="b-tree-indent" />
                        <i className="fa fa-caret-down" />
                        Body
                    </li>
                    <li>
                        <span className="b-tree-indent" />
                        <span className="b-tree-indent" />
                        <i className="fa fa-caret-down" />
                        Header
                    </li>
                    <li className="selected">
                        <i className="fa fa-close b-tree-delete" />
                        <span className="b-tree-indent" />
                        <span className="b-tree-indent" />
                        <span className="b-tree-indent" />
                        <i className="fa fa-caret-down" />
                        Paragraph
                    </li>
                    <li>
                        <span className="b-tree-indent" />
                        <span className="b-tree-indent" />
                        <span className="b-tree-indent" />
                        <i />
                        Strong
                    </li>
                </ul>
            </Panel>
            */}
        </div>
        <div className="center-panel">
            <div className="b-instrument-panel b-panel-light">
                <div className="b-instrument-panel__inner pull-left">
                    <button className={props.canUndo ? 'btn-container btn-container_active' : 'btn-container btn-container_disabled'} onClick={props.undo}>
                        <i className="apla-icon-undo apla-icon_big"/>
                    </button>
                    <button className={props.canRedo ? 'btn-container btn-container_active' : 'btn-container btn-container_disabled'} onClick={props.redo}>
                        <i className="apla-icon-redo apla-icon_big"/>
                    </button>
                </div>
                <div className="b-instrument-panel__inner pull-right">
                    {/*
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
                    */}
                    <div className="b-icon-group pull-left">
                        <div className="b-switch">
                            <span>GRID</span>
                            <Switch initialValue={props.grid ? 'grid' : ''} onValue="grid" offValue="" onChange={props.toggleGrid} />
                        </div>
                        {/*
                         <div className="b-switch">
                         <span>SNAP</span>
                         <Switch initialValue="snap" onValue="snap" offValue="" />
                         </div>
                         */
                        }
                    </div>

                </div>
            </div>

            <Layout grid={props.grid} addTag={props.addTag} moveTag={props.moveTag} copyTag={props.copyTag}>
                <Protypo
                    context="page"
                    payload={props.pageTree}
                    editable={true}
                    changePage={props.changePage}
                    setTagCanDropPosition={props.setTagCanDropPosition}
                    selectTag={props.selectTag}
                    addTag={props.addTag}
                    moveTag={props.moveTag}
                    copyTag={props.copyTag}
                    removeTag={props.removeTag}
                    selectedTag={props.selectedTag}
                />
            </Layout>

        </div>
        <div className="right-panel">
            <Properties
                tag={props.selectedTag}
                changePage={props.changePage}
            />
            <EditPage page={props.page} pageTemplate={props.pageTemplate} menus={props.menus} tabView={true} saveButton={true} navigatePage={props.navigatePage} onExec={props.onSave}/>
        </div>
    </ConstructorDiv>

);

export default Constructor;