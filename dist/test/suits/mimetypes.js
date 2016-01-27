/// <reference path="../../typings/main.d.ts"/>
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const test_1 = require('../test');
const mimetypes = require('../../src/mimetypes');
test_1.test('mimetypes', function (testCase) {
    return __awaiter(this, void 0, Promise, function* () {
        yield testCase.equal(mimetypes.extToType['pdf'], 'application/pdf');
        yield testCase.equal(mimetypes.typeToExt['application/pdf'], 'pdf');
    });
}).catch(function (err) {
    console.log(err.actual);
    console.log(err.expect);
    console.log(err.stack);
});
//# sourceMappingURL=mimetypes.js.map