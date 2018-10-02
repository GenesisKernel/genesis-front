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
import uuid from 'uuid';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { buttonInteraction } from 'modules/content/actions';

import ToolButton from 'components/Protypo/components/ToolButton';

export interface IToolButtonProps {
    title?: string;
    icon?: string;
    // Redirect if all previous actions succeeded
    page?: string;
    pageparams?: {
        [name: string]: string;
    };

    // Page must be rendered within a modal dialog
    popup?: {
        header?: string;
        width?: string;
    };
}

interface IToolButtonState {
}

interface IToolButtonDispatch {
    buttonInteraction: typeof buttonInteraction;
}

class ToolButtonContainer extends React.Component<IToolButtonProps & IToolButtonState & IToolButtonDispatch> {
    private _uuid: string = null;

    onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this._uuid = uuid.v4();

        const pageParams = this.props.pageparams;

        if (null === pageParams) {
            return;
        }

        let popup: { title?: string, width?: number } = null;
        if (this.props.popup) {
            const width = parseInt(this.props.popup.width, 10);
            popup = {
                title: this.props.popup.header,
                width: width === width ? width : null
            };
        }

        this.props.buttonInteraction({
            uuid: this._uuid,
            popup,
            contracts: [],
            page: this.props.page ? {
                name: this.props.page,
                params: pageParams
            } : null
        });
    }

    render() {
        return (
            <ToolButton {...this.props} onClick={this.onClick} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
});

const mapDispatchToProps = {
    buttonInteraction
};

export default connect<IToolButtonState, IToolButtonDispatch, IToolButtonProps>(mapStateToProps, mapDispatchToProps)(ToolButtonContainer);