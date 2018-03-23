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
import { history } from 'store';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalShow } from 'modules/modal/actions';
import { changeEditorTab, closeEditorTab, updateEditorTab, loadEditorTab, createEditorTab } from 'modules/editor/actions';
import { TEditorTab } from 'genesis/editor';
import { IModalResult } from 'genesis/modal';

import Editor from 'components/Main/Admin/Editor';

interface IEditorContainerProps {
    open?: string;
    create?: string;
    name?: string;
}

interface IEditorContainerState {
    tabIndex: number;
    tabs: TEditorTab[];
    modalResult: IModalResult;
}

interface IEditorContainerDispatch {
    modalShow: typeof modalShow;
    onTabCreate: typeof createEditorTab.started;
    onTabLoad: typeof loadEditorTab.started;
    onTabChange: typeof changeEditorTab;
    onTabClose: typeof closeEditorTab;
    onTabUpdate: typeof updateEditorTab;
}

class EditorContainer extends React.Component<IEditorContainerProps & InjectedIntlProps & IEditorContainerState & IEditorContainerDispatch> {
    private _pendingClose: number;

    componentWillReceiveProps(props: IEditorContainerProps & IEditorContainerState & IEditorContainerDispatch) {
        if ('number' === typeof this._pendingClose && props.modalResult) {
            if ('RESULT' === props.modalResult.reason) {
                this.props.onTabClose(this._pendingClose);
            }

            this._pendingClose = null;
        }
    }

    onTabCreate = (type: string) => {
        history.replace('/editor');
        this.props.onTabCreate(type);
    }

    onTabLoad = (params: { type: string, name: string }) => {
        history.replace('/editor');
        this.props.onTabLoad(params);
    }

    onTabClose = (index: number) => {
        const tab = this.props.tabs[index];

        if (tab.dirty) {
            this._pendingClose = index;
            this.props.modalShow({
                id: 'EDITOR_CLOSE',
                type: 'CONFIRM',
                params: {
                    description: this.props.intl.formatMessage({
                        id: 'editor.close.confirm',
                        defaultMessage: 'Do you really want to close \'{name}\' without saving changes?'
                    }, { name: tab.name })
                }
            });
        }
        else {
            this.props.onTabClose(index);
        }
    }

    render() {
        return (
            <Editor
                open={this.props.open}
                create={this.props.create}
                name={this.props.name}
                tabIndex={this.props.tabIndex}
                tabs={this.props.tabs}
                onTabCreate={this.onTabCreate}
                onTabLoad={this.onTabLoad}
                onTabChange={this.props.onTabChange}
                onTabUpdate={this.props.onTabUpdate}
                onTabClose={this.onTabClose}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabIndex: state.editor.tabIndex,
    tabs: state.editor.tabs,
    modalResult: state.modal.result
});

const mapDispatchToProps = {
    modalShow: modalShow,
    onTabCreate: createEditorTab.started,
    onTabLoad: loadEditorTab.started,
    onTabChange: changeEditorTab,
    onTabClose: closeEditorTab,
    onTabUpdate: updateEditorTab,
};

export default connect<IEditorContainerState, IEditorContainerDispatch, IEditorContainerProps>(mapStateToProps, mapDispatchToProps)(injectIntl(EditorContainer));