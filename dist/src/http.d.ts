/// <reference types="node" />
import * as http from 'http';
export declare class Request {
    request: http.IncomingMessage;
    constructor(request: http.IncomingMessage);
    method: string;
    url: string;
    readonly headers: any;
    toJSON(): {
        method: string;
        url: string;
        headers: any;
    };
}
export interface HttpHeader {
    key: string;
    value: string;
}
export declare class Response {
    response: http.ServerResponse;
    headers: HttpHeader[];
    constructor(response: http.ServerResponse);
    status: number;
    setHeader(key: string, value: string): void;
    send(body: string): boolean;
}
export interface HttpHandler {
    handle: HttpHandle;
}
export interface HttpHandle {
    (request: Request, response: Response): Promise<boolean>;
}
