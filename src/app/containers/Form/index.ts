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

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { changeValue, connectEmitter, disconnectEmitter } from 'modules/forms/actions';

import Form from 'components/Form';

export interface IFormProps {
    name: string;
}

const mapStateToProps = (state: IRootState, props: IFormProps) => ({
    values: state.forms[props.name] || {}
});

export default connect(mapStateToProps, {
    changeValue,
    connectEmitter,
    disconnectEmitter

}, (state, dispatch, props) => ({
    ...state,
    ...props,
    connectInput: (name: string, initialValue?: any) => dispatch.connectEmitter({
        form: props.name,
        name: name,
        value: initialValue
    }),
    disconnectInput: (name: string) => dispatch.disconnectEmitter({
        form: props.name,
        name: name
    }),
    onFieldChange: (name: string, value: any) => dispatch.changeValue({
        form: props.name,
        name: name,
        value: value
    })
}))(Form);