/// <reference path="../typings/main.d.ts"/>
"use strict";
const HttpStatus = {};
class Request {
    constructor(request) {
        this.request = request;
    }
    get method() {
        return this.request.method;
    }
    set method(method) {
        this.request.method = method;
    }
    get url() {
        return this.request.url;
    }
    set url(url) {
        this.request.url = url;
    }
    get headers() {
        return this.request.headers;
    }
    toJSON() {
        return {
            method: this.method,
            url: this.url,
            headers: this.headers
        };
    }
}
exports.Request = Request;
class Response {
    constructor(response) {
        this.response = response;
        this.headers = [];
    }
    get status() {
        return this.response.statusCode;
    }
    set status(status) {
        this.response.statusCode = status;
    }
    setHeader(key, value) {
        this.headers.push({
            key: key,
            value: value
        });
    }
    send(body) {
        this.response.setHeader('Content-Type', 'text/plain');
        this.headers.map((header) => {
            this.response.setHeader(header.key, header.value);
        });
        this.response.write(body);
        this.response.end();
        return true;
    }
}
exports.Response = Response;
//# sourceMappingURL=http.js.map