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

import Protypo from 'components/Protypo/Protypo';
import Button from 'components/Protypo/Button';
import DBFind from 'components/Protypo/DBFind';
import Div from 'components/Protypo/Div';
import Em from 'components/Protypo/Em';
import Form from 'components/Protypo/Form';
import Input from 'components/Protypo/Input';
import InputErr from 'components/Protypo/InputErr';
import Label from 'components/Protypo/Label';
import MenuItem from 'components/Protypo/MenuItem';
import MenuGroup from 'components/Protypo/MenuGroup';
import P from 'components/Protypo/P';
import Span from 'components/Protypo/Span';
import Strong from 'components/Protypo/Strong';
import Table from 'components/Protypo/Table';

const handlers = {
    'button': Button,
    'dbfind': DBFind,
    'div': Div,
    'em': Em,
    'form': Form,
    'input': Input,
    'inputerr': InputErr,
    'label': Label,
    'menuitem': MenuItem,
    'menugroup': MenuGroup,
    'p': P,
    'span': Span,
    'strong': Strong,
    'table': Table
};

export const resolveHandler = (name: string) => {
    return handlers[name];
};

export default Protypo;