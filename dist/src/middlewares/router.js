"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
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
        this.missHandle = null;
        this.trie = new trie_1.Trie('/');
    }
    serve(request, response) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _super("serve").call(this, request, response);
            if (result == middleware_1.MiddlewareResult.Abort) {
                return result;
            }
            let handle = this.searchHandle(request.url);
            if (handle) {
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
    searchHandle(path) {
        if (!path) {
            return this.missHandle;
        }
        let node = this.trie.search(path);
        if (node) {
            return node.value;
        }
        return this.missHandle;
    }
    miss(handle) {
        this.missHandle = handle;
    }
    insertHandle(path, handle) {
        return this.trie.insert(path, handle);
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map