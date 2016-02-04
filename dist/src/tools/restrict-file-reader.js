/// <reference path="../../typings/main.d.ts"/>
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require('fs');
const path = require('path');
(function (PathState) {
    PathState[PathState["NORMAL"] = 0] = "NORMAL";
    PathState[PathState["PATH_REQUIRED"] = 1] = "PATH_REQUIRED";
    PathState[PathState["NOT_EXIST"] = 2] = "NOT_EXIST";
    PathState[PathState["OUT_OF_DIR"] = 3] = "OUT_OF_DIR";
    PathState[PathState["ILLEGAL_CHARACTER"] = 4] = "ILLEGAL_CHARACTER";
})(exports.PathState || (exports.PathState = {}));
var PathState = exports.PathState;
class RestrictFileReader {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }
    readFile(filePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let absPath = path.join(this.rootDir, filePath);
            let state = yield this.checkPath(absPath);
            return new Promise((resolve, reject) => {
                if (state === PathState.NORMAL) {
                    fs.readFile(absPath, options, function (err, content) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(content);
                        }
                    });
                }
                else {
                    reject(new Error(PathState[state]));
                }
            });
        });
    }
    checkPath(absPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                if (absPath === '') {
                    reject(new Error(PathState[PathState.PATH_REQUIRED]));
                }
                fs.exists(absPath, (exists) => {
                    if (exists) {
                        resolve(PathState.NORMAL);
                    }
                    else {
                        reject(new Error(PathState[PathState.NOT_EXIST]));
                    }
                });
            });
        });
    }
}
exports.RestrictFileReader = RestrictFileReader;
//# sourceMappingURL=restrict-file-reader.js.map