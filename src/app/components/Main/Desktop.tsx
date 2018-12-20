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
import required from 'services/forms/validation/generic/required';
import minLength from 'services/forms/validation/strings/minLength';
import maxLength from 'services/forms/validation/strings/maxLength';

import Form from 'components/Form';
import Button from 'components/Form/Button';
import { TextInput, Checkbox, RadioGroup, FileInput } from 'containers/Form/inputs';
import Label from 'components/Form/Label';

export interface IDesktopProps {

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
                <div style={{ width: 200, padding: 20 }}>
                    <Form>
                        <button onClick={this.onHideToggle}>Hide toggle</button>
                        <Label>Simple text input. MinLength(3), MaxLength(5)</Label>
                        <TextInput name="first" placeholder="This is the first input..." validate={[required, minLength(3), maxLength(5)]} />

                        <Label>File input</Label>
                        <FileInput name="file" placeholder="Select file..." validate={[required]} />

                        <Label required>Checkbox picker. Required</Label>
                        <Checkbox name="picker" validate={required} defaultValue>Must be picked</Checkbox>

                        <Label>Checkbox with default value</Label>
                        <Checkbox name="picker2" defaultValue>Doesn't care to be picked</Checkbox>

                        <Label disabled>Disabled checkbox</Label>
                        <Checkbox name="disabledPicker" disabled>Disabled picker</Checkbox>

                        <Label disabled>Disabled and checked picker</Label>
                        <Checkbox name="disabledCheckedPicker" disabled defaultValue>Disabled checked picker</Checkbox>

                        <Label required>Radio group. Required</Label>
                        <RadioGroup
                            name="rg"
                            items={[
                                { key: 'first', content: 'First element' },
                                { key: 'second', content: 'Second element' },
                                { key: 'third', disabled: true, content: 'Third element' },
                                { key: 'fourth', disabled: true, content: 'Fourth element' },
                            ]}
                            defaultValue="third"
                            validate={required}
                        />
                        {!this.state.hideToggle && (
                            <>
                                <Label>Hidden texbox. MinLength(3)</Label>
                                <TextInput name="second" defaultValue="SECOND_DEFAULT" validate={minLength(3)} />

                                <Label>Hidden input. MaxLength(5)</Label>
                                <TextInput name="third" validate={maxLength(5)} />
                            </>
                        )}
                        <Label>Proceed when you are done with inputs</Label>
                        <Button type="submit">Launch!</Button>
                        <Button>Button</Button>
                        <Button disabled>Disabled</Button>
                    </Form>

                    <Label>TextInput that is not attached to the form</Label>
                    <TextInput name="hello" disabled value="Hello world" />
                    <TextInput name="hello" disabled placeholder="Hello world" />
                </div>
            </div>
        );
    }
}

export default Desktop;