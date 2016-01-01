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
var trie_1 = require('../util/trie');
var middleware_1 = require('../middleware');
class Router extends middleware_1.MiddlewareDriver {
    constructor() {
        super();
        this.trie = new trie_1.Trie('/');
    }
    serve(request, response) {
        return __awaiter(this, void 0, Promise, function* () {
            let result = yield super.serve(request, response);
            if (result != middleware_1.MiddlewareResult.Continue) {
                return result;
            }
            let handler = this.searchHandler(request.url);
            if (handler) {
                let handle = handler.handle;
                if (handle.handle) {
                    handle.handle(request, response);
                }
                else {
                    handle(request, response);
                }
            }
            else {
                response.status = 404;
                response.send('');
            }
            return middleware_1.MiddlewareResult.Done;
        });
    }
    searchHandler(path) {
        let node = this.trie.search(path);
        if (node) {
            return node.value;
        }
        return null;
    }
    miss(handle) {
        this.missHandle = handle;
    }
    insertHandler(path, method, handle) {
        let handler = {
            method: method,
            handle: handle
        };
        return this.trie.insert(path, handler);
    }
    option(path, handle) {
        return this.insertHandler(path, 'OPTION', handle);
    }
    head(path, handle) {
        return this.insertHandler(path, 'HEAD', handle);
    }
    trace(path, handle) {
        return this.insertHandler(path, 'TRACE', handle);
    }
    get(path, handle) {
        return this.insertHandler(path, 'GET', handle);
    }
    post(path, handle) {
        return this.insertHandler(path, 'POST', handle);
    }
    put(path, handle) {
        return this.insertHandler(path, 'PUT', handle);
    }
    del(path, handle) {
        return this.insertHandler(path, 'DELETE', handle);
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map