/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { editorSave, revertEditorTab, changeEditorTool, debugContract } from 'modules/editor/actions';
import { IModalResult } from 'apla/modal';
import { TEditorTab } from 'apla/editor';
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
    changeEditorTool: typeof changeEditorTool.started;
    revertEditorTab: typeof revertEditorTab;
    editorSave: typeof editorSave;
    onExec: typeof debugContract;
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

    onSave = () => {
        if (this.props.currentTab) {
            this.props.editorSave(this.props.currentTab);
        }
    }

    onExec = () => {
        this.props.onExec(this.props.currentTab.name);
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
    onExec: debugContract,
    revertEditorTab: revertEditorTab,
    changeEditorTool: changeEditorTool.started,
    editorSave
};

export default connect<IEditorToolbarState, IEditorToolbarDispatch, IEditorToolbarProps>(mapStateToProps, mapDispatchToProps)(injectIntl(EditorToolbarContainer));