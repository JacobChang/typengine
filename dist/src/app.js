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
var http = require('http');
var middleware_1 = require('./middleware');
var http_1 = require('./http');
class App extends middleware_1.MiddlewareDriver {
    constructor(config) {
        super();
        this.config = config;
        this.server = http.createServer(this.callback.bind(this));
    }
    listen() {
        return __awaiter(this, void 0, Promise, function* () {
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