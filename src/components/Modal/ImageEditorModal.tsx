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
            const output = document.createElement('canvas'),
                ctx = output.getContext('2d'),
                oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

            output.width = this.props.width;
            output.height = this.props.width * input.height / input.width;

            let current = {
                width: Math.floor(input.width * 0.5),
                height: Math.floor(input.height * 0.5)
            };

            oc.width = current.width;
            oc.height = current.height;

            octx.drawImage(input, 0, 0, current.width, current.height);

            while (current.width * 0.5 > this.props.width) {
                current = {
                    width: Math.floor(current.width * 0.5),
                    height: Math.floor(current.height * 0.5)
                };
                octx.drawImage(oc, 0, 0, current.width * 2, current.height * 2, 0, 0, current.width, current.height);
            }

            ctx.drawImage(oc, 0, 0, current.width, current.height, 0, 0, output.width, output.height);
            this.props.onSuccess(output.toDataURL());
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