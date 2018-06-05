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

import Button from './Button';
import Div from './Div';
import Em from './Em';
import Form from './Form';
import Image from './Image';
import ImageInput from './ImageInput';
import Input from './Input';
import Label from './Label';
import P from './P';
import RadioGroup from './RadioGroup';
import Span from './Span';
import Strong from './Strong';
import Table from './Table';
import If from './If';
import ElseIf from './ElseIf';
import Else from './Else';
import Logic from './Logic';

const tagHandlers = {
    list: {
        'button': Button,
        'div': Div,
        'em': Em,
        'form': Form,
        'image': Image,
        'imageinput': ImageInput,
        'input': Input,
        'label': Label,
        'p': P,
        'radiogroup': RadioGroup,
        'span': Span,
        'strong': Strong,
        'table': Table,
        'if': If,
        'elseif': ElseIf,
        'else': Else
    },
    default: Logic
};

const resolveTagHandler = (name: string) => {
    return tagHandlers.list[name] || tagHandlers.default;
};

export default resolveTagHandler;
