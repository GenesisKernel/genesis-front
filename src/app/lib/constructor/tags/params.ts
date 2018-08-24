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

export const params = {
    'alt': 'Alt',
    'app': 'App',
    'appid': 'AppID',
    'body': 'Body',
    'class': 'Class',
    'cancelbutton': 'CancelButton',
    'column': 'Column',
    'columns': 'Columns',
    'colors': 'Colors',
    'condition': 'Condition',
    'confirmbutton': 'ConfirmButton',
    'contract': 'Contract',
    'data': 'Data',
    'datetime': 'DateTime',
    'disabled': 'Disabled',
    'exp': 'Exp',
    'fieldlabel': 'FieldLabel',
    'fieldvalue': 'FieldValue',
    'for': 'For',
    'format': 'Format',
    'from': 'From',
    'icon': 'Icon',
    'hmap': 'Hmap',
    'index': 'Index',
    'interval': 'Interval',
    'lang': 'Lang',
    'limit': 'Limit',
    'maptype': 'MapType',
    'memberid': 'MemberID',
    'minlength': 'minLength',
    'maxlength': 'maxLength',
    'name': 'Name',
    'namecolumn': 'NameColumn',
    'page': 'Page',
    'pageparams': 'PageParams',
    'params': 'Params',
    'placeholder': 'Placeholder',
    'prec': 'Prec',
    'prefix': 'Prefix',
    'ratio': 'Ratio',
    'source': 'Source',
    'src': 'Src',
    'step': 'Step',
    'style': 'Style',
    'table': 'table',
    'text': 'Text',
    'time1': 'Time1',
    'time2': 'Time2',
    'title': 'Title',
    'to': 'To',
    'type': 'Type',
    'value': 'Value',
    'valuecolumn': 'ValueColumn',
    'vde': 'Vde',
    'width': 'Width',
    'where': 'Where'
};

const LogicTagNames = {
    'getvar': 'GetVar',
    'setvar': 'SetVar',
    'addtoolbutton': 'AddToolButton',
    'linkpage': 'LinkPage',
    'and': 'And',
    'calculate': 'Calculate',
    'cmptime': 'CmpTime',
    'datetime': 'DateTime',
    'dbfind': 'DBFind',
    'now': 'Now',
    'or': 'Or',
    'code': 'Code',
    'chart': 'Chart',
    'forlist': 'ForList',
    'menugroup': 'MenuGroup',
    'menuitem': 'MenuItem',
    'qrcode': 'QRcode',
    'address': 'Address',
    'appparam': 'AppParam',
    'data': 'Data',
    'ecosysparam': 'EcosysParam',
    'jsontosource': 'JsonToSource',
    'langres': 'LangRes',
    'range': 'Range',
    'sysparam': 'SysParam',
    'binary': 'Binary',
    'settitle': 'SetTitle',
    'inputerr': 'InputErr',
    'select': 'Select',
    'inputmap': 'InputMap',
    'map': 'Map',
    'include': 'Include'
};

const TailTagNames = {
    'alert': 'Alert',
    'columns': 'Columns',
    'count': 'Count',
    'custom': 'Custom',
    'ecosystem': 'Ecosystem',
    'limit': 'Limit',
    'offset': 'Offset',
    'order': 'Order',
    'popup': 'Popup',
    'style': 'Style',
    'vars': 'Vars',
    'validate': 'Validate',
    'where': 'Where',
    'whereid': 'WhereId'
};

export function getTailTagName(name: string) {
    return TailTagNames[name] || name;
}

export function getLogicTagName(name: string) {
    return LogicTagNames[name] || name;
}

export default function getParamName(name: string) {
    return params[name] || name;
}