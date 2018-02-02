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

declare module 'genesis/content' {
    import { TProtypoElement } from 'genesis/protypo';

    type TMenu = {
        readonly name: string;
        readonly vde?: boolean;
        readonly content: TProtypoElement[];
    };

    type TPage = {
        readonly name: string;
        readonly vde?: boolean;
        readonly legacy?: boolean;
        readonly content: TProtypoElement[];
        readonly params: { [key: string]: any };
        readonly error?: string;
    };

    type TSection = {
        readonly pending: boolean;
        readonly name: string;
        readonly title: string;
        readonly force: boolean;
        readonly defaultPage: string;
        readonly menus: TMenu[];
        readonly page: TPage;
        readonly vde: boolean;
    }
}