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
const middleware_1 = require('../../src/middleware');
class MockMiddleware extends middleware_1.BaseMiddleware {
    constructor(results) {
        super();
        this.results = results;
        this.count = 0;
    }
    before(request, response) {
        this.count += 1;
        return this.results[0];
    }
    serve(request, response) {
        this.count += 1;
        return this.results[1];
    }
    after(request, response) {
        this.count += 1;
        return this.results[2];
    }
}
test_1.test('middleware', function (testCase) {
    return __awaiter(this, void 0, Promise, function* () {
        let middleware = new MockMiddleware([
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ]);
        let driver = new middleware_1.MiddlewareDriver();
        driver.use(middleware);
        yield driver.serve(null, null);
        yield testCase.equal(middleware.count, 3);
        middleware.results = [
            Promise.resolve(middleware_1.MiddlewareResult.Abort),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ];
        yield driver.serve(null, null);
        yield testCase.equal(middleware.count, 4);
        middleware.results = [
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Abort),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ];
        yield driver.serve(null, null);
        yield testCase.equal(middleware.count, 6);
        middleware.results = [
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Abort)
        ];
        yield driver.serve(null, null);
        yield testCase.equal(middleware.count, 9);
    });
}).catch(function (err) {
    console.log(err.actual);
    console.log(err.expect);
    console.log(err.stack);
});
test_1.test('middleware', function (testCase) {
    return __awaiter(this, void 0, Promise, function* () {
        let middleware1 = new MockMiddleware([
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ]);
        let middleware2 = new MockMiddleware([
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ]);
        let driver = new middleware_1.MiddlewareDriver();
        driver.use(middleware1);
        driver.use(middleware2);
        yield driver.serve(null, null);
        yield testCase.equal(middleware1.count, 3);
        yield testCase.equal(middleware2.count, 3);
        middleware1.results = [
            Promise.resolve(middleware_1.MiddlewareResult.Abort),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ];
        yield driver.serve(null, null);
        yield testCase.equal(middleware1.count, 4);
        yield testCase.equal(middleware2.count, 3);
        middleware1.results = [
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Abort),
            Promise.resolve(middleware_1.MiddlewareResult.Continue)
        ];
        yield driver.serve(null, null);
        yield testCase.equal(middleware1.count, 6);
        yield testCase.equal(middleware2.count, 4);
        middleware1.results = [
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Continue),
            Promise.resolve(middleware_1.MiddlewareResult.Abort)
        ];
        yield driver.serve(null, null);
        yield testCase.equal(middleware1.count, 9);
        yield testCase.equal(middleware2.count, 6);
    });
}).catch(function (err) {
    console.log(err.actual);
    console.log(err.expect);
    console.log(err.stack);
});
//# sourceMappingURL=middleware.js.map