// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import Protypo from './Protypo';
import Button from './handlers/Button';
import Code from 'components/Protypo/handlers/Code';
import Div from './handlers/Div';
import Em from './handlers/Em';
import ForList from './handlers/ForList';
import Form from './handlers/Form';
import Image from './handlers/Image';
import ImageInput from './handlers/ImageInput';
import Input from './handlers/Input';
import InputErr from './handlers/InputErr';
import InputMap from './handlers/InputMap';
import Label from './handlers/Label';
import LinkPage from './handlers/LinkPage';
import Map from './handlers/Map';
import MenuItem from './handlers/MenuItem';
import MenuGroup from './handlers/MenuGroup';
import P from './handlers/P';
import QRCode from './handlers/QRCode';
import RadioGroup from './handlers/RadioGroup';
import Range from './handlers/Range';
import Select from './handlers/Select';
import Span from './handlers/Span';
import Strong from './handlers/Strong';
import Table from './handlers/Table';
import Chart from './handlers/Chart';
import Hint from './handlers/Hint';
import SimpleSource from './handlers/SimpleSource';

import setTitle from './functions/setTitle';
import addToolButton from './functions/addToolButton';

const handlers = {
    'arraytosource': SimpleSource,
    'button': Button,
    'code': Code,
    'data': SimpleSource,
    'dbfind': SimpleSource,
    'div': Div,
    'em': Em,
    'forlist': ForList,
    'form': Form,
    'gethistory': SimpleSource,
    'image': Image,
    'imageinput': ImageInput,
    'input': Input,
    'inputerr': InputErr,
    'inputMap': InputMap,
    'jsontosource': SimpleSource,
    'label': Label,
    'linkpage': LinkPage,
    'map': Map,
    'menuitem': MenuItem,
    'menugroup': MenuGroup,
    'p': P,
    'qrcode': QRCode,
    'radiogroup': RadioGroup,
    'range': Range,
    'select': Select,
    'span': Span,
    'strong': Strong,
    'table': Table,
    'chart': Chart,
    'hint': Hint
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