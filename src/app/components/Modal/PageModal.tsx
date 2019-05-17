/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import Modal from './';
import Protypo from 'containers/Widgets/Protypo';
import { TProtypoElement } from 'apla/protypo';

export interface IPageModalProps {
    title: string;
    width?: number;
    tree: TProtypoElement[];
}

class PageModal extends Modal<IPageModalProps, boolean> {
    onSuccess(values: { [key: string]: any }) {
        this.props.onResult(true);
    }

    render() {
        return (
            <div style={{ width: (this.props.params.width || 50) + 'vw', overflow: 'hidden' }}>
                <Modal.Header>
                    {this.props.params.title}
                </Modal.Header>
                <Modal.Body>
                    <Protypo context="page" content={this.props.params.tree} />
                </Modal.Body>
            </div>
        );
    }
}
export default PageModal;