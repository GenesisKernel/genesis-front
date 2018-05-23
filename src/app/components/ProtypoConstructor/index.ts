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

import ProtypoConstructor from './ProtypoConstructor';
import Button from './handlers/Button';
import If from './handlers/If';
import ElseIf from './handlers/ElseIf';
import Else from './handlers/Else';
import Div from './handlers/Div';
import Span from './handlers/Span';
import Strong from './handlers/Strong';
import Em from './handlers/Em';
import Form from './handlers/Form';
import Image from './handlers/Image';
import ImageInput from './handlers/ImageInput';
import Input from './handlers/Input';
import Label from './handlers/Label';
import P from './handlers/P';
import RadioGroup from './handlers/RadioGroup';

import Table from './handlers/Table';
import Logic from './handlers/Logic';

const handlers = {
    'button': Button,
    'if': If,
    'elseif': ElseIf,
    'else': Else,
    'div': Div,
    'span': Span,
    'strong': Strong,
    'em': Em,
    'form': Form,
    'image': Image,
    'imageinput': ImageInput,
    'input': Input,
    'label': Label,
    'p': P,
    'radiogroup': RadioGroup,
    'table': Table
};

export const resolveHandler = (name: string) => {
    return handlers[name] || Logic;
};

export default ProtypoConstructor;