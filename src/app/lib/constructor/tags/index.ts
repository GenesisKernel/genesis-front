// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
//
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import Button from './Button';
import DBFind from './DBFind';
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
        'dbfind': DBFind,
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
