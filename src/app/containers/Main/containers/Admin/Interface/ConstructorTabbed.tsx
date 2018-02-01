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
import { getPageTree, getPage, changePage, setTagCanDropPosition, addTag, moveTag, moveTreeTag, copyTag, removeTag, selectTag, constructorUndo, constructorRedo, saveConstructorHistory, generatePageTemplate } from 'modules/admin/actions';
import { navigatePage } from 'modules/content/actions';
import Constructor from 'components/Main/Admin/Interface/Constructor';
import { IProtypoElement } from 'components/Protypo/Protypo';

export interface IConstructorTabbedContainerProps {
    pageID: string;
    pageName: string;
    vde?: boolean;
    navigatePage?: (params: { name: string, params?: any }) => void;
    menus?: { id: string, name: string, conditions: string, value: string }[];
    onSave?: (pageID: string, vde?: boolean) => void;
    random?: number;
}

interface IConstructorTabbedContainerState {
    session: string;
    tabData: {
        [key: string]: {
            type: string,
            data: any,
            treeData?: any,
            pageTemplate?: string,
            selectedTag?: IProtypoElement
        }
    };
    tabHistory: {
        [key: string]: {
            data: any,
            position?: number,
            canUndo?: boolean,
            canRedo?: boolean
        }
    };
}

interface IConstructorTabbedContainerDispatch {
    getPageTree: typeof getPageTree.started;
    getPage?: typeof getPage.started;
    changePage: typeof changePage;
    setTagCanDropPosition: typeof setTagCanDropPosition;
    addTag: typeof addTag;
    moveTag: typeof moveTag;
    moveTreeTag: typeof moveTreeTag;
    copyTag: typeof copyTag;
    removeTag: typeof removeTag;
    selectTag: typeof selectTag;
    constructorUndo: typeof constructorUndo;
    constructorRedo: typeof constructorRedo;
    saveConstructorHistory: typeof saveConstructorHistory;
    generatePageTemplate: typeof generatePageTemplate;
}

interface IConstructorTabbedState {
    grid: boolean;
}

class ConstructorTabbedContainer extends React.Component<IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch, IConstructorTabbedState> {
    constructor(props: IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch) {
        super(props);
        this.state = {
            grid: true
        };
    }

    componentWillMount() {
        this.getPage();
    }

    componentWillReceiveProps(props: IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch) {
        if (props.random && this.props.random !== props.random) {
            this.getPage();
        }
    }

    getPage() {
        this.props.getPageTree({
            id: this.props.pageID,
            name: this.props.pageName,
            vde: this.props.vde
        });
        this.props.getPage({
            id: this.props.pageID,
            vde: this.props.vde
        });
    }

    changePage(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.changePage(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID, vde: this.props.vde});
        this.props.generatePageTemplate({pageID: this.props.pageID, vde: this.props.vde});
    }

    addTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.addTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID, vde: this.props.vde});
        this.props.generatePageTemplate({pageID: this.props.pageID, vde: this.props.vde});
    }

    moveTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.moveTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID, vde: this.props.vde});
        this.props.generatePageTemplate({pageID: this.props.pageID, vde: this.props.vde});
    }

    moveTreeTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.moveTreeTag(payload);
    }

    copyTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.copyTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID, vde: this.props.vde});
        this.props.generatePageTemplate({pageID: this.props.pageID, vde: this.props.vde});
    }

    removeTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.removeTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID, vde: this.props.vde});
        this.props.generatePageTemplate({pageID: this.props.pageID, vde: this.props.vde});
    }

    setTagCanDropPosition(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.setTagCanDropPosition(payload);
    }

    selectTag(payload?: any) {
        this.props.selectTag({
            pageID: this.props.pageID,
            vde: this.props.vde,
            tag: payload.tag
        });
    }

    toggleGrid() {
        this.setState({
            ...this.state,
            grid: !this.state.grid
        });
    }

    undo() {
        this.props.constructorUndo({pageID: this.props.pageID});
    }

    redo() {
        this.props.constructorRedo({pageID: this.props.pageID});
    }

    onSave(block: string, error?: { type: string, error: string }) {
        if (this.props.onSave) {
            this.props.onSave(this.props.pageID, this.props.vde);
        }
    }

    render() {
        const tabData = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID + (this.props.vde ? '-vde' : '')];
        const pageTree = tabData && tabData.data || null;
        const treeData = tabData && tabData.treeData || null;
        const pageTemplate = tabData && tabData.pageTemplate || null;
        const selectedTag = tabData && tabData.selectedTag || null;
        const tabHistory = this.props.tabHistory && this.props.tabHistory['page' + this.props.pageID + (this.props.vde ? '-vde' : '')];
        const canUndo = tabHistory && tabHistory.canUndo || false;
        const canRedo = tabHistory && tabHistory.canRedo || false;

        const pageTab = this.props.tabData && this.props.tabData['interfacePage' + this.props.pageID + (this.props.vde ? '-vde' : '')] || null;
        let page = null;
        if (pageTab) {
            page = pageTab.data;
        }

        return (
            <Constructor
                pageTree={pageTree}
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
                toggleGrid={this.toggleGrid.bind(this)}
                undo={this.undo.bind(this)}
                redo={this.redo.bind(this)}
                canUndo={canUndo}
                canRedo={canRedo}
                page={page}
                pageTemplate={pageTemplate}
                menus={this.props.menus}
                navigatePage={this.props.navigatePage}
                onSave={this.onSave.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabData: state.admin.tabs && state.admin.tabs.data || null,
    tabHistory: state.admin.tabs && state.admin.tabs.history || null,
    menus: state.admin.menus,
    session: state.auth.sessionToken
});

const mapDispatchToProps = {
    getPageTree: getPageTree.started,
    getPage: getPage.started,
    navigatePage: navigatePage.started,
    changePage,
    setTagCanDropPosition,
    addTag,
    moveTag,
    moveTreeTag,
    copyTag,
    removeTag,
    selectTag,
    constructorUndo,
    constructorRedo,
    saveConstructorHistory,
    generatePageTemplate
};

export default connect<IConstructorTabbedContainerState, IConstructorTabbedContainerDispatch, IConstructorTabbedContainerProps>(mapStateToProps, mapDispatchToProps)(ConstructorTabbedContainer);
