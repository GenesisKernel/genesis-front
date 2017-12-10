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
import { getPageTree, changePage  } from 'modules/admin/actions';
import Constructor from 'components/Main/Admin/Interface/Constructor';
import { CodeGenerator } from 'lib/constructor';

export interface IConstructorTabbedContainerProps {
    pageID: string;
    pageName: string;
    vde?: boolean;
}

interface IConstructorTabbedContainerState {
    session: string;
    tabData: any;
}

interface IConstructorTabbedContainerDispatch {
    getPageTree: typeof getPageTree.started;
    changePage: typeof changePage;
    // selectTag: typeof selectTag;
}

interface IConstructorTabbedState {
    selectedTag: any;
    grid: boolean;
}

class ConstructorTabbedContainer extends React.Component<IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch, IConstructorTabbedState> {
    constructor(props: IConstructorTabbedContainerProps & IConstructorTabbedContainerState & IConstructorTabbedContainerDispatch) {
        super(props);
        this.state = {
            selectedTag: null,
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
        this.props.changePage(payload);
    }

    selectTag(payload?: any) {
        this.setState({
            selectedTag: payload.tag
        });
    }

    toggleGrid() {
        this.setState({
            ...this.state,
            grid: !this.state.grid
        });
    }

    save() {
        let pageTree = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID] && this.props.tabData['interfaceConstructor' + this.props.pageID].data || null;
        let codeGenerator = new CodeGenerator(pageTree);
        alert(codeGenerator.render());
    }

    render() {
        let pageTree = this.props.tabData && this.props.tabData['interfaceConstructor' + this.props.pageID] && this.props.tabData['interfaceConstructor' + this.props.pageID].data || null;

        return (
            <Constructor
                pageTree={pageTree}
                changePage={this.changePage.bind(this)}
                selectTag={this.selectTag.bind(this)}
                save={this.save.bind(this)}
                selectedTag={this.state.selectedTag}
                grid={this.state.grid}
                toggleGrid={this.toggleGrid.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabData: state.admin.tabs && state.admin.tabs.data || null,
    session: state.auth.sessionToken
});

const mapDispatchToProps = {
    getPageTree: getPageTree.started,
    changePage
};

export default connect<IConstructorTabbedContainerState, IConstructorTabbedContainerDispatch, IConstructorTabbedContainerProps>(mapStateToProps, mapDispatchToProps)(ConstructorTabbedContainer);