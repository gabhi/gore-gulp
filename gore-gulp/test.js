/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var path = require("path"),
    defaults = require(path.join(__dirname, "/defaults")),
    mocha = require("gulp-mocha"),
    Promise = require("bluebird");

module.exports = function (baseDir, pckgPromise, gulp) {
    return function () {
        return pckgPromise.then(function (pckg) {
                return path.resolve(baseDir, pckg.directories.lib, "**", "*.test" + defaults.ecmaScriptFileExtensionsGlobPattern);
            })
            .then(function (globPattern) {
                return new Promise(function (resolve, reject) {
                    gulp.src(globPattern)
                        .pipe(mocha({
                            "bail": true,
                            "reporter": "dot"
                        }))
                        .on("error", reject)
                        .on("end", resolve);
                });
            });
    };
};
