/// <reference path="../../typings/main.d.ts"/>
'use strict';
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
class FileRenderer {
    constructor(root) {
        this.root = root;
    }
    readFile(absPath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(absPath, 'utf-8', function (err, content) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    render(file, params) {
        return __awaiter(this, void 0, void 0, function* () {
            var absPath = path.join(this.root, file);
            var content = yield this.readFile(absPath);
            return content;
        });
    }
}
exports.FileRenderer = FileRenderer;
//# sourceMappingURL=file.js.map