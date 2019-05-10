// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import * as yup from 'yup';

const webConfig = yup.object().shape({
    networks: yup.array().of(yup.object({
        key: yup.string().required(),
        name: yup.string().required(),
        networkID: yup.number().required(),
        fullNodes: yup.array().of(yup.string()).required().min(1),
        socketUrl: yup.string().notRequired(),
        activationEmail: yup.string().email().notRequired(),
        enableDemoMode: yup.bool()

    })).test('ValidationError', params => `${params.path}[x].key must be unique`, function (value: any[]) {
        const unique = value.filter((element, index, self) => {
            return self.findIndex(subElement => subElement.key === element.key) === index;
        });
        return unique.length === value.length;
    })
});

export default webConfig;