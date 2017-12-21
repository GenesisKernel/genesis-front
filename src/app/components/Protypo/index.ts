// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import Protypo from './Protypo';
import Button from './handlers/Button';
import Data from './handlers/Data';
import DBFind from './handlers/DBFind';
import Div from './handlers/Div';
import Em from './handlers/Em';
import ForList from './handlers/ForList';
import Form from './handlers/Form';
import Image from './handlers/Image';
import ImageInput from './handlers/ImageInput';
import Input from './handlers/Input';
import InputErr from './handlers/InputErr';
import Label from './handlers/Label';
import LinkPage from './handlers/LinkPage';
import MenuItem from './handlers/MenuItem';
import MenuGroup from './handlers/MenuGroup';
import P from './handlers/P';
import RadioGroup from './handlers/RadioGroup';
import Select from './handlers/Select';
import Span from './handlers/Span';
import Strong from './handlers/Strong';
import Table from './handlers/Table';

import setTitle from './functions/setTitle';
import addToolButton from './functions/addToolButton';

const handlers = {
    'button': Button,
    'data': Data,
    'dbfind': DBFind,
    'div': Div,
    'em': Em,
    'forlist': ForList,
    'form': Form,
    'image': Image,
    'imageinput': ImageInput,
    'input': Input,
    'inputerr': InputErr,
    'label': Label,
    'linkpage': LinkPage,
    'menuitem': MenuItem,
    'menugroup': MenuGroup,
    'p': P,
    'radiogroup': RadioGroup,
    'select': Select,
    'span': Span,
    'strong': Strong,
    'table': Table
};

const functions = {
    'settitle': setTitle,
    'addtoolbutton': addToolButton
};

export const resolveHandler = (name: string) => {
    return handlers[name];
};

export const resolveFunction = (name: string) => {
    return functions[name];
};

export default Protypo;