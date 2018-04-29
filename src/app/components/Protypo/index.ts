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

import Protypo from './Protypo';
import Button, { ButtonDnD } from './handlers/Button';
import Code from 'components/Protypo/handlers/Code';
import Data from './handlers/Data';
import LogicDnD from './handlers/Logic';
import DBFind, { DBFindDnD } from './handlers/DBFind';
import IfDnD from './handlers/If';
import ElseIfDnD from './handlers/ElseIf';
import ElseDnD from './handlers/Else';
import Div, { DivDnD } from './handlers/Div';
import Em, { EmDnD } from './handlers/Em';
import ForList from './handlers/ForList';
import Form, { FormDnD } from './handlers/Form';
import Image, { ImageDnD } from './handlers/Image';
import ImageInput, { ImageInputDnD } from './handlers/ImageInput';
import Input, { InputDnD } from './handlers/Input';
import InputErr from './handlers/InputErr';
import InputMap from './handlers/InputMap';
import JsonToSource from './handlers/JsonToSource';
import Label, { LabelDnD } from './handlers/Label';
import LinkPage from './handlers/LinkPage';
import Map from './handlers/Map';
import MenuItem from './handlers/MenuItem';
import MenuGroup from './handlers/MenuGroup';
import Now from './handlers/Now';
import P, { PDnD } from './handlers/P';
import RadioGroup, { RadioGroupDnD } from './handlers/RadioGroup';
import Range from './handlers/Range';
import Select from './handlers/Select';
import Span, { SpanDnD } from './handlers/Span';
import Strong, { StrongDnD } from './handlers/Strong';
import Table, { TableDnD } from './handlers/Table';

import setTitle from './functions/setTitle';
import addToolButton from './functions/addToolButton';

const handlers = {
    'button': Button,
    'code': Code,
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
    'inputMap': InputMap,
    'jsontosource': JsonToSource,
    'label': Label,
    'linkpage': LinkPage,
    'map': Map,
    'menuitem': MenuItem,
    'menugroup': MenuGroup,
    'now': Now,
    'p': P,
    'radiogroup': RadioGroup,
    'range': Range,
    'select': Select,
    'span': Span,
    'strong': Strong,
    'table': Table
};

const handlersDnD = {
    'button': ButtonDnD,
    'dbfind': DBFindDnD,
    'if': IfDnD,
    'elseif': ElseIfDnD,
    'else': ElseDnD,
    'div': DivDnD,
    'em': EmDnD,
    'form': FormDnD,
    'image': ImageDnD,
    'imageinput': ImageInputDnD,
    'input': InputDnD,
    'label': LabelDnD,
    'p': PDnD,
    'radiogroup': RadioGroupDnD,
    'span': SpanDnD,
    'strong': StrongDnD,
    'table': TableDnD
};

const functions = {
    'settitle': setTitle,
    'addtoolbutton': addToolButton
};

export const resolveHandler = (name: string, DnD?: boolean) => {
    if (DnD) {
        return handlersDnD[name] || LogicDnD;
    }
    return handlers[name];
};

export const resolveFunction = (name: string) => {
    return functions[name];
};

export default Protypo;