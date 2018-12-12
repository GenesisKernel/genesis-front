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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalShow } from 'modules/modal/actions';
import { IMapEditorEvent, TMapEditorType, TMapType } from 'genesis/geo';
import { IModal } from 'lib/modal';

import { Validator } from 'components/Validation/Validators';
import ValidatedMap from 'components/Validation/ValidatedMap';

export interface IValidatedMapContainerProps {
    name: string;
    type: TMapEditorType;
    mapType?: TMapType;
    value?: IMapEditorEvent;
    center?: { lat: number, lng: number };
    zoom?: number;
    validators?: Validator[];
}

interface IValidatedMapContainerState {
    modal?: IModal<any>;
}

interface IValidatedMapContainerDispatch {
    modalShow: typeof modalShow;
}

class ValidatedMapContainer extends React.Component<IValidatedMapContainerProps & IValidatedMapContainerState & IValidatedMapContainerDispatch, { result?: IMapEditorEvent }> {
    constructor(props: any) {
        super(props);
        this.state = {
            result: undefined
        };
    }

    openEditor(params: { mime: string, coords: { lat: number, lng: number }[], data: string, aspectRatio: number, width: number }) {
        this.props.modalShow({
            type: 'MAP_EDITOR',
            params
        });
    }

    // componentWillReceiveProps(props: IValidatedMapContainerProps & IValidatedMapContainerState & IValidatedMapContainerDispatch) {
    componentWillReceiveProps() {
        // TODO: refactoring
        /*const result = props.modal && this._id === props.modal.id && props.modal.result;
        if (result && 'RESULT' === result.reason) {
            this.setState({
                result: result.data as any
            });
        }*/
    }

    render() {
        return (
            <ValidatedMap
                name={this.props.name}
                type={this.props.type}
                mapType={this.props.mapType}
                validators={this.props.validators}
                value={this.state.result || this.props.value}
                center={this.props.center}
                zoom={this.props.zoom}
                openEditor={() => this.openEditor.bind(this) as any}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    modal: state.modal.instance
});

const mapDispatchToProps = {
    modalShow: modalShow
};

export default connect<IValidatedMapContainerState, IValidatedMapContainerDispatch, IValidatedMapContainerProps, IRootState>(mapStateToProps, mapDispatchToProps)(ValidatedMapContainer);