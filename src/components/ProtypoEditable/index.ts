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

import ProtypoEditable from 'components/ProtypoEditable/ProtypoEditable';
import Button from 'components/ProtypoEditable/Button';
import Data from 'components/ProtypoEditable/Data';
import DBFind from 'components/ProtypoEditable/DBFind';
import Div from 'components/ProtypoEditable/Div';
import Em from 'components/ProtypoEditable/Em';
import Form from 'components/ProtypoEditable/Form';
import Image from 'components/ProtypoEditable/Image';
import ImageInput from 'components/ProtypoEditable/ImageInput';
import Input from 'components/ProtypoEditable/Input';
import InputErr from 'components/ProtypoEditable/InputErr';
import Label from 'components/ProtypoEditable/Label';
import LinkPage from 'components/ProtypoEditable/LinkPage';
import MenuItem from 'components/ProtypoEditable/MenuItem';
import MenuGroup from 'components/ProtypoEditable/MenuGroup';
import P from 'components/ProtypoEditable/P';
import Select from 'components/ProtypoEditable/Select';
import Span from 'components/ProtypoEditable/Span';
import Strong from 'components/ProtypoEditable/Strong';
import Table from 'components/ProtypoEditable/Table';

const handlers = {
    'button': Button,
    'data': Data,
    'dbfind': DBFind,
    'div': Div,
    'em': Em,
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
    'select': Select,
    'span': Span,
    'strong': Strong,
    'table': Table
};

export const resolveHandler = (name: string) => {
    return handlers[name];
};

export default ProtypoEditable;