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

declare module 'genesis/protypo' {
    import { TBreadcrumbType } from 'genesis/content';

    type TProtypoElement = {
        readonly tag: string;
        readonly id?: string;
        readonly text?: string;
        readonly attr?: { [key: string]: any };
        readonly sysAttr?: { [key: string]: string };
        readonly children?: TProtypoElement[] | null;
        readonly childrenText?: string | null;
        readonly tail?: TProtypoElement[] | null;
    };

    interface ISource {
        readonly columns: string[];
        readonly types: string[];
        readonly data: string[][];
    }

    type TChartType = 'bar' | 'line' | 'pie';

    interface IButtonConfirm {
        type?: string;
        title?: string;
        text?: string;
        confirmButton?: string;
        cancelButton?: string;
    }

    interface IButtonPopup {
        title?: string;
        width?: number;
    }

    interface IButtonPage {
        name: string;
        section: string;
        params: {
            [key: string]: any;
        };
    }

    interface IErrorRedirect {
        pagename: string;
        pageparams?: {
            [key: string]: any;
        };
    }

    interface IButtonInteraction {
        uuid: string;
        silent?: boolean;
        from?: {
            name: string;
            type: TBreadcrumbType;
        };
        confirm?: IButtonConfirm;
        contracts: {
            name: string;
            params: {
                [key: string]: any
            }[]
        }[];
        page?: IButtonPage;
        popup?: IButtonPopup;
        errorRedirects?: {
            [key: string]: IErrorRedirect
        }
    }
}