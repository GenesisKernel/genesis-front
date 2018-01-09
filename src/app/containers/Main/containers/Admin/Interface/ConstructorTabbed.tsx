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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { getPageTree, changePage, setTagCanDropPosition, addTag, moveTag, removeTag, selectTag, constructorUndo, constructorRedo, saveConstructorHistory } from 'modules/admin/actions';
import Constructor from 'components/Main/Admin/Interface/Constructor';
import { CodeGenerator } from 'lib/constructor';
import { IProtypoElement } from 'components/Protypo/Protypo';

// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';

export interface IConstructorTabbedContainerProps {
    pageID: string;
    pageName: string;
    vde?: boolean;
}

interface IConstructorTabbedContainerState {
    session: string;
    tabData: {
        [key: string]: {
            type: string,
            data: any,
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
    changePage: typeof changePage;
    setTagCanDropPosition: typeof setTagCanDropPosition;
    addTag: typeof addTag;
    moveTag: typeof moveTag;
    removeTag: typeof removeTag;
    selectTag: typeof selectTag;
    constructorUndo: typeof constructorUndo;
    constructorRedo: typeof constructorRedo;
    saveConstructorHistory: typeof saveConstructorHistory;
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
        this.props.getPageTree({
            id: this.props.pageID,
            name: this.props.pageName,
            vde: this.props.vde
        });
    }

    changePage(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.changePage(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID});
    }

    addTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.addTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID});
    }

    moveTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.moveTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID});
    }

    removeTag(payload?: any) {
        payload.pageID = this.props.pageID;
        payload.vde = this.props.vde;
        this.props.removeTag(payload);
        this.props.saveConstructorHistory({pageID: this.props.pageID});
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

    save() {
        const pageTreeTab = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID + (this.props.vde ? '-vde' : '')] || null;
        let pageTree = null;
        if (pageTreeTab) {
            pageTree = pageTreeTab.data;
        }

        let codeGenerator = new CodeGenerator(pageTree);
        alert(codeGenerator.render());
    }

    render() {
        const pageTree = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID + (this.props.vde ? '-vde' : '')] && this.props.tabData['interfaceConstructor' + this.props.pageID + (this.props.vde ? '-vde' : '')].data || null;
        const selectedTag = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID + (this.props.vde ? '-vde' : '')] && this.props.tabData['interfaceConstructor' + this.props.pageID + (this.props.vde ? '-vde' : '')].selectedTag || null;
        const canUndo = this.props.tabHistory && this.props.tabHistory['page' + this.props.pageID + (this.props.vde ? '-vde' : '')] && this.props.tabHistory['page' + this.props.pageID + (this.props.vde ? '-vde' : '')].canUndo || false;
        const canRedo = this.props.tabHistory && this.props.tabHistory['page' + this.props.pageID + (this.props.vde ? '-vde' : '')] && this.props.tabHistory['page' + this.props.pageID + (this.props.vde ? '-vde' : '')].canRedo || false;

        return (
            <Constructor
                pageTree={pageTree}
                changePage={this.changePage.bind(this)}
                setTagCanDropPosition={this.setTagCanDropPosition.bind(this)}
                selectTag={this.selectTag.bind(this)}
                addTag={this.addTag.bind(this)}
                moveTag={this.moveTag.bind(this)}
                removeTag={this.removeTag.bind(this)}
                save={this.save.bind(this)}
                selectedTag={selectedTag}
                grid={this.state.grid}
                toggleGrid={this.toggleGrid.bind(this)}
                undo={this.undo.bind(this)}
                redo={this.redo.bind(this)}
                canUndo={canUndo}
                canRedo={canRedo}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabData: state.admin.tabs && state.admin.tabs.data || null,
    tabHistory: state.admin.tabs && state.admin.tabs.history || null,
    session: state.auth.sessionToken
});

const mapDispatchToProps = {
    getPageTree: getPageTree.started,
    changePage,
    setTagCanDropPosition,
    addTag,
    moveTag,
    removeTag,
    selectTag,
    constructorUndo,
    constructorRedo,
    saveConstructorHistory
};

export default connect<IConstructorTabbedContainerState, IConstructorTabbedContainerDispatch, IConstructorTabbedContainerProps>(mapStateToProps, mapDispatchToProps)(ConstructorTabbedContainer);

// export default DragDropContext(HTML5Backend)(
//     connect<IConstructorTabbedContainerState, IConstructorTabbedContainerDispatch, IConstructorTabbedContainerProps>(mapStateToProps, mapDispatchToProps)(ConstructorTabbedContainer)
// );