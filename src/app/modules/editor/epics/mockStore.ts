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

import { Action } from 'redux';
import { Dispatch } from 'react-redux';
import { IRootState } from 'modules';

const state: IRootState = {
    auth: {
        loadedSeed: '',
        isAuthenticated: true,
        isLoggingIn: false,
        isCreatingAccount: false,
        createAccountError: '',
        isImportingAccount: false,
        importAccountError: '',
        id: '4158839290248807330',
        session: {
            sessionToken: '',
            refreshToken: '',
            apiHost: 'http://127.0.0.1:7079'
        },
        defaultAccount: '',
        account: {
            id: '4158839290248807330',
            encKey: '',
            address: '0415-8839-2902-4880-7330',
            ecosystem: '1',
            ecosystemName: null,
            username: 'founder'
        },
        role: {
            id: 1,
            name: 'Admin'
        },
        roles: null,
        privateKey: '',
        ecosystem: '1'
    },
    content: {
        preloading: true,
        preloadingError: null,
        stylesheet: 'body {\n\t\t  /* You can define your custom styles here or create custom CSS rules */\n\t\t}',
        navigationResizing: false,
        section: 'editor',
        sections: {
            home: {
                name: 'home',
                title: 'Home',
                visible: true,
                pending: false,
                force: false,
                defaultPage: 'default_page',
                menus: [
                    {
                        name: 'default_menu',
                        content: []
                    }
                ],
                menuVisible: true,
                page: {
                    params: {},
                    name: 'default_page',
                    content: []
                }
            },
            admin: {
                name: 'admin',
                title: 'Admin',
                visible: true,
                defaultPage: 'admin_index',
                pending: false,
                force: false,
                menus: [
                    {
                        name: 'admin_menu',
                        content: [
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-folder',
                                    page: 'apps_list',
                                    title: 'Application'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-settings',
                                    page: 'params_list',
                                    title: 'Ecosystem parameters'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-list',
                                    page: 'menus_list',
                                    title: 'Menu'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-cloud-upload',
                                    page: 'import_upload',
                                    title: 'Import'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-cloud-download',
                                    page: 'export_resources',
                                    title: 'Export'
                                }
                            },
                            {
                                tag: 'menugroup',
                                attr: {
                                    icon: 'icon-share',
                                    name: 'Resources',
                                    title: 'Resources'
                                },
                                children: [
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-screen-desktop',
                                            page: 'app_pages',
                                            title: 'Pages'
                                        }
                                    },
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-grid',
                                            page: 'app_blocks',
                                            title: 'Blocks'
                                        }
                                    },
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-docs',
                                            page: 'app_tables',
                                            title: 'Tables'
                                        }
                                    },
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-briefcase',
                                            page: 'app_contracts',
                                            title: 'Contracts'
                                        }
                                    },
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-wrench',
                                            page: 'app_params',
                                            title: 'Application parameters'
                                        }
                                    },
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-globe',
                                            page: 'app_langres',
                                            title: 'Language resources'
                                        }
                                    },
                                    {
                                        tag: 'menuitem',
                                        attr: {
                                            icon: 'icon-layers',
                                            page: 'app_binary',
                                            title: 'Binary data'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Resources',
                        content: [
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-screen-desktop',
                                    page: 'app_pages',
                                    title: 'Pages'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-grid',
                                    page: 'app_blocks',
                                    title: 'Blocks'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-docs',
                                    page: 'app_tables',
                                    title: 'Tables'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-briefcase',
                                    page: 'app_contracts',
                                    title: 'Contracts'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-wrench',
                                    page: 'app_params',
                                    title: 'Application parameters'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-globe',
                                    page: 'app_langres',
                                    title: 'Language resources'
                                }
                            },
                            {
                                tag: 'menuitem',
                                attr: {
                                    icon: 'icon-layers',
                                    page: 'app_binary',
                                    title: 'Binary data'
                                }
                            }
                        ]
                    }
                ],
                menuVisible: true,
                page: {
                    params: {},
                    name: 'app_pages',
                    content: [
                        {
                            tag: 'dbfind',
                            attr: {
                                columns: [
                                    'value.app_id',
                                    'value.app_name',
                                    'value.menu_name',
                                    'value.menu_id',
                                    'value.count_menu'
                                ],
                                data: [
                                    [
                                        '1',
                                        'System',
                                        'default_menu, admin_menu',
                                        '1, 2',
                                        '2'
                                    ]
                                ],
                                name: 'buffer_data',
                                source: 'src_buffer',
                                types: [
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text'
                                ],
                                where: 'key=\'export\' and member_id=4158839290248807330'
                            }
                        },
                        {
                            tag: 'dbfind',
                            attr: {
                                columns: [
                                    'id',
                                    'name',
                                    'uuid',
                                    'conditions',
                                    'deleted'
                                ],
                                data: [
                                    [
                                        '1',
                                        'System',
                                        '00000000-0000-0000-0000-000000000000',
                                        'ContractConditions("MainCondition")',
                                        '0'
                                    ]
                                ],
                                limit: '1',
                                name: 'applications',
                                source: 'src_app',
                                types: [
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text'
                                ],
                                where: 'id=1'
                            }
                        },
                        {
                            tag: 'div',
                            attr: {
                                'class': 'content-wrapper'
                            },
                            children: [
                                {
                                    tag: 'settitle',
                                    attr: {
                                        title: 'Pages: System'
                                    }
                                },
                                {
                                    tag: 'addtoolbutton',
                                    attr: {
                                        icon: 'icon-plus',
                                        page: 'editor',
                                        pageparams: {
                                            appId: {
                                                text: '1',
                                                type: 'text'
                                            },
                                            create: {
                                                text: 'page',
                                                type: 'text'
                                            }
                                        },
                                        title: 'Create'
                                    }
                                },
                                {
                                    tag: 'div',
                                    attr: {
                                        'class': 'clearfix'
                                    },
                                    children: [
                                        {
                                            tag: 'div',
                                            attr: {
                                                'class': 'pull-left'
                                            },
                                            children: [
                                                {
                                                    tag: 'span',
                                                    attr: {
                                                        style: 'margin-left:10px;'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'button',
                                                            attr: {
                                                                'class': 'btn bg-gray-lighter',
                                                                page: 'app_pages',
                                                                pageparams: {
                                                                    current_page: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    sort: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    width: {
                                                                        text: '12',
                                                                        type: 'text'
                                                                    }
                                                                }
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'em',
                                                                    attr: {
                                                                        'class': 'fa fa-bars'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    tag: 'span',
                                                    attr: {
                                                        style: 'margin-left:5px;'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'button',
                                                            attr: {
                                                                'class': 'btn bg-gray',
                                                                page: 'app_pages',
                                                                pageparams: {
                                                                    current_page: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    sort: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    width: {
                                                                        text: '6',
                                                                        type: 'text'
                                                                    }
                                                                }
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'em',
                                                                    attr: {
                                                                        'class': 'fa fa-th-large'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    tag: 'span',
                                                    attr: {
                                                        style: 'margin-left:5px;'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'button',
                                                            attr: {
                                                                'class': 'btn bg-gray',
                                                                page: 'app_pages',
                                                                pageparams: {
                                                                    current_page: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    sort: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    width: {
                                                                        text: '4',
                                                                        type: 'text'
                                                                    }
                                                                }
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'em',
                                                                    attr: {
                                                                        'class': 'fa fa-th'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'div',
                                            attr: {
                                                'class': 'pull-right'
                                            },
                                            children: [
                                                {
                                                    tag: 'span',
                                                    attr: {
                                                        style: 'margin-right:5px;'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'button',
                                                            attr: {
                                                                'class': 'btn bg-gray-lighter',
                                                                page: 'app_pages',
                                                                pageparams: {
                                                                    current_page: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    sort: {
                                                                        text: '2',
                                                                        type: 'text'
                                                                    },
                                                                    width: {
                                                                        text: '12',
                                                                        type: 'text'
                                                                    }
                                                                }
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'em',
                                                                    attr: {
                                                                        'class': 'fa fa-long-arrow-down'
                                                                    }
                                                                },
                                                                {
                                                                    tag: 'text',
                                                                    text: ' Sort by ID'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    tag: 'span',
                                                    attr: {
                                                        style: 'margin-right:10px;'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'button',
                                                            attr: {
                                                                'class': 'btn bg-gray',
                                                                page: 'app_pages',
                                                                pageparams: {
                                                                    current_page: {
                                                                        text: '1',
                                                                        type: 'text'
                                                                    },
                                                                    sort: {
                                                                        text: '3',
                                                                        type: 'text'
                                                                    },
                                                                    width: {
                                                                        text: '12',
                                                                        type: 'text'
                                                                    }
                                                                }
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'text',
                                                                    text: 'Sort by NAME'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'dbfind',
                                    attr: {
                                        columns: [
                                            'id',
                                            'name',
                                            'value',
                                            'menu',
                                            'validate_count',
                                            'conditions',
                                            'app_id',
                                            'validate_mode'
                                        ],
                                        data: [
                                            [
                                                '1',
                                                'default_page',
                                                '',
                                                'default_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '2',
                                                'app_binary',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Binary data": #app_name#)\n        AddToolButton(Title: "Upload binary", Page: app_upload_binary, Icon: icon-plus, PageParams: "app_id=#app_id#")\n\n        SetVar(pager_table, binaries).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_binary).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_binary)\n        Include(admin_link)\n\n        DBFind(binaries, src_binparameters).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_binparameters){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        If(#member_id# == #key_id#){\n                                            LinkPage(Class: text-primary h5, Body: #name#, Page: app_upload_binary, PageParams: "id=#id#,app_id=#buffer_value_app_id#")\n                                        }.Else{\n                                            Span(Class: h5, Body: #name#)\n                                        }\n                                    }\n                                    Div(col-md-8 text-right){\n                                        Span(#hash#)\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Binary data")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '3',
                                                'app_blocks',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Blocks": #app_name#)\n        AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=block,appId=#buffer_value_app_id#")\n\n        SetVar(pager_table, blocks).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_blocks).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_blocks)\n        Include(admin_link)\n\n        DBFind(blocks, src_blocks).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_blocks){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=block")).Style(margin-right: 15px;)\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=block,name=#name#"))\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Blocks")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '4',
                                                'app_contracts',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Contracts": #app_name#)\n        AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=contract,appId=#buffer_value_app_id#")\n\n        SetVar(pager_table, contracts).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_contracts).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_contracts)\n        Include(admin_link)\n\n        DBFind(contracts, src_contracts).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_contracts){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=contract")).Style(margin-right: 15px;)\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=contract,name=#name#"))\n                                        }\n                                        Div(pull-right){\n                                            If(#active#==1){\n                                                Span(Class: h5, Body: Em(Class: fa fa-check)).Style(margin-right: 50px;)\n                                            }.Else{\n                                                Span(Class: h5 text-muted, Body: Em(Class: fa fa-minus)).Style(margin-right: 50px;)\n                                            }\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Contracts")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '5',
                                                'app_edit',
                                                'Div(content-wrapper){\n    SetTitle("Application")\n    Div(breadcrumb){\n\t\tLinkPage("Applications", apps_list)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tIf(#id# > 0){\n\t\t\tSpan(Class: text-muted, Body: "Edit")\n\t\t}.Else{\n\t\t\tSpan(Class: text-muted, Body: "New")\n\t\t}\n    }\n\t\n\tForm(){\n\t\tIf(#id# > 0){\n\t\t\tDBFind(applications, src_apps).Columns("id,name,conditions,deleted").Where("id=#id#").Limit(1).Vars("app")\n\t\t\tDiv(col-md-12){\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Name")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: name, Disabled: "true", Value: #app_name#)\n\t\t\t\t}\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Change conditions")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: conditions, Value: #app_conditions#)\n\t\t\t\t}\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tDiv(text-left col-md-6){\n\t\t\t\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: apps_list, Contract: EditApplication, Params: "ApplicationId=#id#,Conditions=Val(conditions)")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(text-right col-md-6){\n\t\t\t\t\t\t\tIf(#app_deleted# == 0){\n\t\t\t\t\t\t\t\tButton(Body: "Delete", Class: btn btn-danger, Page: apps_list, Contract: DelApplication, Params: "ApplicationId=#app_id#,Value=1")\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}.Else{\n\t\t\tDiv(col-md-12){\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Name")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: name)\n\t\t\t\t}\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Change conditions")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: conditions)\n\t\t\t\t}\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: apps_list, Contract: NewApplication, Params: "Name=Val(name),Conditions=Val(conditions)")\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '6',
                                                'app_langres',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Language resources": #app_name#)\n        AddToolButton(Title: "Create", Page: langres_add, Icon: icon-plus, PageParams: "app_id=#app_id#")\n\n        SetVar(pager_table, languages).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_langres).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_langres)\n        Include(admin_link)\n\n        DBFind(languages, src_languages).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_languages){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: langres_edit, PageParams: "lang_id=#id#"))\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Language resources")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '7',
                                                'app_pages',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Pages": #app_name#)\n        AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=page,appId=#buffer_value_app_id#")\n\n        SetVar(pager_table, pages).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_pages).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_pages)\n        Include(admin_link)\n\n        DBFind(pages, src_pages).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_pages){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        LinkPage(Page: #name#, Class: text-primary h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=page")).Style(margin-right: 15px;)\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=page,name=#name#"))\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Pages")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '8',
                                                'app_params',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Application parameters": #app_name#)\n        AddToolButton(Title: "Create", Page: app_params_edit, Icon: icon-plus, PageParams: "app_id=#app_id#,create=create")\n\n        SetVar(pager_table, app_params).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_params).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_params)\n        Include(admin_link)\n\n        DBFind(app_params, src_appparameters).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_appparameters){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8 text-right){\n                                        Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: app_params_edit, PageParams: "id=#id#"))\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Application parameters")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '9',
                                                'app_params_edit',
                                                'Div(content-wrapper){\n    If(#create# == create){\n        SetVar(param_name, "New")\n    }.Else{\n\t\tDBFind(app_params, src_params).Where("id = #id#").Limit(1).Vars("param")\n    }\n\t\n\tSetTitle("Application parameter")\n\tDiv(Class: breadcrumb){\n\t\tLinkPage("Application parameters", app_params)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tSpan(Class: text-muted, Body: #param_name#)\n\t}\n\n    Form(){\n        Div(form-group){\n            Label("Name")\n            If(#create# == create){\n                Input(Name: name)\n            }.Else{\n                Input(Name: name, Value: #param_name#, Disabled: "true")\n            }\n        }\n        Div(form-group){\n            If(#create# == create){\n                Input(Type: textarea, Name: value).Style(height: 500px !important;)\n            }.Else{\n                Input(Type: textarea, Name: value, Value: "#param_value#").Style(height: 500px !important;)\n            }\n        }\n        Div(form-group){\n            Label("Change conditions")\n            If(#create# == create){\n                Input(Name: conditions)\n            }.Else{\n                Input(Name: conditions, Value: #param_conditions#)\n            }\n        }\n        Div(form-group){\n            If(#create# == create){\n                Button(Class: btn btn-primary, Body: "Save", Contract: NewAppParam, Params: "Name=Val(name),Value=Val(value),Conditions=Val(conditions),ApplicationId=#app_id#", Page: app_params)\n            }.Else{\n                Button(Class: btn btn-primary, Body: "Save", Contract: EditAppParam, Params: "Id=#id#,Value=Val(value),Conditions=Val(conditions)", Page: app_params)\n            }\n        }\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '10',
                                                'app_tables',
                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Tables": #app_name#)\n        AddToolButton(Title: "Create", Page: table_create, Icon: icon-plus, PageParams: "app_id=#app_id#")\n\n        SetVar(pager_table, tables).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_tables).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_tables)\n        Include(admin_link)\n\n        DBFind(tables, src_tables).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_tables){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        LinkPage(Page: table_view, Class: text-primary h5, Body: "#name#", PageParams: "table_name=#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: table_edit, PageParams: "tabl_id=#id#"))\n                                        }\n                                        Div(pull-right){\n                                            DBFind(#name#).Columns("id").Count(countvar)\n                                            Span(Class: h5 text-muted, Body: #countvar#).Style(margin-right: 50px;)\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Tables")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '11',
                                                'app_upload_binary',
                                                'Div(content-wrapper){\n    SetTitle("Binary data")\n    Div(breadcrumb){\n        LinkPage("Binary data", app_binary)\n        Span(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tIf(#id# > 0){\n\t\t\tSpan("Edit", text-muted)\n\t\t\tDBFind(binaries).Columns(name).Where(id = #id#).Vars(binary)\n\t\t}.Else{\n\t\t\tSpan("Upload", text-muted)\n\t\t}\n    }\n\t\n\tForm(){\n\t\tDiv(form-group){\n\t\t\tDiv(text-left){\n\t\t\t\tLabel("Name")\n\t\t\t}\n\t\t\tIf(#id# > 0){\n\t\t\t\tInput(Name: name, Disabled: disabled, Value: #binary_name#)\n\t\t\t}.Else{\n\t\t\t\tInput(Name: name)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tDiv(text-left){\n\t\t\t\tLabel("File")\n\t\t\t}\n\t\t\tInput(Name: databin, Type: file)\n\t\t}\n\t\tDiv(form-group text-left){\n\t\t\tButton(Body: "Upload", Contract: UploadBinary, Class: btn btn-primary, Params: "Name=Val(name),ApplicationId=#app_id#,Data=Val(databin),MemberID=#key_id#", Page: app_binary)\n\t\t}\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '12',
                                                'apps_list',
                                                'Div(fullscreen){\n    If(#deleted# == deleted){\n        SetTitle("Inactive applications")\n\t\tDiv(breadcrumb){\n\t\t\tLinkPage("Applications", apps_list)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan(Class: text-muted, Body: "Inactive applications")\n\t\t}\n\t\n        DBFind(applications, src_applications).Where("deleted=1").Order("id").Count(countvar).Custom(restore_btn){\n            Button(Class: btn btn-link, Page: apps_list, Contract: DelApplication, Params: "ApplicationId=#id#", Body: "Restore")\n        }\n        If(#countvar# > 0) {\n            Table(Source: src_applications, Columns: "ID=id,Name=name,Conditions=conditions,=restore_btn").Style(\n                tbody > tr:nth-of-type(odd) {\n                    background-color: #fafbfc;\n                }\n                tbody > tr > td {\n                    word-break: break-all;\n                    font-weight: 400;\n                    font-size: 13px;\n                    color: #666;\n                    border-top: 1px solid #eee;\n                    vertical-align: middle;\n                }\n                tr > *:first-child {\n                    padding-left:20px;\n                    width: 80px;\n                }\n                tr > *:last-child {\n                    padding-right:80px;\n                    text-align:right;\n                    width: 100px;\n                }\n                thead {\n                    background-color: #eee;\n                }\n            )\n        }.Else{\n            Div(content-wrapper){\n                Span(Class: text-muted, Body: "You don\'t have any inactive applications")\n            }\n        }\n    }.Else{\n        SetTitle("Applications")\n\t\tDiv(breadcrumb){\n\t\t\tSpan(Class: text-muted, Body: "This section is used to select installed applications")\n\t\t}\n        AddToolButton(Title: "Inactive apps", Page: apps_list, Icon: icon-close, PageParams:"deleted=deleted")\n        AddToolButton(Title: "Create", Page: app_edit, Icon: icon-plus)\n\t\n        DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n        DBFind(applications, src_applications).Where("deleted=0").Order("id").Custom(custom_check){\n            If(#id#==#buffer_value_app_id#){\n                Span(Em(Class: fa fa-check)).Style(margin-left:30px;)\n            }.Else{\n                Button(Class: btn btn-link, Contract: Export_NewApp, Params: "app_id=#id#", Page: apps_list, Body: "select")\n            }\n        }.Custom(custom_actions){\n            Button(Class: btn btn-link, Body: Em(Class: fa fa-edit), Page: app_edit, PageParams: "id=#id#")\n        }\n\n        Table(Source: src_applications, Columns: "ID=id,Name=name,Conditions=conditions,Selected=custom_check,=custom_actions").Style(\n            tbody > tr:nth-of-type(odd) {\n                background-color: #fafbfc;\n            }\n            tbody > tr > td {\n                word-break: break-all;\n                font-weight: 400;\n                font-size: 13px;\n                color: #666;\n                border-top: 1px solid #eee;\n                vertical-align: middle;\n            }\n            tr > *:first-child {\n                padding-left:20px;\n                width: 80px;\n            }\n            tr > *:last-child {\n                padding-right:15px;\n                text-align:right;\n                width: 100px;\n            }\n            thead {\n                background-color: #eee;\n            }\n        )\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '13',
                                                'column_add',
                                                'Div(content-wrapper){\n\tSetTitle("Tables")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tLinkPage("Tables", app_tables)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tLinkPage("Edit table", table_edit, PageParams:"tabl_id=#tabl_id#")\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan("Add column", text-muted)\n\t\t}\n\t}\n\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Column")\n\t\t\t\tInput(Name: ColumnName)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tData(src_type,"type,name"){\n\t\t\t\t\ttext,"Text"\n\t\t\t\t\tnumber,"Number"\n\t\t\t\t\tvarchar,"Varchar"\n\t\t\t\t\tdatetime,"Date/Time"\n\t\t\t\t\tmoney,"Money"\n\t\t\t\t\tdouble,"Double"\n\t\t\t\t\tcharacter,"Character"\n\t\t\t\t\tjson,"JSON"\n\t\t\t\t}\n\t\t\t\tLabel("Type")\n\t\t\t\tSelect(Name: Coltype, Source: src_type, NameColumn: name, ValueColumn: type, Value:"text")\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Update")\n\t\t\t\tInput(Name: ColumnUp)\n\t\t\t}\n\t\t}\n\t\tDiv(panel-footer clearfix){\n\t\t\tButton(Body: "Add column", Contract: NewColumn, Class: btn btn-primary, Page: table_edit, PageParams: "tabl_id=#tabl_id#", Params: "TableName=#next_table_name#,Name=Val(ColumnName),Type=Val(Coltype),Permissions=Val(ColumnUp)")\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '14',
                                                'column_edit',
                                                'Div(content-wrapper){\n\tSetTitle("Edit column")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tLinkPage("Tables", app_tables)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tLinkPage("Edit table", table_edit, PageParams:"tabl_id=#tabl_id#")\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan("Edit column", text-muted)\n\t\t}\n\t}\n\n\tDBFind(tables, src_mem).Columns("id,name,columns,conditions").Vars(pre).WhereId(#tabl_id#)\n\tJsonToSource(src_columns, #pre_columns#)\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tForList(src_columns){\n\t\t\t\tIf(#key# == #name_column#){\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tLabel("Column")\n\t\t\t\t\t\tInput(Name: ColumnName, Disabled: "true", Value: #name_column#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tLabel("Type")\n\t\t\t\t\t\tSetVar(col_type, GetColumnType(#pre_name#, #key#))\n\t\t\t\t\t\tIf(#col_type# == character){\n\t\t\t\t\t\t\tSetVar(input_type, "Character")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == text){\n\t\t\t\t\t\t\tSetVar(input_type, "Text")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == number){\n\t\t\t\t\t\t\tSetVar(input_type, "Number")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == money){\n\t\t\t\t\t\t\tSetVar(input_type, "Money")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == varchar){\n\t\t\t\t\t\t\tSetVar(input_type, "Varchar")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == datetime){\n\t\t\t\t\t\t\tSetVar(input_type, "Date/Time")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == double){\n\t\t\t\t\t\t\tSetVar(input_type, "Double")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == character){\n\t\t\t\t\t\t\tSetVar(input_type, "Character")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == json){\n\t\t\t\t\t\t\tSetVar(input_type, "JSON")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == bytea){\n\t\t\t\t\t\t\tSetVar(input_type, "Binary Data")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == uuid){\n\t\t\t\t\t\t\tSetVar(input_type, "UUID")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tInput(Name: Coltype, Disabled: "true", Value: #input_type#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tLabel("Update")\n\t\t\t\t\t\tInput(Name: ColumnUp, Value: #value#)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tDiv(panel-footer clearfix){\n\t\t\tButton(Body: "Save", Contract: EditColumn, Class: btn btn-primary, Page: table_edit, PageParams: "tabl_id=#tabl_id#", Params: "TableName=#pre_name#,Name=Val(ColumnName),Type=Val(Coltype),Permissions=Val(ColumnUp)")\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '15',
                                                'export_download',
                                                'Div(fullscreen){\n    SetTitle("Export")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Payload was formed. You can download it now")\n    }\n\n    DBFind(binaries, src_binaries).Where("name=\'export\' and member_id=#key_id# and app_id=1").Custom(app_name){\n        DBFind(Name: buffer_data, Source: src_buffer).Columns("value->app_name").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n        Span(#buffer_value_app_name#)\n    }\n\n    Table(Source: src_binaries, "Applications=app_name,=data").Style(\n        tbody > tr:nth-of-type(odd) {\n            background-color: #fafbfc;\n        }\n        tbody > tr > td {\n            word-break: break-all;\n            font-weight: 400;\n            font-size: 13px;\n            color: #666;\n            border-top: 1px solid #eee;\n            vertical-align: middle;\n        }\n        tr > *:first-child {\n            padding-left:20px;\n            width: 100px;\n        }\n        tr > *:last-child {\n            padding-right:20px;\n            text-align:right;\n        }\n        thead {\n            background-color: #eee;\n        }\n    )\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '16',
                                                'export_resources',
                                                'Div(content-wrapper){\n    SetTitle("Export")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Select the application which do you want to export and proceed to the payload generation process.")\n    }\n\n    Include(export_link)\n    DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\n    If(#buffer_value_app_id# > 0){\n        If(#res_type#=="pages"){\n            DBFind(pages, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="blocks"){\n            DBFind(blocks, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="menu"){\n            DBFind(menu, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("id in (#buffer_value_menu_id#)").Order("id")\n        }\n        If(#res_type#=="parameters"){\n            DBFind(app_params, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="languages"){\n            DBFind(languages, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="contracts"){\n            DBFind(contracts, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="tables"){\n            DBFind(tables, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n    }\n\n    Div(row){\n        Div(col-md-9 col-md-offset-0){\n            Table(src, "ID=id,Name=name,=cbox").Style(\n                tbody > tr:nth-of-type(odd) {\n                    background-color: #fafbfc;\n                }\n                tbody > tr > td {\n                    word-break: break-all;\n                    padding: 8px 20px !important;\n                    font-weight: 400;\n                    font-size: 13px;\n                    color: #666;\n                    border-top: 1px solid #eee;\n                    vertical-align: middle;\n                }\n                tr > *:first-child {\n                    padding-left:20px;\n                    width: 100px;\n                }\n                tr > *:last-child {\n                    text-align:right;\n                    padding-right:20px;\n                    width: 50px;\n                }\n                thead {\n                    background-color: #eee;\n                }\n            )\n        }\n        Div(col-md-3 col-md-offset-0){\n            Include(export_info)\n        }\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '17',
                                                'import_app',
                                                'Div(content-wrapper){\n    DBFind(buffer_data, src_buffer).Columns("id,value->name,value->data").Where("key=\'import\' and member_id=#key_id#").Vars(prefix)\n    DBFind(buffer_data, src_buffer).Columns("value->app_name,value->pages,value->pages_count,value->blocks,value->blocks_count,value->menu,value->menu_count,value->parameters,value->parameters_count,value->languages,value->languages_count,value->contracts,value->contracts_count,value->tables,value->tables_count").Where("key=\'import_info\' and member_id=#key_id#").Vars(info)\n\n    SetTitle("Import - #info_value_app_name#")\n    Data(data_info, "name,count,info"){\n        Pages,"#info_value_pages_count#","#info_value_pages#"\n        Blocks,"#info_value_blocks_count#","#info_value_blocks#"\n        Menu,"#info_value_menu_count#","#info_value_menu#"\n        Parameters,"#info_value_parameters_count#","#info_value_parameters#"\n        Language resources,"#info_value_languages_count#","#info_value_languages#"\n        Contracts,"#info_value_contracts_count#","#info_value_contracts#"\n        Tables,"#info_value_tables_count#","#info_value_tables#"\n    }\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Your data that you can import")\n    }\n\n    Div(panel panel-primary){\n        ForList(data_info){\n            Div(list-group-item){\n                Div(row){\n                    Div(col-md-10 mc-sm text-left){\n                        Span(Class: text-bold, Body: "#name#")\n                    }\n                    Div(col-md-2 mc-sm text-right){\n                        If(#count# > 0){\n                            Span(Class: text-bold, Body: "(#count#)")\n                        }.Else{\n                            Span(Class: text-muted, Body: "(0)")\n                        }\n                    }\n                }\n                Div(row){\n                    Div(col-md-12 mc-sm text-left){\n                        If(#count# > 0){\n                            Span(Class: h6, Body: "#info#")\n                        }.Else{\n                            Span(Class: text-muted h6, Body: "Nothing selected")\n                        }\n                    }\n                }\n            }\n        }\n        If(#prefix_id# > 0){\n            Div(list-group-item text-right){\n                Button(Body: "Import", Class: btn btn-primary, Page: apps_list).CompositeContract("Import", "#prefix_value_data#")\n            }\n        }\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '18',
                                                'import_upload',
                                                'Div(content-wrapper){\n    SetTitle("Import")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Select payload that you want to import")\n    }\n    Form(panel panel-primary){\n        Div(list-group-item){\n            Input(Name: input_file, Type: file)\n        }\n        Div(list-group-item text-right){\n            Button(Body: "Load", Class: btn btn-primary, Contract: Import_Upload, Page: import_app)\n        }\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '19',
                                                'langres_edit',
                                                'Div(content-wrapper){\n\tSetTitle("Language resources")\n\tDiv(Class: breadcrumb){\n\t\tLinkPage("Language resources", app_langres)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tSpan(Class: text-muted, Body: "Edit")\n\t}\n\t\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDBFind(languages, src_leng).Vars(pre).WhereId(#lang_id#)\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12){\n\t\t\t\t\tLabel("Name")\n\t\t\t\t\tInput(Name: LangName, Disabled: "true", Value: #pre_name#)\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Locale")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-10 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Value")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Action")\n\t\t\t\t}\n\t\t\t}\n\t\t\tSetVar(json,#pre_res#)\n\t\t\tJsonToSource(pv, #json#)\n\t\t\tForList(Source: pv){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tInput(Name: idshare, Value: #key#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-10 mt-sm){\n\t\t\t\t\t\tInput(Name: share, Value: #value#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tIf(#del# == 1){\n\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# - 1, Type: int))\n\t\t\t}.Else{\n\t\t\t\tIf(GetVar(count)==""){\n\t\t\t\t\tSetVar(count, 0)\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count#, Type: int))\n\t\t\t\t}.Else{\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# + 1, Type: int))\n\t\t\t\t}\n\t\t\t}\n\t\t\tRange(params_range, 0, #next_count#)\n\t\t\tForList(Source: params_range){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tInput(Name:idshare)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-10 mt-sm){\n\t\t\t\t\t\tInput(Name:share)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tIf(And(#next_count# == #params_range_index#, #next_count# > 0)){\n\t\t\t\t\t\t\tButton(Em(Class: fa fa-trash), Class: btn btn-default, PageParams: "lang_id=#lang_id#,count_sec=#next_count#,count=#count#,del=1", Page:langres_edit)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12 mt-lg){\n\t\t\t        LinkPage(Body: "Add localization", Page: langres_edit, PageParams: "lang_id=#lang_id#,count_sec=#next_count#,count=#count#")\n                }\n            }\n\t\t}\n\t\tDiv(panel-footer){\n\t\t\tButton(Body: "Save", Class: btn btn-primary, Contract: @1EditLang, Params: "Value=Val(share),IdLanguage=Val(idshare),Id=#lang_id#", Page: app_langres)\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '20',
                                                'langres_add',
                                                'Div(content-wrapper){\n\tSetTitle("Language resources")\n\tDiv(Class: breadcrumb){\n\t\tLinkPage("Language resources", app_langres)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tSpan(Class: text-muted, Body: "Create")\n\t}\n\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12){\n\t\t\t\t\tLabel("Name")\n\t\t\t\t\tInput(Name: LangName)\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Locale")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-10 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Value")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Action")\n\t\t\t\t}\n\t\t\t}\n\t\t\tIf(#del# == 1){\n\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# - 1, Type: int))\n\t\t\t}.Else{\n\t\t\t\tIf(GetVar(count)==""){\n\t\t\t\t\tSetVar(count, 0)\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count# + 1, Type: int))\n\t\t\t\t}.Else{\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# + 1, Type: int))\n\t\t\t\t}\n\t\t\t}\n\t\t\tRange(params_range, 0, #next_count#)\n\t\t\tForList(Source: params_range){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tInput(Name:idshare)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-10 mt-sm){\n\t\t\t\t\t\tInput(Name:share)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tIf(And(#next_count# == #params_range_index#, #next_count# > 1)){\n\t\t\t\t\t\t\tButton(Body: Em(Class: fa fa-trash), Class: btn btn-default, PageParams: "count_sec=#next_count#,count=#count#,del=1,app_id=#app_id#", Page: langres_add)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12 mt-lg){\n\t\t\t\t\tLinkPage(Body: "Add localization", Page: langres_add, PageParams:"count_sec=#next_count#,count=#count#,app_id=#app_id#")\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tDiv(panel-footer){\n\t\t\tButton(Body: "Save", Class: btn btn-primary, Contract:@1NewLang, Page: app_langres, Params: "ApplicationId=#app_id#,Name=Val(LangName),Value=Val(share),IdLanguage=Val(idshare)")\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '21',
                                                'menus_list',
                                                'Div(fullscreen){\n    SetTitle("Menu")\n    AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=menu,appId=0")\n\tDiv(breadcrumb){\n\t\tSpan(Class: text-muted, Body: "This section is used to manage the menu")\n\t}\n\n    DBFind(menu, src_menus).Limit(250).Order("id").Custom(action){\n        Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=menu")).Style(margin-right: 20px;)\n        Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=menu,name=#name#"))\n    }\n\n    Table(src_menus, "ID=id,Name=name,Title=title,Conditions=conditions,=action").Style(\n    tbody > tr:nth-of-type(odd) {\n        background-color: #fafbfc; \n    }\n    tbody > tr > td {\n        word-break: break-all;\n        font-weight: 400;\n        font-size: 13px;\n        color: #666;\n        border-top: 1px solid #eee;\n        vertical-align: middle;\n    }\n    tr  > *:first-child {\n        padding-left:20px;\n        width: 80px;\n    }\n    tr  > *:last-child {\n        padding-right:30px;\n        text-align:right; \n        width: 100px;\n    }\n    thead {\n        background-color: #eee;\n    })\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '22',
                                                'params_edit',
                                                'Div(content-wrapper){\n\tIf(#stylesheet# == stylesheet){\n\t\tDBFind(parameters, src_params).Where(name=\'#stylesheet#\').Vars("param")\n\t}.Else{\n\t\tIf(#id#>0){\n\t\t\tDBFind(parameters, src_params).WhereId(#id#).Vars("param")\n\t\t}.Else{\n\t\t\tSetVar(param_name, "New")\n\t\t}\n\t}\n\n\tSetTitle("Ecosystem parameters")\n    Div(Class: breadcrumb){\n        LinkPage("Ecosystem parameters", params_list)\n        Span(/).Style(margin-right: 10px; margin-left: 10px;)\n        Span(Class: text-muted, Body: #param_name#)\n    }\n\t\n\tForm(){\n\t\tDiv(form-group){\n\t\t\tLabel("Name")\n\t\t\tIf(#param_id#>0){\n\t\t\t\tInput(Name: name, Value: #param_name#, Disabled: "true")\n\t\t\t}.Else{\n\t\t\t\tInput(Name: name)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tIf(#param_id#>0){\n\t\t\t\tInput(Type: textarea, Name: value, Value: "#param_value#").Style(height: 500px !important;)\n\t\t\t}.Else{\n\t\t\t\tInput(Type: textarea, Name: value).Style(height: 500px !important;)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tLabel("Change conditions")\n\t\t\tIf(#param_id#>0){\n\t\t\t\tInput(Name: conditions, Value: #param_conditions#)\n\t\t\t}.Else{\n\t\t\t\tInput(Name: conditions)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tIf(#param_id#>0){\n\t\t\t\tButton(Class: btn btn-primary, Body: "Save", Contract: EditParameter, Params: "Id=#param_id#,Value=Val(value),Conditions=Val(conditions)", Page: params_list)\n\t\t\t}.Else{\n\t\t\t\tButton(Class: btn btn-primary, Body: "Save", Contract: NewParameter, Params: "Name=Val(name),Value=Val(value),Conditions=Val(conditions)", Page: params_list)\n\t\t\t}\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '23',
                                                'params_list',
                                                'Div(fullscreen){\n    SetTitle("Ecosystem parameters")\n    AddToolButton(Title: "Manage stylesheet", Page: params_edit, Icon: icon-picture, PageParams:"stylesheet=stylesheet")\n    AddToolButton(Title: "Create", Page: params_edit, Icon: icon-plus)\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "This section is used to configure stored reusable parameters")\n    }\n\n    DBFind(parameters, src_appparameters).Order("id").Custom(custom_actions){\n        LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: params_edit, PageParams: "id=#id#")\n    }\n\n    Table(src_appparameters, "ID=id,Name=name,Application=app_id,Value=value,Conditions=conditions,=custom_actions").Style(\n        tbody > tr:nth-of-type(odd) {\n            background-color: #fafbfc;\n        }\n        tbody > tr > td {\n            word-break: break-all;\n            font-weight: 400;\n            font-size: 13px;\n            color: #666;\n            border-top: 1px solid #eee;\n            vertical-align: middle;\n        }\n        tr > *:first-child {\n            padding-left:20px;\n            width: 80px;\n        }\n        tr > *:last-child {\n            padding-right:30px;\n            text-align:right;\n            width: 100px;\n        }\n        thead {\n            background-color: #eee;\n        }\n    )\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '24',
                                                'properties_edit',
                                                'Div(Class: content-wrapper){\n\tSetTitle("Edit properties")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tIf(#type# == page){\n\t\t\t\tLinkPage("Pages", app_pages)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit page", text-muted)\n\t\t\t\tDBFind(Name: pages, Source: src_page).WhereId(#edit_property_id#).Vars(item)\n\t\t\t\tDBFind(menu, src_menus)\n\t\t\t}\n\t\t\tIf(#type# == contract){\n\t\t\t\tLinkPage("Contracts", app_contracts)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit contract", text-muted)\n\t\t\t\tDBFind(Name: contracts, Source: src_contract).WhereId(#edit_property_id#).Vars(item)\n\t\t\t}\n            If(#type# == block){\n\t\t\t\tLinkPage("Blocks", app_blocks)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit block", text-muted)\n\t\t\t\tDBFind(Name: blocks, Source: src_block).WhereId(#edit_property_id#).Vars(item)\n\t\t\t}\n\t\t\tIf(#type# == menu){\n\t\t\t\tLinkPage("Menu", menus_list)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit menu", text-muted)\n\t\t\t\tDBFind(Name: menu, Source: src_menu).WhereId(#edit_property_id#).Vars(item)\n\t\t\t}\n\t\t}\n\t}\n    Form(){\n\t\tDiv(form-group){\n\t\t\tLabel("Name")\n\t\t\tInput(Name: Name, Value: #item_name#, Disabled: "true")\n\t\t}\n\t\tIf(#type# == page){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Menu")\n\t\t\t\tSelect(Name: Menu, Source: src_menus, NameColumn: name, ValueColumn: name, Value: #item_menu#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: app_pages, Contract: EditPage, Params: "Menu=Val(Menu),Conditions=Val(Conditions),Id=#edit_property_id#")\n\t\t\t}\n\t\t}\n\t\tIf(#type# == contract){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Wallet")\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-10){\n\t\t\t\t\t\tInput(Name: Wallet,Value: Address(#item_wallet_id#))\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-2){\n\t\t\t\t\t\tIf(#item_active# == 0){\n\t\t\t\t\t\t\tButton(Body: "Bind", Class: btn btn-primary btn-block, Contract: ActivateContract, Params: "Id=#edit_property_id#", Page:app_contracts)\n\t\t\t\t\t\t}.Else{\n\t\t\t\t\t\t\tButton(Body: "Unbind", Class: btn btn-primary btn-block, Contract: DeactivateContract, Params: "Id=#edit_property_id#", Page:properties_edit, PageParams: "edit_property_id=#edit_property_id#,type=#type#")\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: app_contracts, Contract: EditContract, Params: "Conditions=Val(Conditions),WalletId=Val(Wallet),Id=#edit_property_id#")\n\t\t\t}\n\t\t}\n\t\tIf(#type# == block){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: app_blocks, Contract: EditBlock, Params: "Conditions=Val(Conditions),Id=#edit_property_id#")\n\t\t\t}\n\t\t}\n\t\tIf(#type# == menu){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Menu title")\n\t\t\t\tInput(Name: Title, Value: #item_title#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: menus_list, Contract: EditMenu, Params: "Conditions=Val(Conditions),Id=#edit_property_id#,NameTitle=Val(Title)")\n\t\t\t}\n\t\t}\n    }\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '25',
                                                'table_create',
                                                'Div(content-wrapper){\n\tSetTitle("Create table")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tLinkPage("Tables", app_tables)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan("Create", text-muted)\n\t\t}\n\t}\n\n\tForm(){\n\t\tDiv(panel panel-default){\n\t\t\tDiv(panel-body){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-12){\n\t\t\t\t\t\tLabel("Name")\n\t\t\t\t\t\tInput(Name:TableName)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-4 mt-lg){\n\t\t\t\t\t\tLabel(Class: text-muted, Body: "Columns")\n\t\t\t\t\t\tInput(Name:disinp, Disabled: true, Value: id)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-7 mt-lg){\n\t\t\t\t\t\tLabel(Class: text-muted, Body: "Type")\n\t\t\t\t\t\tInput(Name: disinp, Disabled: true, Value: Number)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\t\tLabel(Class: text-muted, Body: "Action")\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tData(src_type,"type,name"){\n\t\t\t\t\ttext,"Text"\n\t\t\t\t\tnumber,"Number"\n\t\t\t\t\tvarchar,"Varchar"\n\t\t\t\t\tdatetime,"Date/Time"\n\t\t\t\t\tmoney,"Money"\n\t\t\t\t\tdouble,"Double"\n\t\t\t\t\tcharacter,"Character"\n\t\t\t\t\tjson,"JSON"\n\t\t\t\t}\n\t\t\t\tIf(#del# == 1){\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# - 1, Type: int))\n\t\t\t\t}.Else{\n\t\t\t\t\tIf(GetVar(count)==""){\n\t\t\t\t\t\tSetVar(count, 0)\n\t\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count# + 1, Type: int))\n\t\t\t\t\t}.Else{\n\t\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# + 1, Type: int))\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tRange(params_range, 0, #next_count#)\n\t\t\t\tForList(Source: params_range){\n\t\t\t\t\tDiv(row){\n\t\t\t\t\t\tDiv(col-md-4 mt-sm){\n\t\t\t\t\t\t\tInput(Name:idshare)\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(col-md-7 mt-sm){\n\t\t\t\t\t\t\tSelect(Name: share, Source: src_type, NameColumn: name, ValueColumn: type,Value:"text")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\t\tIf(And(#next_count# == #params_range_index#, #next_count# > 1)){\n\t\t\t\t\t\t\t\tButton(Body: Em(Class: fa fa-trash), Class: btn btn-default, PageParams: "count_sec=#next_count#,count=#count#,del=1,app_id=#app_id#", Page: table_create)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\t\t\t\n\t\t\t}\n\t\t\tDiv(panel-footer){\n\t\t\t\tButton(Body: "Add column", Class: btn btn-primary, Page: table_create, PageParams: "count_sec=#next_count#,count=#count#,app_id=#app_id#")\n\t\t\t}\n\t\t}\n\t\tDiv(row){\n\t\t\tDiv(col-md-6){\n\t\t\t\tDiv(panel panel-default){\n\t\t\t\t\tDiv(panel-heading, Body: "Write permissions")\n\t\t\t\t\tDiv(panel-body){\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tLabel(Insert)\n\t\t\t\t\t\t\tInput(Name: Insert_con, Value: ContractConditions("MainCondition"))\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tLabel(Update)\n\t\t\t\t\t\t\tInput(Name: Update_con, Value: ContractConditions("MainCondition"))\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tLabel(New column)\n\t\t\t\t\t\t\tInput(Name: New_column_con, Value: ContractConditions("MainCondition"))\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tDiv(panel-footer){\n\t\t\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Contract: @1NewTable, Page: app_tables, Params: "Shareholding=Val(share),Id=Val(idshare),ApplicationId=#app_id#")\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '26',
                                                'table_edit',
                                                'Div(content-wrapper){\n\tSetTitle(Tables)\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tLinkPage("Tables", app_tables)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan("Edit", text-muted)\n\t\t}\n\t}\n\n\tForm(){\n\t\tDiv(panel panel-default){\n\t\t\tDiv(panel-body){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-3 h4){\n\t\t\t\t\t\tLabel("Name")\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-2 h4){\n\t\t\t\t\t\tLabel("Type")\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-5 h4){\n\t\t\t\t\t\tLabel("Conditions")\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-2 h4 text-right){\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tDBFind(tables, src_mem).Columns("id,name,columns,conditions,permissions->insert,permissions->update,permissions->new_column").Vars(pre).WhereId(#tabl_id#)\n\t\t\t\tJsonToSource(src_columns, #pre_columns#)\n\t\t\t\tForList(src_columns){\n\t\t\t\t\tDiv(list-group-item){\n\t\t\t\t\t\tDiv(row){\n\t\t\t\t\t\t\tDiv(col-md-3 h5){\n\t\t\t\t\t\t\t\tSpan(#key#)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tDiv(col-md-2 h5){\n\t\t\t\t\t\t\t\tSetVar(col_type,GetColumnType(#pre_name#, #key#))\n\t\t\t\t\t\t\t\tIf(#col_type# == character){\n\t\t\t\t\t\t\t\t\tSpan(Character)\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == text){\n\t\t\t\t\t\t\t\t\tSpan("Text")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == number){\n\t\t\t\t\t\t\t\t\tSpan("Number")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == money){\n\t\t\t\t\t\t\t\t\tSpan("Money")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == varchar){\n\t\t\t\t\t\t\t\t\tSpan("Varchar")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == datetime){\n\t\t\t\t\t\t\t\t\tSpan("Date/Time")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == double){\n\t\t\t\t\t\t\t\t\tSpan("Double")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == character){\n\t\t\t\t\t\t\t\t\tSpan("Character")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == json){\n\t\t\t\t\t\t\t\t\tSpan("JSON")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == bytea){\n\t\t\t\t\t\t\t\t\tSpan("Binary Data")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tIf(#col_type# == uuid){\n\t\t\t\t\t\t\t\t\tSpan("UUID")\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tDiv(col-md-5 h5){\n\t\t\t\t\t\t\t\tSpan(#value#)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tDiv(col-md-2 text-right){\n\t\t\t\t\t\t\t\tButton(Body: "Edit", Class: btn btn-primary, Page: column_edit, PageParams: "name_column=#key#,tabl_id=#tabl_id#")\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(panel-footer){\n\t\t\t\tButton(Body: "Add Column", Class: btn btn-primary, Page: column_add, PageParams: "next_table_name=#pre_name#,tabl_id=#tabl_id#")\n\t\t\t}\n\t\t}\n\t\tDiv(row){\n\t\t\tDiv(col-md-6){\n\t\t\t\tDiv(panel panel-default){\n\t\t\t\t\tDiv(panel-heading){Write permissions}\n\t\t\t\t\tDiv(panel-body){\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tLabel("Insert")\n\t\t\t\t\t\t\tInput(Name: Insert_con, Type: text, Value: #pre_permissions_insert#)\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tLabel("Update")\n\t\t\t\t\t\t\tInput(Name: Update_con, Type: text, Value: #pre_permissions_update#)\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tLabel("New column")\n\t\t\t\t\t\t\tInput(Name: New_column_con, Type: text, Value: #pre_permissions_new_column#)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tDiv(panel-footer){\n\t\t\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Contract: @1EditTable, Page: app_tables, Params: "Name=#pre_name#")\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(col-md-6){\n\t\t\t\tDiv(panel panel-default){\n\t\t\t\t\tDiv(panel-heading){Conditions for changing permissions}\n\t\t\t\t\tDiv(panel-body){\n\t\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\t\tInput(Name: Insert_condition, Disabled:"true", Type: text, Value: #pre_conditions#)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '27',
                                                'table_view',
                                                'Div(content-wrapper){\n    SetTitle("Tables")\n    Div(breadcrumb){\n        LinkPage("Tables", app_tables)\n        Span(/).Style(margin-right: 10px; margin-left: 10px;)\n        Span(#table_name#, text-muted)\n    }\n\t\n\tDiv(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDiv(table-responsive){\n\t\t\t\tDBFind(#table_name#, src_mem)\n\t\t\t\tTable(Source: src_mem)\n\t\t\t}\n\t\t}\n\t}\n}',
                                                'admin_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '28',
                                                'admin_index',
                                                '',
                                                'admin_menu',
                                                '1',
                                                'true',
                                                '1',
                                                '0'
                                            ],
                                            [
                                                '29',
                                                'notifications',
                                                'DBFind(Name: notifications, Source: notifications_members).Columns("id,page_name,notification->icon,notification->header,notification->body").Where("closed=0 and notification->type=\'1\' and recipient->member_id=\'#key_id#\'")\n\t\t\tForList(notifications_members){\n\t\t\t\tDiv(Class: list-group-item){\n\t\t\t\t\tLinkPage(Page: #page_name#, PageParams: "notific_id=#id#"){\n\t\t\t\t\t\tDiv(media-box){\n\t\t\t\t\t\t\tDiv(Class: pull-left){\n\t\t\t\t\t\t\t\tEm(Class: fa #notification.icon# fa-1x text-primary)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tDiv(media-box-body clearfix){\n\t\t\t\t\t\t\t\tDiv(Class: m0 text-normal, Body: #notification.header#)\n\t\t\t\t\t\t\t\tDiv(Class: m0 text-muted h6, Body: #notification.body#)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tDBFind(Name: notifications, Source: notifications_roles).Columns("id,page_name,notification->icon,notification->header,notification->body,recipient->role_id").Where("closed=0 and notification->type=\'2\' and (date_start_processing is null or processing_info->member_id=\'#key_id#\')")\n\t\t\tForList(notifications_roles){\n\t\t\t    DBFind(Name: roles_participants, Source: src_roles).Columns("id").Where("member->member_id=\'#key_id#\' and role->id=\'#recipient.role_id#\' and deleted=0").Vars(prefix)\n\t\t\t    If(#prefix_id# > 0){\n\t\t\t\t\tDiv(Class: list-group-item){\n\t\t\t\t\t\tLinkPage(Page: #page_name#, PageParams: "notific_id=#id#"){\n\t\t\t\t\t\t\tDiv(media-box){\n\t\t\t\t\t\t\t\tDiv(Class: pull-left){\n\t\t\t\t\t\t\t\t\tEm(Class: fa #notification.icon# fa-1x text-primary)\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tDiv(media-box-body clearfix){\n\t\t\t\t\t\t\t\t\tDiv(Class: m0 text-normal, Body: #notification.header#)\n\t\t\t\t\t\t\t\t\tDiv(Class: m0 text-muted h6, Body: #notification.body#)\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n}',
                                                'default_menu',
                                                '1',
                                                'ContractAccess("@1EditPage")',
                                                '1',
                                                '0'
                                            ]
                                        ],
                                        limit: '50',
                                        name: 'pages',
                                        offset: '0',
                                        order: 'id asc',
                                        source: 'src_pages',
                                        types: [
                                            'text',
                                            'text',
                                            'text',
                                            'text',
                                            'text',
                                            'text',
                                            'text',
                                            'text'
                                        ],
                                        where: 'app_id=1'
                                    }
                                },
                                {
                                    tag: 'form',
                                    attr: {
                                        'class': 'panel panel-primary'
                                    },
                                    children: [
                                        {
                                            tag: 'div',
                                            attr: {
                                                'class': 'panel-body'
                                            },
                                            children: [
                                                {
                                                    tag: 'div',
                                                    attr: {
                                                        'class': 'row'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'forlist',
                                                            attr: {
                                                                source: 'src_pages'
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '1'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'default_page'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'default_page'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '1',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'default_page',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '2'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_binary'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_binary'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '2',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_binary',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '3'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_blocks'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_blocks'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '3',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_blocks',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '4'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_contracts'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_contracts'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '4',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_contracts',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '5'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '5',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '6'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_langres'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_langres'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '6',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_langres',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '7'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_pages'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_pages'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '7',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_pages',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '8'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_params'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_params'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '8',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_params',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '9'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_params_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_params_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '9',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_params_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '10'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_tables'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_tables'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '10',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_tables',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '11'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'app_upload_binary'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'app_upload_binary'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '11',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'app_upload_binary',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '12'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'apps_list'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'apps_list'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '12',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'apps_list',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '13'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'column_add'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'column_add'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '13',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'column_add',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '14'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'column_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'column_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '14',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'column_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '15'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'export_download'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'export_download'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '15',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'export_download',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '16'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'export_resources'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'export_resources'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '16',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'export_resources',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '17'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'import_app'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'import_app'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '17',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'import_app',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '18'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'import_upload'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'import_upload'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '18',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'import_upload',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '19'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'langres_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'langres_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '19',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'langres_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '20'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'langres_add'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'langres_add'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '20',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'langres_add',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '21'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'menus_list'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'menus_list'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '21',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'menus_list',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '22'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'params_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'params_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '22',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'params_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '23'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'params_list'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'params_list'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '23',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'params_list',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '24'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'properties_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'properties_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '24',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'properties_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '25'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'table_create'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'table_create'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '25',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'table_create',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '26'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'table_edit'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'table_edit'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '26',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'table_edit',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '27'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'table_view'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'table_view'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '27',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'table_view',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '28'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'admin_index'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'admin_index'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '28',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'admin_index',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    tag: 'div',
                                                                    attr: {
                                                                        'class': 'col-md-12 col-sm-12'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'div',
                                                                            attr: {
                                                                                'class': 'list-group-item'
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'div',
                                                                                    attr: {
                                                                                        'class': 'row'
                                                                                    },
                                                                                    children: [
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-4'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'span',
                                                                                                    attr: {
                                                                                                        'class': 'h5 text-bold',
                                                                                                        style: 'margin-right: 10px;'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: '29'
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    tag: 'linkpage',
                                                                                                    attr: {
                                                                                                        'class': 'text-primary h5',
                                                                                                        page: 'notifications'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'text',
                                                                                                            text: 'notifications'
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            tag: 'div',
                                                                                            attr: {
                                                                                                'class': 'col-md-8'
                                                                                            },
                                                                                            children: [
                                                                                                {
                                                                                                    tag: 'div',
                                                                                                    attr: {
                                                                                                        'class': 'pull-right'
                                                                                                    },
                                                                                                    children: [
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            attr: {
                                                                                                                style: 'margin-right: 15px;'
                                                                                                            },
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'properties_edit',
                                                                                                                        pageparams: {
                                                                                                                            edit_property_id: {
                                                                                                                                text: '29',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            type: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-cogs'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            tag: 'span',
                                                                                                            children: [
                                                                                                                {
                                                                                                                    tag: 'linkpage',
                                                                                                                    attr: {
                                                                                                                        'class': 'text-primary h4',
                                                                                                                        page: 'editor',
                                                                                                                        pageparams: {
                                                                                                                            name: {
                                                                                                                                text: 'notifications',
                                                                                                                                type: 'text'
                                                                                                                            },
                                                                                                                            open: {
                                                                                                                                text: 'page',
                                                                                                                                type: 'text'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    children: [
                                                                                                                        {
                                                                                                                            tag: 'em',
                                                                                                                            attr: {
                                                                                                                                'class': 'fa fa-edit'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'div',
                                            attr: {
                                                'class': 'panel-footer clearfix'
                                            },
                                            children: [
                                                {
                                                    tag: 'dbfind',
                                                    attr: {
                                                        columns: [
                                                            'id',
                                                            'name',
                                                            'value',
                                                            'menu',
                                                            'validate_count',
                                                            'conditions',
                                                            'app_id',
                                                            'validate_mode'
                                                        ],
                                                        count: '29',
                                                        data: [
                                                            [
                                                                '2',
                                                                'app_binary',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Binary data": #app_name#)\n        AddToolButton(Title: "Upload binary", Page: app_upload_binary, Icon: icon-plus, PageParams: "app_id=#app_id#")\n\n        SetVar(pager_table, binaries).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_binary).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_binary)\n        Include(admin_link)\n\n        DBFind(binaries, src_binparameters).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_binparameters){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        If(#member_id# == #key_id#){\n                                            LinkPage(Class: text-primary h5, Body: #name#, Page: app_upload_binary, PageParams: "id=#id#,app_id=#buffer_value_app_id#")\n                                        }.Else{\n                                            Span(Class: h5, Body: #name#)\n                                        }\n                                    }\n                                    Div(col-md-8 text-right){\n                                        Span(#hash#)\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Binary data")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '3',
                                                                'app_blocks',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Blocks": #app_name#)\n        AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=block,appId=#buffer_value_app_id#")\n\n        SetVar(pager_table, blocks).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_blocks).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_blocks)\n        Include(admin_link)\n\n        DBFind(blocks, src_blocks).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_blocks){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=block")).Style(margin-right: 15px;)\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=block,name=#name#"))\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Blocks")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '4',
                                                                'app_contracts',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Contracts": #app_name#)\n        AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=contract,appId=#buffer_value_app_id#")\n\n        SetVar(pager_table, contracts).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_contracts).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_contracts)\n        Include(admin_link)\n\n        DBFind(contracts, src_contracts).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_contracts){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=contract")).Style(margin-right: 15px;)\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=contract,name=#name#"))\n                                        }\n                                        Div(pull-right){\n                                            If(#active#==1){\n                                                Span(Class: h5, Body: Em(Class: fa fa-check)).Style(margin-right: 50px;)\n                                            }.Else{\n                                                Span(Class: h5 text-muted, Body: Em(Class: fa fa-minus)).Style(margin-right: 50px;)\n                                            }\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Contracts")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '5',
                                                                'app_edit',
                                                                'Div(content-wrapper){\n    SetTitle("Application")\n    Div(breadcrumb){\n\t\tLinkPage("Applications", apps_list)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tIf(#id# > 0){\n\t\t\tSpan(Class: text-muted, Body: "Edit")\n\t\t}.Else{\n\t\t\tSpan(Class: text-muted, Body: "New")\n\t\t}\n    }\n\t\n\tForm(){\n\t\tIf(#id# > 0){\n\t\t\tDBFind(applications, src_apps).Columns("id,name,conditions,deleted").Where("id=#id#").Limit(1).Vars("app")\n\t\t\tDiv(col-md-12){\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Name")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: name, Disabled: "true", Value: #app_name#)\n\t\t\t\t}\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Change conditions")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: conditions, Value: #app_conditions#)\n\t\t\t\t}\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tDiv(text-left col-md-6){\n\t\t\t\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: apps_list, Contract: EditApplication, Params: "ApplicationId=#id#,Conditions=Val(conditions)")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tDiv(text-right col-md-6){\n\t\t\t\t\t\t\tIf(#app_deleted# == 0){\n\t\t\t\t\t\t\t\tButton(Body: "Delete", Class: btn btn-danger, Page: apps_list, Contract: DelApplication, Params: "ApplicationId=#app_id#,Value=1")\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}.Else{\n\t\t\tDiv(col-md-12){\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Name")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: name)\n\t\t\t\t}\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tLabel("Change conditions")\n\t\t\t\t\t}\n\t\t\t\t\tInput(Name: conditions)\n\t\t\t\t}\n\t\t\t\tDiv(form-group){\n\t\t\t\t\tDiv(text-left){\n\t\t\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: apps_list, Contract: NewApplication, Params: "Name=Val(name),Conditions=Val(conditions)")\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '6',
                                                                'app_langres',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Language resources": #app_name#)\n        AddToolButton(Title: "Create", Page: langres_add, Icon: icon-plus, PageParams: "app_id=#app_id#")\n\n        SetVar(pager_table, languages).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_langres).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_langres)\n        Include(admin_link)\n\n        DBFind(languages, src_languages).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_languages){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: langres_edit, PageParams: "lang_id=#id#"))\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Language resources")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '7',
                                                                'app_pages',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Pages": #app_name#)\n        AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=page,appId=#buffer_value_app_id#")\n\n        SetVar(pager_table, pages).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_pages).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_pages)\n        Include(admin_link)\n\n        DBFind(pages, src_pages).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_pages){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        LinkPage(Page: #name#, Class: text-primary h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=page")).Style(margin-right: 15px;)\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=page,name=#name#"))\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Pages")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '27',
                                                                'table_view',
                                                                'Div(content-wrapper){\n    SetTitle("Tables")\n    Div(breadcrumb){\n        LinkPage("Tables", app_tables)\n        Span(/).Style(margin-right: 10px; margin-left: 10px;)\n        Span(#table_name#, text-muted)\n    }\n\t\n\tDiv(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDiv(table-responsive){\n\t\t\t\tDBFind(#table_name#, src_mem)\n\t\t\t\tTable(Source: src_mem)\n\t\t\t}\n\t\t}\n\t}\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '28',
                                                                'admin_index',
                                                                '',
                                                                'admin_menu',
                                                                '1',
                                                                'true',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '8',
                                                                'app_params',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Application parameters": #app_name#)\n        AddToolButton(Title: "Create", Page: app_params_edit, Icon: icon-plus, PageParams: "app_id=#app_id#,create=create")\n\n        SetVar(pager_table, app_params).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_params).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_params)\n        Include(admin_link)\n\n        DBFind(app_params, src_appparameters).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_appparameters){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        Span(Class: h5, Body: "#name#")\n                                    }\n                                    Div(col-md-8 text-right){\n                                        Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: app_params_edit, PageParams: "id=#id#"))\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Application parameters")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '9',
                                                                'app_params_edit',
                                                                'Div(content-wrapper){\n    If(#create# == create){\n        SetVar(param_name, "New")\n    }.Else{\n\t\tDBFind(app_params, src_params).Where("id = #id#").Limit(1).Vars("param")\n    }\n\t\n\tSetTitle("Application parameter")\n\tDiv(Class: breadcrumb){\n\t\tLinkPage("Application parameters", app_params)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tSpan(Class: text-muted, Body: #param_name#)\n\t}\n\n    Form(){\n        Div(form-group){\n            Label("Name")\n            If(#create# == create){\n                Input(Name: name)\n            }.Else{\n                Input(Name: name, Value: #param_name#, Disabled: "true")\n            }\n        }\n        Div(form-group){\n            If(#create# == create){\n                Input(Type: textarea, Name: value).Style(height: 500px !important;)\n            }.Else{\n                Input(Type: textarea, Name: value, Value: "#param_value#").Style(height: 500px !important;)\n            }\n        }\n        Div(form-group){\n            Label("Change conditions")\n            If(#create# == create){\n                Input(Name: conditions)\n            }.Else{\n                Input(Name: conditions, Value: #param_conditions#)\n            }\n        }\n        Div(form-group){\n            If(#create# == create){\n                Button(Class: btn btn-primary, Body: "Save", Contract: NewAppParam, Params: "Name=Val(name),Value=Val(value),Conditions=Val(conditions),ApplicationId=#app_id#", Page: app_params)\n            }.Else{\n                Button(Class: btn btn-primary, Body: "Save", Contract: EditAppParam, Params: "Id=#id#,Value=Val(value),Conditions=Val(conditions)", Page: app_params)\n            }\n        }\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '10',
                                                                'app_tables',
                                                                'DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\nIf(#buffer_value_app_id# > 0){\n    DBFind(applications, src_app).Where("id=#buffer_value_app_id#").Limit(1).Vars("app")\n\n    Div(content-wrapper){\n        SetTitle("Tables": #app_name#)\n        AddToolButton(Title: "Create", Page: table_create, Icon: icon-plus, PageParams: "app_id=#app_id#")\n\n        SetVar(pager_table, tables).(pager_where, "app_id=#buffer_value_app_id#").(pager_page, app_tables).(pager_limit, 50)\n        Include(pager_header)\n\n        SetVar(admin_page, app_tables)\n        Include(admin_link)\n\n        DBFind(tables, src_tables).Limit(#pager_limit#).Order(#sort_name#).Offset(#pager_offset#).Where("app_id=#buffer_value_app_id#")\n\n        Form(panel panel-primary){\n            Div(panel-body){\n                Div(row){\n                    ForList(src_tables){\n                        Div(col-md-#width# col-sm-12){\n                            Div(list-group-item){\n                                Div(row){\n                                    Div(col-md-4){\n                                        Span(Class: h5 text-bold, Body: "#id#").Style(margin-right: 10px;)\n                                        LinkPage(Page: table_view, Class: text-primary h5, Body: "#name#", PageParams: "table_name=#name#")\n                                    }\n                                    Div(col-md-8){\n                                        Div(pull-right){\n                                            Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: table_edit, PageParams: "tabl_id=#id#"))\n                                        }\n                                        Div(pull-right){\n                                            DBFind(#name#).Columns("id").Count(countvar)\n                                            Span(Class: h5 text-muted, Body: #countvar#).Style(margin-right: 50px;)\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n            Div(panel-footer clearfix){\n                Include(pager)\n            }\n        }\n    }\n}.Else{\n    SetTitle("Tables")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "You did not select the application. Viewing resources is not available")\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '11',
                                                                'app_upload_binary',
                                                                'Div(content-wrapper){\n    SetTitle("Binary data")\n    Div(breadcrumb){\n        LinkPage("Binary data", app_binary)\n        Span(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tIf(#id# > 0){\n\t\t\tSpan("Edit", text-muted)\n\t\t\tDBFind(binaries).Columns(name).Where(id = #id#).Vars(binary)\n\t\t}.Else{\n\t\t\tSpan("Upload", text-muted)\n\t\t}\n    }\n\t\n\tForm(){\n\t\tDiv(form-group){\n\t\t\tDiv(text-left){\n\t\t\t\tLabel("Name")\n\t\t\t}\n\t\t\tIf(#id# > 0){\n\t\t\t\tInput(Name: name, Disabled: disabled, Value: #binary_name#)\n\t\t\t}.Else{\n\t\t\t\tInput(Name: name)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tDiv(text-left){\n\t\t\t\tLabel("File")\n\t\t\t}\n\t\t\tInput(Name: databin, Type: file)\n\t\t}\n\t\tDiv(form-group text-left){\n\t\t\tButton(Body: "Upload", Contract: UploadBinary, Class: btn btn-primary, Params: "Name=Val(name),ApplicationId=#app_id#,Data=Val(databin),MemberID=#key_id#", Page: app_binary)\n\t\t}\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '12',
                                                                'apps_list',
                                                                'Div(fullscreen){\n    If(#deleted# == deleted){\n        SetTitle("Inactive applications")\n\t\tDiv(breadcrumb){\n\t\t\tLinkPage("Applications", apps_list)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan(Class: text-muted, Body: "Inactive applications")\n\t\t}\n\t\n        DBFind(applications, src_applications).Where("deleted=1").Order("id").Count(countvar).Custom(restore_btn){\n            Button(Class: btn btn-link, Page: apps_list, Contract: DelApplication, Params: "ApplicationId=#id#", Body: "Restore")\n        }\n        If(#countvar# > 0) {\n            Table(Source: src_applications, Columns: "ID=id,Name=name,Conditions=conditions,=restore_btn").Style(\n                tbody > tr:nth-of-type(odd) {\n                    background-color: #fafbfc;\n                }\n                tbody > tr > td {\n                    word-break: break-all;\n                    font-weight: 400;\n                    font-size: 13px;\n                    color: #666;\n                    border-top: 1px solid #eee;\n                    vertical-align: middle;\n                }\n                tr > *:first-child {\n                    padding-left:20px;\n                    width: 80px;\n                }\n                tr > *:last-child {\n                    padding-right:80px;\n                    text-align:right;\n                    width: 100px;\n                }\n                thead {\n                    background-color: #eee;\n                }\n            )\n        }.Else{\n            Div(content-wrapper){\n                Span(Class: text-muted, Body: "You don\'t have any inactive applications")\n            }\n        }\n    }.Else{\n        SetTitle("Applications")\n\t\tDiv(breadcrumb){\n\t\t\tSpan(Class: text-muted, Body: "This section is used to select installed applications")\n\t\t}\n        AddToolButton(Title: "Inactive apps", Page: apps_list, Icon: icon-close, PageParams:"deleted=deleted")\n        AddToolButton(Title: "Create", Page: app_edit, Icon: icon-plus)\n\t\n        DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n        DBFind(applications, src_applications).Where("deleted=0").Order("id").Custom(custom_check){\n            If(#id#==#buffer_value_app_id#){\n                Span(Em(Class: fa fa-check)).Style(margin-left:30px;)\n            }.Else{\n                Button(Class: btn btn-link, Contract: Export_NewApp, Params: "app_id=#id#", Page: apps_list, Body: "select")\n            }\n        }.Custom(custom_actions){\n            Button(Class: btn btn-link, Body: Em(Class: fa fa-edit), Page: app_edit, PageParams: "id=#id#")\n        }\n\n        Table(Source: src_applications, Columns: "ID=id,Name=name,Conditions=conditions,Selected=custom_check,=custom_actions").Style(\n            tbody > tr:nth-of-type(odd) {\n                background-color: #fafbfc;\n            }\n            tbody > tr > td {\n                word-break: break-all;\n                font-weight: 400;\n                font-size: 13px;\n                color: #666;\n                border-top: 1px solid #eee;\n                vertical-align: middle;\n            }\n            tr > *:first-child {\n                padding-left:20px;\n                width: 80px;\n            }\n            tr > *:last-child {\n                padding-right:15px;\n                text-align:right;\n                width: 100px;\n            }\n            thead {\n                background-color: #eee;\n            }\n        )\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '13',
                                                                'column_add',
                                                                'Div(content-wrapper){\n\tSetTitle("Tables")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tLinkPage("Tables", app_tables)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tLinkPage("Edit table", table_edit, PageParams:"tabl_id=#tabl_id#")\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan("Add column", text-muted)\n\t\t}\n\t}\n\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Column")\n\t\t\t\tInput(Name: ColumnName)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tData(src_type,"type,name"){\n\t\t\t\t\ttext,"Text"\n\t\t\t\t\tnumber,"Number"\n\t\t\t\t\tvarchar,"Varchar"\n\t\t\t\t\tdatetime,"Date/Time"\n\t\t\t\t\tmoney,"Money"\n\t\t\t\t\tdouble,"Double"\n\t\t\t\t\tcharacter,"Character"\n\t\t\t\t\tjson,"JSON"\n\t\t\t\t}\n\t\t\t\tLabel("Type")\n\t\t\t\tSelect(Name: Coltype, Source: src_type, NameColumn: name, ValueColumn: type, Value:"text")\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Update")\n\t\t\t\tInput(Name: ColumnUp)\n\t\t\t}\n\t\t}\n\t\tDiv(panel-footer clearfix){\n\t\t\tButton(Body: "Add column", Contract: NewColumn, Class: btn btn-primary, Page: table_edit, PageParams: "tabl_id=#tabl_id#", Params: "TableName=#next_table_name#,Name=Val(ColumnName),Type=Val(Coltype),Permissions=Val(ColumnUp)")\n\t\t}\n\t}\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '14',
                                                                'column_edit',
                                                                'Div(content-wrapper){\n\tSetTitle("Edit column")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tLinkPage("Tables", app_tables)\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tLinkPage("Edit table", table_edit, PageParams:"tabl_id=#tabl_id#")\n\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\tSpan("Edit column", text-muted)\n\t\t}\n\t}\n\n\tDBFind(tables, src_mem).Columns("id,name,columns,conditions").Vars(pre).WhereId(#tabl_id#)\n\tJsonToSource(src_columns, #pre_columns#)\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tForList(src_columns){\n\t\t\t\tIf(#key# == #name_column#){\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tLabel("Column")\n\t\t\t\t\t\tInput(Name: ColumnName, Disabled: "true", Value: #name_column#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tLabel("Type")\n\t\t\t\t\t\tSetVar(col_type, GetColumnType(#pre_name#, #key#))\n\t\t\t\t\t\tIf(#col_type# == character){\n\t\t\t\t\t\t\tSetVar(input_type, "Character")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == text){\n\t\t\t\t\t\t\tSetVar(input_type, "Text")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == number){\n\t\t\t\t\t\t\tSetVar(input_type, "Number")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == money){\n\t\t\t\t\t\t\tSetVar(input_type, "Money")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == varchar){\n\t\t\t\t\t\t\tSetVar(input_type, "Varchar")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == datetime){\n\t\t\t\t\t\t\tSetVar(input_type, "Date/Time")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == double){\n\t\t\t\t\t\t\tSetVar(input_type, "Double")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == character){\n\t\t\t\t\t\t\tSetVar(input_type, "Character")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == json){\n\t\t\t\t\t\t\tSetVar(input_type, "JSON")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == bytea){\n\t\t\t\t\t\t\tSetVar(input_type, "Binary Data")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tIf(#col_type# == uuid){\n\t\t\t\t\t\t\tSetVar(input_type, "UUID")\n\t\t\t\t\t\t}\n\t\t\t\t\t\tInput(Name: Coltype, Disabled: "true", Value: #input_type#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(form-group){\n\t\t\t\t\t\tLabel("Update")\n\t\t\t\t\t\tInput(Name: ColumnUp, Value: #value#)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tDiv(panel-footer clearfix){\n\t\t\tButton(Body: "Save", Contract: EditColumn, Class: btn btn-primary, Page: table_edit, PageParams: "tabl_id=#tabl_id#", Params: "TableName=#pre_name#,Name=Val(ColumnName),Type=Val(Coltype),Permissions=Val(ColumnUp)")\n\t\t}\n\t}\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '15',
                                                                'export_download',
                                                                'Div(fullscreen){\n    SetTitle("Export")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Payload was formed. You can download it now")\n    }\n\n    DBFind(binaries, src_binaries).Where("name=\'export\' and member_id=#key_id# and app_id=1").Custom(app_name){\n        DBFind(Name: buffer_data, Source: src_buffer).Columns("value->app_name").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n        Span(#buffer_value_app_name#)\n    }\n\n    Table(Source: src_binaries, "Applications=app_name,=data").Style(\n        tbody > tr:nth-of-type(odd) {\n            background-color: #fafbfc;\n        }\n        tbody > tr > td {\n            word-break: break-all;\n            font-weight: 400;\n            font-size: 13px;\n            color: #666;\n            border-top: 1px solid #eee;\n            vertical-align: middle;\n        }\n        tr > *:first-child {\n            padding-left:20px;\n            width: 100px;\n        }\n        tr > *:last-child {\n            padding-right:20px;\n            text-align:right;\n        }\n        thead {\n            background-color: #eee;\n        }\n    )\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '16',
                                                                'export_resources',
                                                                'Div(content-wrapper){\n    SetTitle("Export")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Select the application which do you want to export and proceed to the payload generation process.")\n    }\n\n    Include(export_link)\n    DBFind(buffer_data, src_buffer).Columns("value->app_id,value->app_name,value->menu_name,value->menu_id,value->count_menu").Where("key=\'export\' and member_id=#key_id#").Vars(buffer)\n\n    If(#buffer_value_app_id# > 0){\n        If(#res_type#=="pages"){\n            DBFind(pages, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="blocks"){\n            DBFind(blocks, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="menu"){\n            DBFind(menu, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("id in (#buffer_value_menu_id#)").Order("id")\n        }\n        If(#res_type#=="parameters"){\n            DBFind(app_params, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="languages"){\n            DBFind(languages, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="contracts"){\n            DBFind(contracts, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n        If(#res_type#=="tables"){\n            DBFind(tables, src).Custom(cbox){\n                Input(Name: cbox, Type: checkbox, Value: true, Disabled: 1)\n            }.Where("app_id = #buffer_value_app_id#").Order("id")\n        }\n    }\n\n    Div(row){\n        Div(col-md-9 col-md-offset-0){\n            Table(src, "ID=id,Name=name,=cbox").Style(\n                tbody > tr:nth-of-type(odd) {\n                    background-color: #fafbfc;\n                }\n                tbody > tr > td {\n                    word-break: break-all;\n                    padding: 8px 20px !important;\n                    font-weight: 400;\n                    font-size: 13px;\n                    color: #666;\n                    border-top: 1px solid #eee;\n                    vertical-align: middle;\n                }\n                tr > *:first-child {\n                    padding-left:20px;\n                    width: 100px;\n                }\n                tr > *:last-child {\n                    text-align:right;\n                    padding-right:20px;\n                    width: 50px;\n                }\n                thead {\n                    background-color: #eee;\n                }\n            )\n        }\n        Div(col-md-3 col-md-offset-0){\n            Include(export_info)\n        }\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '17',
                                                                'import_app',
                                                                'Div(content-wrapper){\n    DBFind(buffer_data, src_buffer).Columns("id,value->name,value->data").Where("key=\'import\' and member_id=#key_id#").Vars(prefix)\n    DBFind(buffer_data, src_buffer).Columns("value->app_name,value->pages,value->pages_count,value->blocks,value->blocks_count,value->menu,value->menu_count,value->parameters,value->parameters_count,value->languages,value->languages_count,value->contracts,value->contracts_count,value->tables,value->tables_count").Where("key=\'import_info\' and member_id=#key_id#").Vars(info)\n\n    SetTitle("Import - #info_value_app_name#")\n    Data(data_info, "name,count,info"){\n        Pages,"#info_value_pages_count#","#info_value_pages#"\n        Blocks,"#info_value_blocks_count#","#info_value_blocks#"\n        Menu,"#info_value_menu_count#","#info_value_menu#"\n        Parameters,"#info_value_parameters_count#","#info_value_parameters#"\n        Language resources,"#info_value_languages_count#","#info_value_languages#"\n        Contracts,"#info_value_contracts_count#","#info_value_contracts#"\n        Tables,"#info_value_tables_count#","#info_value_tables#"\n    }\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Your data that you can import")\n    }\n\n    Div(panel panel-primary){\n        ForList(data_info){\n            Div(list-group-item){\n                Div(row){\n                    Div(col-md-10 mc-sm text-left){\n                        Span(Class: text-bold, Body: "#name#")\n                    }\n                    Div(col-md-2 mc-sm text-right){\n                        If(#count# > 0){\n                            Span(Class: text-bold, Body: "(#count#)")\n                        }.Else{\n                            Span(Class: text-muted, Body: "(0)")\n                        }\n                    }\n                }\n                Div(row){\n                    Div(col-md-12 mc-sm text-left){\n                        If(#count# > 0){\n                            Span(Class: h6, Body: "#info#")\n                        }.Else{\n                            Span(Class: text-muted h6, Body: "Nothing selected")\n                        }\n                    }\n                }\n            }\n        }\n        If(#prefix_id# > 0){\n            Div(list-group-item text-right){\n                Button(Body: "Import", Class: btn btn-primary, Page: apps_list).CompositeContract("Import", "#prefix_value_data#")\n            }\n        }\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '18',
                                                                'import_upload',
                                                                'Div(content-wrapper){\n    SetTitle("Import")\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "Select payload that you want to import")\n    }\n    Form(panel panel-primary){\n        Div(list-group-item){\n            Input(Name: input_file, Type: file)\n        }\n        Div(list-group-item text-right){\n            Button(Body: "Load", Class: btn btn-primary, Contract: Import_Upload, Page: import_app)\n        }\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '19',
                                                                'langres_edit',
                                                                'Div(content-wrapper){\n\tSetTitle("Language resources")\n\tDiv(Class: breadcrumb){\n\t\tLinkPage("Language resources", app_langres)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tSpan(Class: text-muted, Body: "Edit")\n\t}\n\t\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDBFind(languages, src_leng).Vars(pre).WhereId(#lang_id#)\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12){\n\t\t\t\t\tLabel("Name")\n\t\t\t\t\tInput(Name: LangName, Disabled: "true", Value: #pre_name#)\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Locale")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-10 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Value")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Action")\n\t\t\t\t}\n\t\t\t}\n\t\t\tSetVar(json,#pre_res#)\n\t\t\tJsonToSource(pv, #json#)\n\t\t\tForList(Source: pv){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tInput(Name: idshare, Value: #key#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-10 mt-sm){\n\t\t\t\t\t\tInput(Name: share, Value: #value#)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tIf(#del# == 1){\n\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# - 1, Type: int))\n\t\t\t}.Else{\n\t\t\t\tIf(GetVar(count)==""){\n\t\t\t\t\tSetVar(count, 0)\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count#, Type: int))\n\t\t\t\t}.Else{\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# + 1, Type: int))\n\t\t\t\t}\n\t\t\t}\n\t\t\tRange(params_range, 0, #next_count#)\n\t\t\tForList(Source: params_range){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tInput(Name:idshare)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-10 mt-sm){\n\t\t\t\t\t\tInput(Name:share)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tIf(And(#next_count# == #params_range_index#, #next_count# > 0)){\n\t\t\t\t\t\t\tButton(Em(Class: fa fa-trash), Class: btn btn-default, PageParams: "lang_id=#lang_id#,count_sec=#next_count#,count=#count#,del=1", Page:langres_edit)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12 mt-lg){\n\t\t\t        LinkPage(Body: "Add localization", Page: langres_edit, PageParams: "lang_id=#lang_id#,count_sec=#next_count#,count=#count#")\n                }\n            }\n\t\t}\n\t\tDiv(panel-footer){\n\t\t\tButton(Body: "Save", Class: btn btn-primary, Contract: @1EditLang, Params: "Value=Val(share),IdLanguage=Val(idshare),Id=#lang_id#", Page: app_langres)\n\t\t}\n\t}\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '20',
                                                                'langres_add',
                                                                'Div(content-wrapper){\n\tSetTitle("Language resources")\n\tDiv(Class: breadcrumb){\n\t\tLinkPage("Language resources", app_langres)\n\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\tSpan(Class: text-muted, Body: "Create")\n\t}\n\n\tForm(panel panel-default){\n\t\tDiv(panel-body){\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12){\n\t\t\t\t\tLabel("Name")\n\t\t\t\t\tInput(Name: LangName)\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Locale")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-10 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Value")\n\t\t\t\t}\n\t\t\t\tDiv(col-md-1 mt-lg){\n\t\t\t\t\tLabel(Class: text-muted, Body: "Action")\n\t\t\t\t}\n\t\t\t}\n\t\t\tIf(#del# == 1){\n\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# - 1, Type: int))\n\t\t\t}.Else{\n\t\t\t\tIf(GetVar(count)==""){\n\t\t\t\t\tSetVar(count, 0)\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count# + 1, Type: int))\n\t\t\t\t}.Else{\n\t\t\t\t\tSetVar(next_count, Calculate( Exp: #count_sec# + 1, Type: int))\n\t\t\t\t}\n\t\t\t}\n\t\t\tRange(params_range, 0, #next_count#)\n\t\t\tForList(Source: params_range){\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tInput(Name:idshare)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-10 mt-sm){\n\t\t\t\t\t\tInput(Name:share)\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-1 mt-sm){\n\t\t\t\t\t\tIf(And(#next_count# == #params_range_index#, #next_count# > 1)){\n\t\t\t\t\t\t\tButton(Body: Em(Class: fa fa-trash), Class: btn btn-default, PageParams: "count_sec=#next_count#,count=#count#,del=1,app_id=#app_id#", Page: langres_add)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(row){\n\t\t\t\tDiv(col-md-12 mt-lg){\n\t\t\t\t\tLinkPage(Body: "Add localization", Page: langres_add, PageParams:"count_sec=#next_count#,count=#count#,app_id=#app_id#")\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tDiv(panel-footer){\n\t\t\tButton(Body: "Save", Class: btn btn-primary, Contract:@1NewLang, Page: app_langres, Params: "ApplicationId=#app_id#,Name=Val(LangName),Value=Val(share),IdLanguage=Val(idshare)")\n\t\t}\n\t}\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '21',
                                                                'menus_list',
                                                                'Div(fullscreen){\n    SetTitle("Menu")\n    AddToolButton(Title: "Create", Page: editor, Icon: icon-plus, PageParams: "create=menu,appId=0")\n\tDiv(breadcrumb){\n\t\tSpan(Class: text-muted, Body: "This section is used to manage the menu")\n\t}\n\n    DBFind(menu, src_menus).Limit(250).Order("id").Custom(action){\n        Span(LinkPage(Body: Em(Class: fa fa-cogs), Class: text-primary h4, Page: properties_edit, PageParams: "edit_property_id=#id#,type=menu")).Style(margin-right: 20px;)\n        Span(LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: editor, PageParams: "open=menu,name=#name#"))\n    }\n\n    Table(src_menus, "ID=id,Name=name,Title=title,Conditions=conditions,=action").Style(\n    tbody > tr:nth-of-type(odd) {\n        background-color: #fafbfc; \n    }\n    tbody > tr > td {\n        word-break: break-all;\n        font-weight: 400;\n        font-size: 13px;\n        color: #666;\n        border-top: 1px solid #eee;\n        vertical-align: middle;\n    }\n    tr  > *:first-child {\n        padding-left:20px;\n        width: 80px;\n    }\n    tr  > *:last-child {\n        padding-right:30px;\n        text-align:right; \n        width: 100px;\n    }\n    thead {\n        background-color: #eee;\n    })\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '22',
                                                                'params_edit',
                                                                'Div(content-wrapper){\n\tIf(#stylesheet# == stylesheet){\n\t\tDBFind(parameters, src_params).Where(name=\'#stylesheet#\').Vars("param")\n\t}.Else{\n\t\tIf(#id#>0){\n\t\t\tDBFind(parameters, src_params).WhereId(#id#).Vars("param")\n\t\t}.Else{\n\t\t\tSetVar(param_name, "New")\n\t\t}\n\t}\n\n\tSetTitle("Ecosystem parameters")\n    Div(Class: breadcrumb){\n        LinkPage("Ecosystem parameters", params_list)\n        Span(/).Style(margin-right: 10px; margin-left: 10px;)\n        Span(Class: text-muted, Body: #param_name#)\n    }\n\t\n\tForm(){\n\t\tDiv(form-group){\n\t\t\tLabel("Name")\n\t\t\tIf(#param_id#>0){\n\t\t\t\tInput(Name: name, Value: #param_name#, Disabled: "true")\n\t\t\t}.Else{\n\t\t\t\tInput(Name: name)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tIf(#param_id#>0){\n\t\t\t\tInput(Type: textarea, Name: value, Value: "#param_value#").Style(height: 500px !important;)\n\t\t\t}.Else{\n\t\t\t\tInput(Type: textarea, Name: value).Style(height: 500px !important;)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tLabel("Change conditions")\n\t\t\tIf(#param_id#>0){\n\t\t\t\tInput(Name: conditions, Value: #param_conditions#)\n\t\t\t}.Else{\n\t\t\t\tInput(Name: conditions)\n\t\t\t}\n\t\t}\n\t\tDiv(form-group){\n\t\t\tIf(#param_id#>0){\n\t\t\t\tButton(Class: btn btn-primary, Body: "Save", Contract: EditParameter, Params: "Id=#param_id#,Value=Val(value),Conditions=Val(conditions)", Page: params_list)\n\t\t\t}.Else{\n\t\t\t\tButton(Class: btn btn-primary, Body: "Save", Contract: NewParameter, Params: "Name=Val(name),Value=Val(value),Conditions=Val(conditions)", Page: params_list)\n\t\t\t}\n\t\t}\n\t}\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '23',
                                                                'params_list',
                                                                'Div(fullscreen){\n    SetTitle("Ecosystem parameters")\n    AddToolButton(Title: "Manage stylesheet", Page: params_edit, Icon: icon-picture, PageParams:"stylesheet=stylesheet")\n    AddToolButton(Title: "Create", Page: params_edit, Icon: icon-plus)\n    Div(breadcrumb){\n        Span(Class: text-muted, Body: "This section is used to configure stored reusable parameters")\n    }\n\n    DBFind(parameters, src_appparameters).Order("id").Custom(custom_actions){\n        LinkPage(Body: Em(Class: fa fa-edit), Class: text-primary h4, Page: params_edit, PageParams: "id=#id#")\n    }\n\n    Table(src_appparameters, "ID=id,Name=name,Application=app_id,Value=value,Conditions=conditions,=custom_actions").Style(\n        tbody > tr:nth-of-type(odd) {\n            background-color: #fafbfc;\n        }\n        tbody > tr > td {\n            word-break: break-all;\n            font-weight: 400;\n            font-size: 13px;\n            color: #666;\n            border-top: 1px solid #eee;\n            vertical-align: middle;\n        }\n        tr > *:first-child {\n            padding-left:20px;\n            width: 80px;\n        }\n        tr > *:last-child {\n            padding-right:30px;\n            text-align:right;\n            width: 100px;\n        }\n        thead {\n            background-color: #eee;\n        }\n    )\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ],
                                                            [
                                                                '24',
                                                                'properties_edit',
                                                                'Div(Class: content-wrapper){\n\tSetTitle("Edit properties")\n\tDiv(breadcrumb){\n\t\tDiv(){\n\t\t\tIf(#type# == page){\n\t\t\t\tLinkPage("Pages", app_pages)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit page", text-muted)\n\t\t\t\tDBFind(Name: pages, Source: src_page).WhereId(#edit_property_id#).Vars(item)\n\t\t\t\tDBFind(menu, src_menus)\n\t\t\t}\n\t\t\tIf(#type# == contract){\n\t\t\t\tLinkPage("Contracts", app_contracts)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit contract", text-muted)\n\t\t\t\tDBFind(Name: contracts, Source: src_contract).WhereId(#edit_property_id#).Vars(item)\n\t\t\t}\n            If(#type# == block){\n\t\t\t\tLinkPage("Blocks", app_blocks)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit block", text-muted)\n\t\t\t\tDBFind(Name: blocks, Source: src_block).WhereId(#edit_property_id#).Vars(item)\n\t\t\t}\n\t\t\tIf(#type# == menu){\n\t\t\t\tLinkPage("Menu", menus_list)\n\t\t\t\tSpan(/).Style(margin-right: 10px; margin-left: 10px;)\n\t\t\t\tSpan("Edit menu", text-muted)\n\t\t\t\tDBFind(Name: menu, Source: src_menu).WhereId(#edit_property_id#).Vars(item)\n\t\t\t}\n\t\t}\n\t}\n    Form(){\n\t\tDiv(form-group){\n\t\t\tLabel("Name")\n\t\t\tInput(Name: Name, Value: #item_name#, Disabled: "true")\n\t\t}\n\t\tIf(#type# == page){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Menu")\n\t\t\t\tSelect(Name: Menu, Source: src_menus, NameColumn: name, ValueColumn: name, Value: #item_menu#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: app_pages, Contract: EditPage, Params: "Menu=Val(Menu),Conditions=Val(Conditions),Id=#edit_property_id#")\n\t\t\t}\n\t\t}\n\t\tIf(#type# == contract){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Wallet")\n\t\t\t\tDiv(row){\n\t\t\t\t\tDiv(col-md-10){\n\t\t\t\t\t\tInput(Name: Wallet,Value: Address(#item_wallet_id#))\n\t\t\t\t\t}\n\t\t\t\t\tDiv(col-md-2){\n\t\t\t\t\t\tIf(#item_active# == 0){\n\t\t\t\t\t\t\tButton(Body: "Bind", Class: btn btn-primary btn-block, Contract: ActivateContract, Params: "Id=#edit_property_id#", Page:app_contracts)\n\t\t\t\t\t\t}.Else{\n\t\t\t\t\t\t\tButton(Body: "Unbind", Class: btn btn-primary btn-block, Contract: DeactivateContract, Params: "Id=#edit_property_id#", Page:properties_edit, PageParams: "edit_property_id=#edit_property_id#,type=#type#")\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: app_contracts, Contract: EditContract, Params: "Conditions=Val(Conditions),WalletId=Val(Wallet),Id=#edit_property_id#")\n\t\t\t}\n\t\t}\n\t\tIf(#type# == block){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: app_blocks, Contract: EditBlock, Params: "Conditions=Val(Conditions),Id=#edit_property_id#")\n\t\t\t}\n\t\t}\n\t\tIf(#type# == menu){\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Menu title")\n\t\t\t\tInput(Name: Title, Value: #item_title#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tLabel("Change conditions")\n\t\t\t\tInput(Name: Conditions, Value: #item_conditions#)\n\t\t\t}\n\t\t\tDiv(form-group){\n\t\t\t\tButton(Body: "Save", Class: btn btn-primary, Page: menus_list, Contract: EditMenu, Params: "Conditions=Val(Conditions),Id=#edit_property_id#,NameTitle=Val(Title)")\n\t\t\t}\n\t\t}\n    }\n}',
                                                                'admin_menu',
                                                                '1',
                                                                'ContractAccess("@1EditPage")',
                                                                '1',
                                                                '0'
                                                            ]
                                                        ],
                                                        name: 'pages',
                                                        source: 'src_records',
                                                        types: [
                                                            'text',
                                                            'text',
                                                            'text',
                                                            'text',
                                                            'text',
                                                            'text',
                                                            'text',
                                                            'text'
                                                        ],
                                                        where: 'app_id=1'
                                                    }
                                                },
                                                {
                                                    tag: 'range',
                                                    attr: {
                                                        columns: [
                                                            'id'
                                                        ],
                                                        data: [
                                                            [
                                                                '1'
                                                            ]
                                                        ],
                                                        source: 'src_pages'
                                                    }
                                                },
                                                {
                                                    tag: 'div',
                                                    attr: {
                                                        style: 'div {display:inline-block;}'
                                                    },
                                                    children: [
                                                        {
                                                            tag: 'span',
                                                            children: [
                                                                {
                                                                    tag: 'button',
                                                                    attr: {
                                                                        'class': 'btn btn-default disabled'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'em',
                                                                            attr: {
                                                                                'class': 'fa fa-angle-double-left'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            tag: 'span',
                                                            children: [
                                                                {
                                                                    tag: 'button',
                                                                    attr: {
                                                                        'class': 'btn btn-default disabled'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'em',
                                                                            attr: {
                                                                                'class': 'fa fa-angle-left'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            tag: 'forlist',
                                                            attr: {
                                                                source: 'src_pages'
                                                            },
                                                            children: [
                                                                {
                                                                    tag: 'span',
                                                                    children: [
                                                                        {
                                                                            tag: 'button',
                                                                            attr: {
                                                                                'class': 'btn btn-primary float-left',
                                                                                page: 'app_pages',
                                                                                pageparams: {
                                                                                    current_page: {
                                                                                        text: '1',
                                                                                        type: 'text'
                                                                                    },
                                                                                    sort: {
                                                                                        text: '1',
                                                                                        type: 'text'
                                                                                    },
                                                                                    width: {
                                                                                        text: '12',
                                                                                        type: 'text'
                                                                                    }
                                                                                }
                                                                            },
                                                                            children: [
                                                                                {
                                                                                    tag: 'text',
                                                                                    text: '1'
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            tag: 'span',
                                                            children: [
                                                                {
                                                                    tag: 'button',
                                                                    attr: {
                                                                        'class': 'btn btn-default disabled'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'em',
                                                                            attr: {
                                                                                'class': 'fa fa-angle-right'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            tag: 'span',
                                                            children: [
                                                                {
                                                                    tag: 'button',
                                                                    attr: {
                                                                        'class': 'btn btn-default disabled'
                                                                    },
                                                                    children: [
                                                                        {
                                                                            tag: 'em',
                                                                            attr: {
                                                                                'class': 'fa fa-angle-double-right'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            editor: {
                name: 'editor',
                title: 'Editor',
                visible: true,
                closeable: true,
                defaultPage: 'editor',
                pending: false,
                force: false,
                menus: [],
                menuDisabled: true,
                menuVisible: true,
                page: {
                    name: 'editor',
                    content: [],
                    legacy: true,
                    params: {}
                }
            }
        },
        notifications: [
            {
                tag: 'dbfind',
                attr: {
                    columns: [
                        'id',
                        'page_name',
                        'notification.icon',
                        'notification.header',
                        'notification.body'
                    ],
                    data: [],
                    name: 'notifications',
                    source: 'notifications_members',
                    types: [],
                    where: 'closed=0 and notification->type=\'1\' and recipient->member_id=\'4158839290248807330\''
                }
            },
            {
                tag: 'forlist',
                attr: {
                    source: 'notifications_members'
                }
            },
            {
                tag: 'dbfind',
                attr: {
                    columns: [
                        'id',
                        'page_name',
                        'notification.icon',
                        'notification.header',
                        'notification.body',
                        'recipient.role_id'
                    ],
                    data: [],
                    name: 'notifications',
                    source: 'notifications_roles',
                    types: [],
                    where: 'closed=0 and notification->type=\'2\' and (date_start_processing is null or processing_info->member_id=\'4158839290248807330\')'
                }
            },
            {
                tag: 'forlist',
                attr: {
                    source: 'notifications_roles'
                }
            }
        ]
    },
    modal: {
        id: null,
        type: null,
        result: null,
        params: null
    },
    engine: {
        nodeHost: 'http://127.0.0.1:7079',
        localeMessages: {
            LANG_NAME: 'English(USA)',
            'account.create': 'Create account',
            'account.createimport': 'Create or import account',
            'account.import': 'Import account',
            'account.login': 'Login',
            'alert.cancel': 'Cancel',
            'alert.clipboard.copied': 'Copied to clipboard',
            'alert.close': 'Close',
            'alert.confirmation': 'Confirmation',
            'alert.error': 'Error',
            'alert.info': 'Information',
            'alert.panic': 'Runtime error',
            'alert.warning': 'Warning',
            'admin.conditions.change': 'Change conditions',
            'admin.contracts': 'Smart contracts',
            'admin.contracts.bind': 'Bind',
            'admin.contracts.bound': 'Bound',
            'admin.contracts.create': 'Create contract',
            'admin.contracts.description': 'This section is used to create or modify Smart-Contracts. They are used to create or modify data stored in database tables. Access rights for all operations are also managed by Smart-Contracts',
            'admin.contracts.edit': 'Edit',
            'admin.contracts.history': 'History',
            'admin.contracts.name': 'Name',
            'admin.contracts.short': 'Contracts',
            'admin.contracts.unbind': 'Unbind',
            'admin.contracts.wallet': 'Wallet',
            'admin.create': 'Create',
            'admin.edit': 'Edit',
            'admin.export': 'Export',
            'admin.export.compress': 'Compress data',
            'admin.export.compress.desc': 'By selecting this option you will reduce size of the file, but it will make backup unreadable for most users if they will try to open it in a text editor',
            'admin.export.confirm': 'Confirm export',
            'admin.export.description': 'Select every element which do you want to export and proceed to the payload generation process. Make sure that you select all of the dependencies that your application requires to function properly',
            'admin.export.key': 'Key',
            'admin.export.name': 'Name',
            'admin.export.selected': 'Selected items',
            'admin.export.selection.empty': 'Nothing selected',
            'admin.history': 'History',
            'admin.history.description': 'This section is used to view changes that vere made to the specific entry of your table',
            'admin.history.indexof': 'Showing value {index} of {count}',
            'admin.import': 'Import',
            'admin.import.confirm': 'Import',
            'admin.import.description': 'Select payload that you want to import. Import editor tool will be shown to allow you to view, edit and reorder provided data before doing actual import',
            'admin.import.key': 'Key',
            'admin.import.save': 'Save changes',
            'admin.interface': 'Interface',
            'admin.interface.block.create': 'Create block',
            'admin.interface.blocks': 'Blocks',
            'admin.interface.contracts.create': 'Create',
            'admin.interface.history': 'History',
            'admin.interface.menu': 'Menu',
            'admin.interface.menu.create': 'Create menu',
            'admin.interface.menu.history': 'View history',
            'admin.interface.nothingfound': 'Nothing found',
            'admin.interface.page.create': 'Create page',
            'admin.interface.page.history': 'View history',
            'admin.interface.page.name': 'Name',
            'admin.interface.pages': 'Pages',
            'admin.languages': 'Language resources',
            'admin.languages.create': 'Create localization',
            'admin.languages.description': 'This section is used to configure stored reusable parameters. They are used to control basic ecosystem behavior, but you can create your own ones and use them in the template engine or smart-contracts',
            'admin.languages.locale': 'Locale',
            'admin.languages.name': 'Name',
            'admin.languages.resources': 'Resources',
            'admin.languages.short': 'Languages',
            'admin.parameters': 'Ecosystem parameters',
            'admin.parameters.create': 'Create',
            'admin.parameters.empty': 'Empty parameter',
            'admin.parameters.name': 'Name',
            'admin.parameters.short': 'Parameters',
            'admin.parameters.stylesheet': 'Manage stylesheet',
            'admin.parameters.value': 'Value',
            'admin.restore': 'Restore',
            'admin.save': 'Save',
            'admin.tables': 'Tables',
            'admin.tables.changes': 'Changes',
            'admin.tables.column': 'Column',
            'admin.tables.column.action': 'Action',
            'admin.tables.column.add': 'Add column',
            'admin.tables.column.edit': 'Edit',
            'admin.tables.column.permissions': 'Permissions',
            'admin.tables.column.type': 'Type',
            'admin.tables.column.type.unknown': 'Unknown',
            'admin.tables.count': 'Count',
            'admin.tables.create': 'Create',
            'admin.tables.data': 'Data',
            'admin.tables.edit': 'Edit',
            'admin.tables.history': 'History',
            'admin.tables.history.empty': 'This element has no history',
            'admin.tables.name': 'Name',
            'admin.tables.permissions.conditions': 'Conditions for changing permissions',
            'admin.tables.permissions.filter': 'Filter',
            'admin.tables.permissions.insert': 'Insert',
            'admin.tables.permissions.newcolumn': 'New column',
            'admin.tables.permissions.read': 'Read',
            'admin.tables.permissions.update': 'Update',
            'admin.tables.permissions.write': 'Write permissions',
            'admin.tables.save': 'Save',
            'admin.tables.show': 'Show',
            'admin.tables.structure': 'Structure',
            'admin.vde': 'Virtual Dedicated Ecosystem',
            'admin.vde.create': 'Create',
            'admin.vde.description': 'You can create a Virtual Dedicated Ecosystem (VDE) to work with contracts/interfaces that will not be served through the blockchain. VDE can only be created once per normal ecosystem and cannot be deleted',
            'auth.account': 'Account',
            'auth.account.actions': 'Account actions',
            'auth.account.import': 'Import',
            'auth.accounts': 'Accounts',
            'auth.authentication': 'Authentication',
            'auth.create.success': 'Account has been successfully created',
            'auth.error.E_INVALID_KEY': 'Provided key is corrupted or contains invalid data',
            'auth.error.E_INVALID_PASSWORD': 'Invalid password',
            'auth.error.E_DELETEDKEY': 'Account was removed from the ecosystem',
            'auth.error.E_OFFLINE': 'Could not connect to the service',
            'auth.backup.invalid': 'Provided key is corrupted or contains invalid data',
            'auth.generate.new': 'Generate new key',
            'auth.getstarted': 'Get started',
            'auth.havekey': 'I have a key',
            'auth.havekey.desc': 'If you are already familiar with Genesis and have a backup of your private key - choose this option to guide you through the process of restoring of your account data',
            'auth.key.removed': 'Account has been removed',
            'auth.import': 'Import',
            'auth.import.disclaimer': 'Please enter your account backup payload to restore access to the system',
            'auth.import.existing': 'Import existing key',
            'auth.login': 'Login',
            'auth.nokey': 'I don\'t have a key',
            'auth.nokey.desc': 'If you are new to the system or just want to create a new account - proceed with this option to generate new private key and protect it with your password',
            'auth.password': 'Password',
            'auth.qrcode': 'QR-Code',
            'auth.qrcode.desc': 'Use this code to import the account on your mobile device',
            'auth.remove.desc': 'Do you really want to delete this account? THIS ACTION IS IRREVERSIBLE',
            'auth.remember.disclaimer': 'Please make sure that you keep your passphrase (account seed) safe and remember the password. You will be asked to re-type them for confirmation',
            'auth.remember.disclaimer.confirm': 'Please repeat your registration values. This step is required to ensure that your passphrase and password are stored correctly',
            'auth.role.disclaimer': 'Select role that you want to use to login. Data representation will change according to your selected role. You can switch it at any time',
            'auth.role.empty': 'Login without role',
            'auth.role.select': 'Role selection',
            'auth.seed': 'Account seed',
            'auth.seed.generate': 'Generate',
            'auth.seed.load': 'Load',
            'auth.seed.repeat': 'Repeat seed',
            'auth.seed.save': 'Save',
            'auth.session.expired': 'Your session has expired. Please enter your password to sign in',
            'auth.welcome': 'Welcome',
            'auth.welcome.continue': 'Press \'Get started\' button to begin the process of creating or restoring your account',
            'auth.welcome.guide': 'Before proceeding, you will now be guided through the account creation process. This will not take too much of your time. After completing this process you will be able to use all features of Genesis',
            cancel: 'Cancel',
            clear: 'Clear',
            close: 'Close',
            confirm: 'Confirm',
            contract: 'Smart contract',
            'contract.exec': 'Execute contract',
            'editor.block.create': 'Create block',
            'editor.close.confirm': 'Do you really want to close \'{name}\' without saving changes?',
            'editor.create': 'Create',
            'editor.execute': 'Execute',
            'editor.menu.create': 'Create menu',
            'editor.page.create': 'Create page',
            'editor.param.add': 'Add parameter',
            'editor.revert': 'Revert',
            'editor.revert.confirm': 'Do you really want to discard all changes?',
            'editor.save': 'Save',
            'editor.tool.developer': 'Developer',
            'editor.tool.preview': 'Preview',
            'editor.untitled': 'Untitled-{id}',
            exec: 'Exec',
            'general.about': 'About',
            'general.account.backup': 'Backup account',
            'general.account.changepassword': 'Change password',
            'general.account.ecosystemNo': 'Ecosystem #{ecosystem}',
            'general.account.signout': 'Sign out',
            'general.address': 'Address',
            'general.back': 'Back',
            'general.backup.create': 'Create backup',
            'general.clipboard.copy': 'Copy to clipboard',
            'general.developer.tools': 'Developer tools',
            'general.download.asfile': 'Download as file',
            'general.ecosystems': 'Ecosystems',
            'general.error': 'Error',
            'general.error.notfound': 'The page you are looking for does not exists',
            'general.error.page': 'The page you are looking for could not be processed',
            'general.error.timeout': 'The page you are looking for is too heavy to be processed. Consider reducing number of database queries',
            'general.error.socket': 'Notifications are unavailable',
            'general.error.socket.desc': 'Failed to establish connection to the WebSocket server. Check your configuration',
            'general.home': 'Home',
            'general.key.private': 'Private key',
            'general.key.public': 'Public key',
            'general.notfound.page': 'We couldn\'t find this page',
            'general.notfound.page.notexists': 'The page you are looking for does not exists',
            'general.password': 'Password',
            'general.password.repeat': 'Repeat password',
            'general.service.connecting': 'Connecting...',
            'general.service.connecting.retry.in': 'Retrying in {seconds} sec',
            'general.service.offline': 'Service offline',
            'general.service.retry': 'Retry now',
            'general.title': 'Genesis',
            'general.title.format': '{title} | Genesis',
            'history.newer': 'Newer',
            'history.older': 'Older',
            'install.centrifugo.host': 'Host',
            'install.centrifugo.secret': 'Secret key',
            'install.centrifugo_settings': 'Centrifugo settings',
            'install.confirm': 'Install',
            'install.database.host': 'Host',
            'install.database.name': 'DB name',
            'install.database.pass': 'Password',
            'install.database.port': 'Port',
            'install.database.user': 'Username',
            'install.database_settings': 'Database settings',
            'install.first_block_dir': 'First block dir',
            'install.instructions': 'Instructions',
            'install.log.level': 'Log level',
            'install.mode': 'Mode',
            'interface': 'Interface',
            'interface.block': 'Block',
            'interface.menu': 'Menu',
            'interface.page': 'Page',
            'map.area': 'Area: {value}',
            'map.editor': 'Map editor',
            'map.meter.short': 'm',
            'modal.authorization.title': 'Authorization',
            'modal.authorization.password': 'Enter your password to sign contract {contract}',
            'modal.confirm.title': 'Confirmation',
            'modal.imageeditor.cancel': 'Cancel',
            'modal.imageeditor.confirm': 'Confirm',
            'modal.imageeditor.desc': 'Prepare your image for uploading by selecting which part of the image you want to use',
            'modal.imageeditor.title': 'Image editor',
            'navigation.back': 'Back',
            'navigation.forward': 'Forward',
            'navigation.home': 'Home',
            'navigation.refresh': 'Refresh',
            notifications: 'Notifications',
            pending: 'Pending',
            'process.confirm': 'Confirm',
            'process.continue': 'Continue',
            undo: 'Undo',
            'tx.param.value': 'Value',
            'tx.error.error': 'Error',
            'tx.error.error.desc': '{error}',
            'tx.error.info': 'Information',
            'tx.error.info.desc': '{error}',
            'tx.error.panic': 'Runtime error',
            'tx.error.panic.desc': '{error}',
            'tx.error.warning': 'Warning',
            'tx.error.warning.desc': '{error}',
            'tx.error.E_CONTRACT': 'Execution failed',
            'tx.error.E_DELETEDKEY': 'Execution failed',
            'tx.error.E_INVALIDATED': 'Security alert',
            'tx.error.E_INVALID_PASSWORD': 'Execution failed',
            'tx.error.E_OFFLINE': 'Service offline',
            'tx.error.E_SERVER': 'Runtime error',
            'tx.error.E_CONTRACT.desc': 'Contract \'{contract}\' does not exists',
            'tx.error.E_DELETEDKEY.desc': 'Your account has been removed',
            'tx.error.E_INVALIDATED.desc': 'Transaction header could not be validated',
            'tx.error.E_INVALID_PASSWORD.desc': 'Invalid password',
            'tx.error.E_OFFLINE.desc': 'Failed to connect to the server',
            'tx.error.E_SERVER.desc': '{error}',
            'validation.field.invalid': 'This field contains invalid data',
            'validation.required': 'This field is mandatory',
            'validation.minlength': 'Value is too short',
            'validation.maxlength': 'Value is too long',
            'validation.compare': 'Value doesn\'t match',
            'validation.regex': 'This field contains invalid data',
            'validation.email': 'Value must be a valid e-mail',
            'validation.url': 'Value must be a valid URL'
        },
        isCollapsed: true,
        isLoaded: true,
        isOffline: false,
        isConnecting: false
    },
    editor: {
        pending: false,
        tabIndex: 0,
        tabs: [
            {
                type: 'page',
                id: '1',
                'new': false,
                name: 'default_page',
                tool: 'constructor',
                value: 'Div() {\n P(Class: text-success, Body:\n  Paragraph\n )\n Image(Src: /img/dummy.png, Alt: Image)\n}',
                initialValue: '',
                dirty: true,
                preview: null,
                designer: {
                    data: {
                        jsonData: [
                            {
                                tag: 'div',
                                children: [
                                    {
                                        tag: 'p',
                                        attr: {
                                            'class': 'text-success'
                                        },
                                        children: [
                                            {
                                                tag: 'text',
                                                text: 'Paragraph',
                                                id: 'tag_76541599'
                                            }
                                        ],
                                        id: 'tag_33951839',
                                        childrenText: 'Paragraph'
                                    },
                                    {
                                        tag: 'image',
                                        attr: {
                                            alt: 'Image',
                                            src: '/img/dummy.png'
                                        },
                                        id: 'tag_27766220'
                                    }
                                ],
                                id: 'tag_29845938',
                                childrenText: null
                            }
                        ],
                        treeData: [
                            {
                                title: 'div',
                                children: [
                                    {
                                        title: 'p: Paragraph',
                                        children: null,
                                        expanded: true,
                                        id: 'tag_33951839',
                                        selected: false,
                                        logic: false,
                                        canMove: true,
                                        canDrop: true,
                                        tag: {
                                            tag: 'p',
                                            attr: {
                                                'class': 'text-success'
                                            },
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Paragraph',
                                                    id: 'tag_76541599'
                                                }
                                            ],
                                            id: 'tag_33951839',
                                            childrenText: 'Paragraph'
                                        }
                                    },
                                    {
                                        title: 'image',
                                        children: null,
                                        expanded: true,
                                        id: 'tag_27766220',
                                        selected: false,
                                        logic: false,
                                        canMove: true,
                                        canDrop: false,
                                        tag: {
                                            tag: 'image',
                                            attr: {
                                                alt: 'Image',
                                                src: '/img/dummy.png'
                                            },
                                            id: 'tag_27766220'
                                        }
                                    }
                                ],
                                expanded: true,
                                id: 'tag_29845938',
                                selected: false,
                                logic: false,
                                canMove: true,
                                canDrop: true,
                                tag: {
                                    tag: 'div',
                                    children: [
                                        {
                                            tag: 'p',
                                            attr: {
                                                'class': 'text-success'
                                            },
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Paragraph',
                                                    id: 'tag_76541599'
                                                }
                                            ],
                                            id: 'tag_33951839',
                                            childrenText: 'Paragraph'
                                        },
                                        {
                                            tag: 'image',
                                            attr: {
                                                alt: 'Image',
                                                src: '/img/dummy.png'
                                            },
                                            id: 'tag_27766220'
                                        }
                                    ],
                                    id: 'tag_29845938',
                                    childrenText: null
                                }
                            }
                        ],
                        selectedTag: null,
                        pageTemplate: 'Div() {\n P(Class: text-success, Body:\n  Paragraph\n )\n Image(Src: /img/dummy.png, Alt: Image)\n}'
                    },
                    history: {
                        data: [
                            [
                                {
                                    tag: 'div',
                                    id: 'tag_17865920',
                                    children: [],
                                    childrenText: ''
                                }
                            ],
                            [
                                {
                                    tag: 'div',
                                    id: 'tag_17865920',
                                    children: [
                                        {
                                            tag: 'p',
                                            id: 'tag_23966931',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Paragraph',
                                                    id: 'tag_10640100'
                                                }
                                            ],
                                            childrenText: 'Paragraph'
                                        }
                                    ],
                                    childrenText: '<p>Paragraph</p>',
                                    sysAttr: {
                                        canDropPosition: 'inside'
                                    }
                                }
                            ],
                            [
                                {
                                    tag: 'div',
                                    id: 'tag_17865920',
                                    children: [
                                        {
                                            tag: 'p',
                                            id: 'tag_23966931',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Paragraph',
                                                    id: 'tag_10640100'
                                                }
                                            ],
                                            childrenText: 'Paragraph',
                                            sysAttr: {
                                                canDropPosition: 'after'
                                            }
                                        },
                                        {
                                            tag: 'image',
                                            id: 'tag_27024137',
                                            attr: {
                                                alt: 'Image',
                                                src: '/img/dummy.png'
                                            }
                                        }
                                    ],
                                    childrenText: null,
                                    sysAttr: {
                                        canDropPosition: 'after'
                                    }
                                }
                            ],
                            [
                                {
                                    tag: 'div',
                                    id: 'tag_17865920',
                                    children: [
                                        {
                                            tag: 'p',
                                            id: 'tag_23966931',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Paragraph',
                                                    id: 'tag_10640100'
                                                }
                                            ],
                                            childrenText: 'Paragraph',
                                            sysAttr: {
                                                canDropPosition: 'after'
                                            },
                                            attr: {
                                                'class': 'text-success'
                                            }
                                        },
                                        {
                                            tag: 'image',
                                            id: 'tag_27024137',
                                            attr: {
                                                alt: 'Image',
                                                src: '/img/dummy.png'
                                            }
                                        }
                                    ],
                                    childrenText: null,
                                    sysAttr: {
                                        canDropPosition: 'after'
                                    }
                                }
                            ],
                            [
                                {
                                    tag: 'div',
                                    children: [
                                        {
                                            tag: 'p',
                                            attr: {
                                                'class': 'text-success'
                                            },
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Paragraph',
                                                    id: 'tag_76541599'
                                                }
                                            ],
                                            id: 'tag_33951839',
                                            childrenText: 'Paragraph'
                                        },
                                        {
                                            tag: 'image',
                                            attr: {
                                                alt: 'Image',
                                                src: '/img/dummy.png'
                                            },
                                            id: 'tag_27766220'
                                        }
                                    ],
                                    id: 'tag_29845938',
                                    childrenText: null
                                }
                            ]
                        ],
                        position: 5,
                        canUndo: true,
                        canRedo: false
                    }
                }
            }
        ]
    },
    tx: {
        transactions: null
    },
    gui: {
        window: 'main'
    },
    io: {},
    storage: {
        locale: 'en-US',
        accounts: [],
        navigationSize: 230,
        fullNodes: [
            'http://127.0.0.1:7079'
        ]
    },
    socket: {
        session: null,
        socket: null,
        connected: false,
        notifications: [],
        subscriptions: []
    },
    loadingBar: 0,
    router: {
        location: {
            pathname: '/editor',
            search: '',
            hash: '',
            key: '6r7g5h',
            state: ''
        }
    }
};

const dispatch: Dispatch<any> = (action: Action) => null;

const MockStore = {
    getState: () => state,
    dispatch
};

export default MockStore;