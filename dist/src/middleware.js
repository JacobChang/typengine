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
(function (MiddlewareResult) {
    MiddlewareResult[MiddlewareResult["Continue"] = 0] = "Continue";
    MiddlewareResult[MiddlewareResult["Break"] = 1] = "Break";
    MiddlewareResult[MiddlewareResult["Abort"] = 2] = "Abort";
    MiddlewareResult[MiddlewareResult["Done"] = 3] = "Done";
})(exports.MiddlewareResult || (exports.MiddlewareResult = {}));
var MiddlewareResult = exports.MiddlewareResult;
class BaseMiddleware {
    constructor() {
        this.enabled = false;
    }
    enable() {
        this.enabled = true;
        return true;
    }
    disable() {
        this.enabled = false;
        return true;
    }
}
exports.BaseMiddleware = BaseMiddleware;
class MiddlewareDriver extends BaseMiddleware {
    constructor() {
        super();
        this.middlewares = [];
    }
    use(middleware) {
        middleware.enable();
        this.middlewares.push(middleware);
    }
    serve(request, response) {
        return __awaiter(this, void 0, Promise, function* () {
            let result = MiddlewareResult.Done;
            for (const middleware of this.middlewares) {
                if (middleware.enabled && middleware.before) {
                    result = yield middleware.before(request, response);
                    if (result === MiddlewareResult.Break) {
                        break;
                    }
                    if (result === MiddlewareResult.Continue) {
                        continue;
                    }
                    if (result === MiddlewareResult.Abort) {
                        return result;
                    }
                }
            }
            for (const middleware of this.middlewares) {
                if (middleware.enabled && middleware.serve) {
                    result = yield middleware.serve(request, response);
                    if (result === MiddlewareResult.Break) {
                        break;
                    }
                    if (result === MiddlewareResult.Continue) {
                        continue;
                    }
                    if (result === MiddlewareResult.Abort) {
                        return result;
                    }
                }
            }
            for (const middleware of this.middlewares) {
                if (middleware.enabled && middleware.after) {
                    result = yield middleware.after(request, response);
                    if (result === MiddlewareResult.Break) {
                        break;
                    }
                    if (result === MiddlewareResult.Continue) {
                        continue;
                    }
                    if (result === MiddlewareResult.Abort) {
                        return result;
                    }
                }
            }
            return result;
        });
    }
}
exports.MiddlewareDriver = MiddlewareDriver;
//# sourceMappingURL=middleware.js.map