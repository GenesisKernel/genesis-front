// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import SecurityWarning from 'components/SecurityWarning';
import { closeSecurityWarning } from 'modules/storage/actions';

export interface ISecurityWarningContainerProps {
    closed?: boolean;
}

interface ISecurityWarningContainerState {
}

interface ISecurityWarningContainerDispatch {
    close: () => void;
}

const SecurityWarningContainer: React.SFC<ISecurityWarningContainerProps & ISecurityWarningContainerState & ISecurityWarningContainerDispatch> = props => (
    <SecurityWarning {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    closed: state.storage.securityWarningClosed
});

const mapDispatchToProps = {
    close: closeSecurityWarning
};

export default connect<ISecurityWarningContainerState, ISecurityWarningContainerDispatch, ISecurityWarningContainerProps>(mapStateToProps, mapDispatchToProps)(SecurityWarningContainer);