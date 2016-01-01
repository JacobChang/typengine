/// <reference path="../typings/main.d.ts"/>
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
var test_1 = require('./test');
var mimetypes = require('../src/mimetypes');
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