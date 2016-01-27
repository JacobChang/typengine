"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const trie_1 = require('../util/trie');
const middleware_1 = require('../middleware');
class Router extends middleware_1.MiddlewareDriver {
    constructor() {
        super();
        this.trie = new trie_1.Trie('/');
    }
    serve(request, response) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            let result = yield _super("serve").call(this, request, response);
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