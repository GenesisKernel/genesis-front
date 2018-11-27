// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as React from 'react';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { editorSave, revertEditorTab, changeEditorTool, debugContract } from 'modules/editor/actions';
import { TEditorTab } from 'genesis/editor';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import EditorToolbar from 'components/Main/Toolbar/EditorToolbar';

export interface IEditorToolbarProps {

}

interface IEditorToolbarState {
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
    onRevert = () => {
        // TODO: refactoring
        /*this._pendingRevert = this.props.currentTabIndex;
        this.props.modalShow({
            id: 'EDITOR_REVERT',
            type: 'CONFIRM',
            params: {
                description: this.props.intl.formatMessage({
                    id: 'editor.revert.confirm',
                    defaultMessage: 'Do you really want to discard all changes?'
                })
            }
        });*/
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
        // TODO: refactoring
        /*if ('number' === typeof this._pendingRevert && props.modalResult) {
            if ('RESULT' === props.modalResult.reason) {
                this.props.revertEditorTab(this._pendingRevert);
            }
            this._pendingRevert = undefined;
        }*/
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

export default connect<IEditorToolbarState, IEditorToolbarDispatch, IEditorToolbarProps, IRootState>(mapStateToProps, mapDispatchToProps)(injectIntl(EditorToolbarContainer));