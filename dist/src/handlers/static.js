/// <reference path="../../typings/main.d.ts"/>
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var fs = require('fs');
var path = require('path');
(function (PathType) {
    PathType[PathType["OutOfRange"] = 0] = "OutOfRange";
    PathType[PathType["NotExist"] = 1] = "NotExist";
    PathType[PathType["InvalidCharacter"] = 2] = "InvalidCharacter";
    PathType[PathType["Valid"] = 3] = "Valid";
})(exports.PathType || (exports.PathType = {}));
var PathType = exports.PathType;
class StaticFileHandler {
    constructor(root) {
        this.root = path.resolve(root);
    }
    handle(request, response) {
        return __awaiter(this, void 0, Promise, function* () {
            let filePath = this.extractFilePath(request.url);
            if (filePath === '') {
                response.status = 404;
                response.setHeader('Content-Type', 'text/html');
                return response.send('');
            }
            let type = this.validatePath(filePath);
            if (type === PathType.OutOfRange || type === PathType.InvalidCharacter) {
                response.status = 403;
                response.setHeader('Content-Type', 'text/html');
                return response.send('');
            }
            let content = yield this.readFile(filePath);
            response.status = 200;
            return response.send(content);
        });
    }
    extractFilePath(url) {
        try {
            let decodeUrl = decodeURIComponent(url);
            return path.normalize(path.join(this.root, decodeUrl));
        }
        catch (e) {
            return '';
        }
    }
    validatePath(filePath) {
        // Null bytes is not allowed
        if (filePath.indexOf('\0') !== -1) {
            return PathType.InvalidCharacter;
        }
        if (filePath.indexOf(this.root) !== 0) {
            return PathType.OutOfRange;
        }
        return PathType.Valid;
    }
    readFile(absPath) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise(function (resolve, reject) {
                fs.exists(absPath, function (exists) {
                    if (exists) {
                        let options = {
                            encoding: 'utf-8'
                        };
                        fs.readFile(absPath, options, function (err, data) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    }
                    else {
                        reject(new Error('file does not exist'));
                    }
                });
            });
        });
    }
}
exports.StaticFileHandler = StaticFileHandler;
//# sourceMappingURL=static.js.map