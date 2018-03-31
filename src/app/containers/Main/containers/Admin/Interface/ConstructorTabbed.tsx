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
import { /*getPageTree, getPage, changePage, setTagCanDropPosition, addTag,*/ moveTag, moveTreeTag, copyTag, removeTag, /*selectTag,*/ constructorUndo, constructorRedo /*, saveConstructorHistory*/ } from 'modules/admin/actions';
import { getPageTree, selectTag, changePage, saveConstructorHistory, setTagCanDropPosition, addTag } from 'modules/editor/actions';
// import { navigatePage } from 'modules/content/actions';
import Constructor from 'components/Main/Admin/Interface/Constructor';
import { TProtypoElement } from 'genesis/protypo';
import { generatePageTemplate } from 'modules/editor/actions';
import { IChangePageCall } from 'genesis/editor';

export interface IConstructorTabbedContainerProps {
    pageID: string;
    pageName: string;
    // navigatePage?: (params: { name: string, params?: any }) => void;
    menus?: { id: string, name: string, conditions: string, value: string }[];
    onSave?: (pageID: string) => void;
    random?: number;
}

interface IConstructorTabbedContainerState {
    data?: any;
    history?: any;

    // todo: remove
    session?: string;
    tabData?: {
        [key: string]: {
            type: string,
            data: any,
            treeData?: any,
            pageTemplate?: string,
            selectedTag?: TProtypoElement
        }
    };
    tabHistory?: {
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
    // getPage?: typeof getPage.started;
    changePage: typeof changePage.started;
    setTagCanDropPosition: typeof setTagCanDropPosition.started;
    addTag: typeof addTag;
    moveTag: typeof moveTag;
    moveTreeTag: typeof moveTreeTag;
    copyTag: typeof copyTag;
    removeTag: typeof removeTag;
    selectTag: typeof selectTag;
    constructorUndo: typeof constructorUndo;
    constructorRedo: typeof constructorRedo;
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

    componentWillMount() {
        this.getPage();
    }

    /*componentWillReceiveProps(props: IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch) {
        if (props.random && this.props.random !== props.random) {
            this.getPage();
        }

        let canSave = true;
        const tabData = props.tabData && props.tabData['interfaceConstructor' + props.pageID];
        const pageTree = tabData && tabData.data || null;
        if (!pageTree || pageTree && pageTree.length === 0) {
            canSave = false;
        }

        this.setState({
            ...this.state,
            canSave
        });
    }*/

    getPage() {
        this.props.getPageTree({
            id: this.props.pageID,
            name: this.props.pageName
        });
        // this.props.getPage({
        //     name: this.props.pageName
        // });
    }

    changePage(payload: IChangePageCall) {
        // payload.pageID = this.props.pageID;
        this.props.changePage(payload);
        this.props.saveConstructorHistory({});
        // this.generatePageTemplate();
    }

    addTag(payload?: any) {
        payload.pageID = this.props.pageID;
        this.props.addTag(payload);
        this.props.saveConstructorHistory({});
        this.generatePageTemplate();
    }

    moveTag(payload?: any) {
        payload.pageID = this.props.pageID;
        this.props.moveTag(payload);
        this.props.saveConstructorHistory({});
        this.generatePageTemplate();
    }

    moveTreeTag(payload?: any) {
        payload.pageID = this.props.pageID;
        this.props.moveTreeTag(payload);
    }

    copyTag(payload?: any) {
        payload.pageID = this.props.pageID;
        this.props.copyTag(payload);
        this.props.saveConstructorHistory({});
        this.generatePageTemplate();
    }

    removeTag(payload?: any) {
        payload.pageID = this.props.pageID;
        this.props.removeTag(payload);
        this.props.saveConstructorHistory({});
        this.generatePageTemplate();
    }

    setTagCanDropPosition(payload?: any) {
        // payload.pageID = this.props.pageID;
        this.props.setTagCanDropPosition(payload);
    }

    selectTag(payload: {tag: TProtypoElement}) {
        this.props.selectTag({
            tag: payload.tag
        });
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
        this.props.constructorUndo({ pageID: this.props.pageID });
        this.generatePageTemplate();
    }

    redo() {
        this.props.constructorRedo({ pageID: this.props.pageID });
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
        // const tabData = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID];
        const data = this.props.data;
        const history = this.props.history;

        const jsonData = data && data.jsonData || null;
        const treeData = data && data.treeData || null;
        const pageTemplate = data && data.pageTemplate || null;
        const selectedTag = data && data.selectedTag || null;

        // const pageTree = tabData && tabData.data || null;
        // const treeData = tabData && tabData.treeData || null;
        // const pageTemplate = tabData && tabData.pageTemplate || null;
        // const selectedTag = tabData && tabData.selectedTag || null;
        // const tabHistory = this.props.tabHistory && this.props.tabHistory['page' + this.props.pageID];

        const canUndo = history && history.canUndo || false;
        const canRedo = history && history.canRedo || false;

        // const pageTab = this.props.tabData && this.props.tabData['interfacePage' + this.props.pageID] || null;
        // let page = null;
        // if (pageTab) {
        //     page = pageTab.data;
        // }

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

        /*page={page}
         menus={this.props.menus}
         navigatePage={this.props.navigatePage}
         onSave={this.onSave.bind(this)}
         canSave={this.state.canSave}*/
    }
}

const mapStateToProps = (state: IRootState) => {
    const currentTab = state.editor.tabs[state.editor.tabIndex];

    return {
        data: currentTab.designer && currentTab.designer.data || null,
        history: currentTab.designer && currentTab.designer.history || null
        // menus: state.admin.menus,
        // session: state.auth.sessionToken
    };
};

const mapDispatchToProps = {
    getPageTree: getPageTree.started,
    // getPage: getPage.started,
    // navigatePage: navigatePage.started,
    changePage: changePage.started,
    setTagCanDropPosition: setTagCanDropPosition.started,
    addTag,
    moveTag,
    moveTreeTag,
    copyTag,
    removeTag,
    selectTag,
    constructorUndo,
    constructorRedo,
    saveConstructorHistory: saveConstructorHistory.started,
    generatePageTemplate
};

export default connect<IConstructorTabbedContainerState, IConstructorTabbedContainerDispatch, IConstructorTabbedContainerProps>(mapStateToProps, mapDispatchToProps)(ConstructorTabbedContainer);
