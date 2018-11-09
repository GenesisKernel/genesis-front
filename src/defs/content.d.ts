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

declare module 'genesis/content' {
    import { TProtypoElement } from 'genesis/protypo';
    import { Location } from 'history';

    interface IMenu {
        readonly name: string;
        readonly content: TProtypoElement[];
    }

    type TBreadcrumbType =
        'MENU' | 'PAGE';

    type TPageParams = {
        [key: string]: string;
    }

    interface IBreadcrumb {
        readonly caller: string;
        readonly type: TBreadcrumbType;
        readonly section: string;
        readonly page: string;
        readonly params: TPageParams;
    }

    type TPageStatus =
        'PENDING' | 'LOADED' | 'ERROR';

    interface IPage {
        readonly name: string;
        readonly status: TPageStatus;
        readonly legacy?: boolean;
        readonly content: TProtypoElement[];
        readonly params: TPageParams;
        readonly error?: string;
        readonly location: Location;
    }

    interface ISection {
        readonly key: string;
        readonly visible: boolean;
        readonly menuDisabled?: boolean;
        readonly menuVisible: boolean;
        readonly pending: boolean;
        readonly name: string;
        readonly title: string;
        readonly force: boolean;
        readonly defaultPage: string;
        readonly breadcrumbs: IBreadcrumb[];
        readonly menus: IMenu[];
        readonly pages: IPage[];
    }
}