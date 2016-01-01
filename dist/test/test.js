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
class NotEqualError extends Error {
    constructor(actual, expect) {
        super(`${actual} is not equal to ${expect}`);
        this.actual = actual;
        this.expect = expect;
    }
}
class NotRejectError extends Error {
    constructor(actual, expect) {
        super(`should reject with ${expect} instead of resolve to ${actual}`);
        this.actual = actual;
        this.expect = expect;
    }
}
class NotResolveError extends Error {
    constructor(actual, expect) {
        super(`should resolve to ${actual} instead of reject with ${expect}`);
        this.actual = actual;
        this.expect = expect;
    }
}
class TestCase {
    constructor(desc, timeout) {
        this.desc = desc;
        this.timeout = timeout;
    }
    equal(actual, expect) {
        return __awaiter(this, void 0, Promise, function* () {
            if (actual != expect) {
                throw new NotEqualError(actual, expect);
            }
        });
    }
    resolve(promise, expect) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                let actual = yield promise;
                if (actual != expect) {
                    throw new NotEqualError(actual, expect);
                }
            }
            catch (err) {
                if (err instanceof NotEqualError) {
                    throw err;
                }
                else {
                    throw new NotResolveError(err, expect);
                }
            }
        });
    }
    reject(promise, expect) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                let actual = yield promise;
                throw new NotRejectError(actual, expect);
            }
            catch (err) {
                if (err instanceof NotRejectError) {
                    throw err;
                }
                else {
                    if (err != expect) {
                        throw new NotEqualError(err, expect);
                    }
                }
            }
        });
    }
}
exports.TestCase = TestCase;
function test(desc, run) {
    return __awaiter(this, void 0, Promise, function* () {
        let testCase = new TestCase(desc);
        yield run(testCase);
    });
}
exports.test = test;
//# sourceMappingURL=test.js.map