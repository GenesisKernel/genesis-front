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
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { editorSave, revertEditorTab, changeEditorTool, createEditorTab } from 'modules/editor/actions';
import { IModalResult } from 'genesis/modal';
import { TEditorTab } from 'genesis/editor';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import EditorToolbar from 'components/Main/Toolbar/EditorToolbar';

export interface IEditorToolbarProps {

}

interface IEditorToolbarState {
    modalResult: IModalResult;
    currentTab: TEditorTab;
    currentTabIndex: number;
    canSave: boolean;
    canRevert: boolean;
}

interface IEditorToolbarDispatch {
    modalShow: typeof modalShow;
    createEditorTab: typeof createEditorTab.started;
    changeEditorTool: typeof changeEditorTool.started;
    revertEditorTab: typeof revertEditorTab;
    editorSave: typeof editorSave;
}

class EditorToolbarContainer extends React.Component<IEditorToolbarProps & InjectedIntlProps & IEditorToolbarState & IEditorToolbarDispatch> {
    private _pendingRevert: number;

    onRevert = () => {
        this._pendingRevert = this.props.currentTabIndex;
        this.props.modalShow({
            id: 'EDITOR_REVERT',
            type: 'CONFIRM',
            params: {
                description: this.props.intl.formatMessage({
                    id: 'editor.revert.confirm',
                    defaultMessage: 'Do you really want to discard all changes?'
                })
            }
        });
    }

    onExec = () => {
        this.props.modalShow({
            id: 'EDITOR_EXEC',
            type: 'DEBUG_CONTRACT',
            params: {
                contract: this.props.currentTab.name
            }
        });
    }

    onSave = () => {
        if (this.props.currentTab) {
            this.props.editorSave(this.props.currentTab);
        }
    }

    componentWillReceiveProps(props: IEditorToolbarProps & IEditorToolbarState & IEditorToolbarDispatch) {
        if ('number' === typeof this._pendingRevert && props.modalResult) {
            if ('RESULT' === props.modalResult.reason) {
                this.props.revertEditorTab(this._pendingRevert);
            }
            this._pendingRevert = null;
        }
    }

    render() {
        return (
            <EditorToolbar
                currentTab={this.props.currentTab}
                canRevert={this.props.canRevert}
                canSave={this.props.canSave}
                onCreate={this.props.createEditorTab}
                onExec={this.onExec}
                onRevert={this.onRevert}
                onToolChange={this.props.changeEditorTool}
                onSave={this.onSave}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    const currentTab = state.editor.tabs[state.editor.tabIndex];

    return {
        currentTab,
        currentTabIndex: state.editor.tabIndex,
        modalResult: state.modal.result,
        canSave: !state.editor.pending &&
            currentTab && currentTab.dirty,
        canRevert: !state.editor.pending &&
            currentTab && (currentTab.dirty && null !== currentTab.initialValue)
    };
};

const mapDispatchToProps = {
    modalShow: modalShow,
    createEditorTab: createEditorTab.started,
    revertEditorTab: revertEditorTab,
    changeEditorTool: changeEditorTool.started,
    editorSave
};

export default connect<IEditorToolbarState, IEditorToolbarDispatch, IEditorToolbarProps>(mapStateToProps, mapDispatchToProps)(injectIntl(EditorToolbarContainer));