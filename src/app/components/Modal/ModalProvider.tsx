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
import { MODAL_COMPONENTS, IModal, TModalType } from 'lib/modal';

import Wrapper from 'components/Modal/Wrapper';
import { IModalProps } from '.';

export interface IModalProviderProps<T extends TModalType> {
    modal?: IModal<T>;
    onClose: () => void;
}

class ModalProvider<T extends TModalType> extends React.Component<IModalProviderProps<T>> {
    render() {
        const modal = this.props.modal;
        // TODO: refactoring
        const Component: React.ComponentType<IModalProps<any>> | undefined = modal && MODAL_COMPONENTS[modal.type] as any;
        return (
            <Wrapper>
                {modal && Component && (
                    <Component
                        onClose={this.props.onClose}
                        params={modal.params}
                    />
                )}
            </Wrapper>
        );
    }
}

export default ModalProvider;