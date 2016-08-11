"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const http = require('http');
const middleware_1 = require('./middleware');
const http_1 = require('./http');
class App extends middleware_1.MiddlewareDriver {
    constructor(config) {
        super();
        this.config = config;
        this.server = http.createServer(this.callback.bind(this));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.server.listen(this.config.port, this.config.host, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    callback(request, response) {
        this.serve(new http_1.Request(request), new http_1.Response(response)).then(function (result) {
            console.log(result);
        }, function (err) {
            console.log(err);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map