/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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