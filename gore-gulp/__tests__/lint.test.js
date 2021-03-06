/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

/*global describe: false, it: false */

var path = require("path"),
    gg = require(path.join(__dirname, "..", "index")),
    Gulp = require("gulp").Gulp;

describe("lint", function () {
    it("detects code flaws", function (done) {
        var testGulp = new Gulp();

        testGulp.isSilent = true;

        gg(path.join(__dirname, "..", "__fixtures__", "test-library-8"))
            .lint(testGulp)()
            .then(function () {
                done(new Error("Linter should detect errors!"));
            })
            .catch(function (err) {
                if ("ESLintError" === err.name) {
                    done();
                } else {
                    done(err);
                }
            });
    });
});
