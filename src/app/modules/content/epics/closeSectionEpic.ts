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

import { Epic } from 'modules';
import { closeSection, renderSection } from 'modules/content/actions';
import { Observable } from 'rxjs/Observable';

const closeSectionEpic: Epic = (action$, store) => action$.ofAction(closeSection)
    .flatMap(action => {
        const state = store.getState();
        if (action.payload === state.content.section) {
            return Observable.of(renderSection('home'));
        }
        else {
            return Observable.empty<never>();
        }
    });

export default closeSectionEpic;