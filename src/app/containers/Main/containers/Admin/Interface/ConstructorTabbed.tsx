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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { getPageTree, selectTag, changePage, saveConstructorHistory, constructorUndo, constructorRedo, setTagCanDropPosition, addTag, copyTag, moveTag, removeTag, moveTreeTag } from 'modules/editor/actions';
import Constructor from 'components/Main/Admin/Interface/Constructor';
import { TProtypoElement } from 'genesis/protypo';
import { generatePageTemplate } from 'modules/editor/actions';
import { IChangePageCall, TConstructorData, IAddTagCall, IOperateTagCall, IMoveTreeTag, ISetTagCanDropPositionCall } from 'genesis/editor';

export interface IConstructorTabbedContainerProps {
    pageID: string;
    pageName: string;
    menus?: { id: string, name: string, conditions: string, value: string }[];
    onSave?: (pageID: string) => void;
    random?: number;
}

interface IConstructorTabbedContainerState {
    data?: TConstructorData;
    history?: {
        data: TProtypoElement[][],
        position?: number,
        canUndo?: boolean,
        canRedo?: boolean
    };
}

interface IConstructorTabbedContainerDispatch {
    getPageTree: typeof getPageTree.started;
    changePage: typeof changePage.started;
    setTagCanDropPosition: typeof setTagCanDropPosition.started;
    addTag: typeof addTag.started;
    moveTag: typeof moveTag.started;
    moveTreeTag: typeof moveTreeTag;
    copyTag: typeof copyTag.started;
    removeTag: typeof removeTag.started;
    selectTag: typeof selectTag.started;
    constructorUndo: typeof constructorUndo.started;
    constructorRedo: typeof constructorRedo.started;
    saveConstructorHistory: typeof saveConstructorHistory.started;
    generatePageTemplate: typeof generatePageTemplate;
}

interface IConstructorTabbedState {
    grid: boolean;
    logic: boolean;
    canSave: boolean;
}

class ConstructorTabbedContainer extends React.Component<IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch, IConstructorTabbedState> {
    constructor(props: IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch) {
        super(props);
        this.state = {
            grid: true,
            logic: true,
            canSave: false
        };
    }

    changePage(payload: IChangePageCall) {
        this.props.changePage(payload);
        this.props.saveConstructorHistory(null);
        this.generatePageTemplate();
    }

    addTag(payload?: IAddTagCall) {
        this.props.addTag(payload);
        this.props.saveConstructorHistory(null);
        this.generatePageTemplate();
    }

    moveTag(payload?: IOperateTagCall) {
        this.props.moveTag(payload);
        this.props.saveConstructorHistory(null);
        this.generatePageTemplate();
    }

    moveTreeTag(payload?: IMoveTreeTag) {
        this.props.moveTreeTag(payload);
        this.generatePageTemplate();
    }

    copyTag(payload?: IOperateTagCall) {
        this.props.copyTag(payload);
        this.props.saveConstructorHistory(null);
        this.generatePageTemplate();
    }

    removeTag(payload?: IOperateTagCall) {
        this.props.removeTag(payload);
        this.props.saveConstructorHistory(null);
        this.generatePageTemplate();
    }

    setTagCanDropPosition(payload?: ISetTagCanDropPositionCall) {
        this.props.setTagCanDropPosition(payload);
    }

    selectTag(payload: any) {
        this.props.selectTag(payload);
    }

    toggleGrid() {
        this.setState({
            ...this.state,
            grid: !this.state.grid
        });
    }

    toggleLogic() {
        this.setState({
            ...this.state,
            logic: !this.state.logic
        });
    }

    undo() {
        this.props.constructorUndo(null);
        this.generatePageTemplate();
    }

    redo() {
        this.props.constructorRedo(null);
        this.generatePageTemplate();
    }

    onSave(block: string, error?: { type: string, error: string }) {
        if (this.props.onSave) {
            this.props.onSave(this.props.pageID);
        }
    }

    generatePageTemplate() {
        this.props.generatePageTemplate(this.props.pageID);
    }

    render() {
        const data = this.props.data;
        const history = this.props.history;

        const jsonData = data && data.jsonData || [];
        const treeData = data && data.treeData || [];
        const pageTemplate = data && data.pageTemplate || null;
        const selectedTag = data && data.selectedTag || null;

        const canUndo = history && history.canUndo || false;
        const canRedo = history && history.canRedo || false;

        return (
            <Constructor
                pageTree={jsonData}
                treeData={treeData}
                changePage={this.changePage.bind(this)}
                setTagCanDropPosition={this.setTagCanDropPosition.bind(this)}
                selectTag={this.selectTag.bind(this)}
                addTag={this.addTag.bind(this)}
                moveTag={this.moveTag.bind(this)}
                moveTreeTag={this.moveTreeTag.bind(this)}
                copyTag={this.copyTag.bind(this)}
                removeTag={this.removeTag.bind(this)}
                selectedTag={selectedTag}
                grid={this.state.grid}
                logic={this.state.logic}
                toggleGrid={this.toggleGrid.bind(this)}
                toggleLogic={this.toggleLogic.bind(this)}
                undo={this.undo.bind(this)}
                redo={this.redo.bind(this)}
                canUndo={canUndo}
                canRedo={canRedo}
                pageTemplate={pageTemplate}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    const currentTab = state.editor.tabs[state.editor.tabIndex];

    return {
        data: currentTab.designer && currentTab.designer.data || null,
        history: currentTab.designer && currentTab.designer.history || null
    };
};

const mapDispatchToProps = {
    getPageTree: getPageTree.started,
    changePage: changePage.started,
    setTagCanDropPosition: setTagCanDropPosition.started,
    addTag: addTag.started,
    moveTag: moveTag.started,
    moveTreeTag,
    copyTag: copyTag.started,
    removeTag: removeTag.started,
    selectTag: selectTag.started,
    constructorUndo: constructorUndo.started,
    constructorRedo: constructorRedo.started,
    saveConstructorHistory: saveConstructorHistory.started,
    generatePageTemplate
};

export default connect<IConstructorTabbedContainerState, IConstructorTabbedContainerDispatch, IConstructorTabbedContainerProps>(mapStateToProps, mapDispatchToProps)(ConstructorTabbedContainer);
