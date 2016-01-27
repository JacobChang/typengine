/// <reference path="../../../typings/main.d.ts"/>
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const test_1 = require('../../test');
const static_1 = require('../../../src/handlers/static');
test_1.test('StaticFileHandler', function (testCase) {
    return __awaiter(this, void 0, Promise, function* () {
        var handler = new static_1.StaticFileHandler('../');
    });
}).catch(function (err) {
    console.log(err);
    console.log(err.actual);
    console.log(err.expect);
});
//# sourceMappingURL=static.js.map