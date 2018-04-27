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

import ProtypoConstructor from './ProtypoConstructor';
// import { ButtonDnD } from './handlers/Button';
// import { DBFindDnD } from './handlers/DBFind';
// import IfDnD from './handlers/If';
// import ElseIfDnD from './handlers/ElseIf';
// import ElseDnD from './handlers/Else';
// import { DivDnD } from './handlers/Div';
// import { EmDnD } from './handlers/Em';
// import { FormDnD } from './handlers/Form';
// import { ImageDnD } from './handlers/Image';
// import { ImageInputDnD } from './handlers/ImageInput';
// import { InputDnD } from './handlers/Input';
// import { LabelDnD } from './handlers/Label';
import P from './handlers/P';
// import { RadioGroupDnD } from './handlers/RadioGroup';
// import { SpanDnD } from './handlers/Span';
// import { StrongDnD } from './handlers/Strong';
// import { TableDnD } from './handlers/Table';
import Logic from './handlers/Logic';

const handlers = {
    // 'button': ButtonDnD,
    // 'dbfind': DBFindDnD,
    // 'if': IfDnD,
    // 'elseif': ElseIfDnD,
    // 'else': ElseDnD,
    // 'div': DivDnD,
    // 'em': EmDnD,
    // 'form': FormDnD,
    // 'image': ImageDnD,
    // 'imageinput': ImageInputDnD,
    // 'input': InputDnD,
    // 'label': LabelDnD,
    'p': P,
    // 'radiogroup': RadioGroupDnD,
    // 'span': SpanDnD,
    // 'strong': StrongDnD,
    // 'table': TableDnD
};

export const resolveHandler = (name: string) => {
    return handlers[name] || Logic;
};

export default ProtypoConstructor;