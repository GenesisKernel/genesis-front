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
import TextInput from 'components/Form/TextInput';
import Form from 'containers/Form';
import required from 'services/forms/validation/generic/required';
import minLength from 'services/forms/validation/strings/minLength';
import maxLength from 'services/forms/validation/strings/maxLength';

export interface IDesktopProps {
    formValues: {
        [name: string]: {
            [input: string]: {
                value: any;
            };
        };
    };
}

interface IDesktopState {
    hideToggle: boolean;
}

class Desktop extends React.Component<IDesktopProps, IDesktopState> {
    state: IDesktopState = {
        hideToggle: true
    };

    onHideToggle = () => {
        this.setState({
            hideToggle: !this.state.hideToggle
        });
    }

    render() {
        return (
            <div className="wrapper fullscreen" style={{ background: '#fff' }}>
                Hello world. Welcome to Desktop
                <Form name="debug_desktop">
                    <button onClick={this.onHideToggle}>Hide toggle</button>
                    <TextInput name="first" validate={[required, minLength(3), maxLength(5)]} />
                    {!this.state.hideToggle && (
                        <>
                            <TextInput name="second" defaultValue="SECOND_DEFAULT" validate={minLength(3)} />
                            <TextInput name="third" validate={maxLength(5)} />
                        </>
                    )}
                </Form>
                <TextInput name="hello" />
            </div>
        );
    }
}

export default Desktop;