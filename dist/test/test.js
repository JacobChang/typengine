/// <reference path="../typings/main.d.ts"/>
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
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