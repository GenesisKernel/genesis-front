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

import ValidatedCheckbox from './ValidatedCheckbox';
import ValidatedControl from './ValidatedControl';
import ValidatedFile from './ValidatedFile';
import ValidatedImage from 'containers/Validation/ValidatedImage';
import ValidatedMap from 'containers/Validation/ValidatedMap';
import ValidatedSelect from './ValidatedSelect';
import ValidationMessage from './ValidationMessage';
import ValidatedTextarea from './ValidatedTextarea';
import ValidatedForm from './ValidatedForm';
import ValidatedFormGroup from './ValidatedFormGroup';
import ValidatedRadioGroup from './ValidatedRadioGroup';
import ValidatedSubmit from './ValidatedSubmit';
import * as validators from './Validators';

export default {
    components: {
        ValidatedCheckbox,
        ValidatedControl,
        ValidatedFile,
        ValidatedImage,
        ValidatedMap,
        ValidatedSelect,
        ValidatedTextarea,
        ValidatedForm,
        ValidatedFormGroup,
        ValidatedRadioGroup,
        ValidatedSubmit,
        ValidationMessage
    },
    validators
};