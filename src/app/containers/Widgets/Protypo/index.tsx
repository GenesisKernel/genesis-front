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

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';
import { displayData } from 'modules/content/actions';
import { navigatePage, menuPush } from 'modules/navigator/actions';
import { TProtypoElement } from 'genesis/protypo';

import Protypo from 'components/Protypo';

export interface IProtypoContainerProps {
    editable?: boolean;
    wrapper?: JSX.Element;
    context: string;
    content: TProtypoElement[];
    changePage?: any;
    setTagCanDropPosition?: any;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
    removeTag?: any;
    selectTag?: any;
    selectedTag?: any;
    logic?: boolean;
    section: string;
    page?: string;
    menu?: string;
}

interface IProtypoContainerState {
    apiHost: string;
}

interface IProtypoContainerDispatch {
    navigatePage: typeof navigatePage.started;
    navigate: typeof navigate;
    menuPush: typeof menuPush;
    displayData: typeof displayData.started;
}

const ProtypoContainer: React.SFC<IProtypoContainerState & IProtypoContainerDispatch & IProtypoContainerProps> = (props) => (
    <Protypo {...props} />
);

const mapStateToProps = (state: IRootState, props: IProtypoContainerProps) => ({
    apiHost: state.auth.session && (state.auth.session.apiHost + '/api/v2'),
    page: props.page
});

const mapDispatchToProps = {
    navigatePage: navigatePage.started,
    navigate,
    menuPush,
    displayData: displayData.started
};

export default connect<IProtypoContainerState, IProtypoContainerDispatch, IProtypoContainerProps, IRootState>(mapStateToProps, mapDispatchToProps)(ProtypoContainer);