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

var fs = require('fs');
var glob = require('glob');
var parser = require('typescript-react-intl').default;

function runner(pattern, cb) {
    var results = [];
    pattern = pattern || 'src/**/*.@(tsx|ts)';
    glob(pattern, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(f => {
            var contents = fs.readFileSync(f).toString();
            var res = parser(contents);
            results = results.concat(res);
        });

        cb && cb(results);
    });
}

runner(null, function (res) {

    var locale = {};

    res.forEach(r => {
        locale[r.id] = r.defaultMessage;
    });


    var locales = {
        en: locale,
    };

    fs.writeFileSync('locales.ts', `export default ${JSON.stringify(locales, null, 2)}\r`);
});
