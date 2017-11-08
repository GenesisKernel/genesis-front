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
import * as Pica from 'pica';
import { readBinaryFile } from 'lib/fs';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Well } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface IImageEditorModalProps {
    data: string;
    aspectRatio: number;
    width: number;
    onSuccess: (result: string) => void;
}

class ImageEditorModal extends React.Component<IImageEditorModalProps> {
    private _cropper: Cropper = null;

    onSuccess() {
        const input = this._cropper.getCroppedCanvas();

        if (this.props.width) {
            const output = document.createElement('canvas');
            const pica = Pica();

            if (input.width > input.height) {
                const ratio = input.width / input.height;
                output.width = this.props.width;
                output.height = this.props.width / ratio;
            }
            else {
                const ratio = input.height / input.width;
                output.width = this.props.width / ratio;
                output.height = this.props.width;
            }

            pica.resize(input, output)
                .then((result: any) => pica.toBlob(result, 'image/png', 1))
                .then((blob: any) => readBinaryFile(blob))
                .then((result: string) => this.props.onSuccess(result));
        }
        else {
            this.props.onSuccess(input.toDataURL());
        }
    }

    render() {
        return (
            <Modal show={!!this.props.data} onHide={() => undefined as any}>
                <Modal.Header>
                    <Modal.Title>
                        <FormattedMessage id="modal.imageeditor.title" defaultMessage="Image editor" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Well>
                        <FormattedMessage id="modal.imageeditor.desc" defaultMessage="Prepare your image for uploading by selecting which part of the image you want to use" />
                    </Well>
                    <Cropper
                        ref={(ref: any) => this._cropper = ref}
                        src={this.props.data}
                        style={{ maxHeight: 400, width: '100%' }}
                        aspectRatio={this.props.aspectRatio}
                        viewMode={1}
                    />
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onSuccess.bind(null, null)}>
                        <FormattedMessage id="modal.imageeditor.cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button type="button" bsStyle="primary" onClick={this.onSuccess.bind(this)}>
                        <FormattedMessage id="modal.imageeditor.confirm" defaultMessage="Confirm" />
                    </Button>
                </Modal.Footer>
            </Modal >
        );
    }
}

export default ImageEditorModal;