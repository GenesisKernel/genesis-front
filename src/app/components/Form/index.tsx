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
import { FormContext, IFormValuesCollection } from 'services/forms';

export interface IFormProps {
    name: string;
    values: IFormValuesCollection;
}

const Form: React.SFC<IFormProps> = props => (
    <FormContext.Provider value={props.name}>
        <div style={{ border: 'solid 1px #ccc', margin: 10, padding: 10 }}>
            <div style={{ color: '#999', fontSize: 12 }}>Form #{props.name}</div>
            <div>{props.children}</div>
            <div>
                <div style={{ color: '#999', fontSize: 12 }}>Values stack</div>
                <div>{JSON.stringify(props.values)}</div>
            </div>
        </div>
    </FormContext.Provider>
);

export default Form;