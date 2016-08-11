import { Trie, TrieNode } from '../util/trie';
import { MiddlewareResult, Middleware, MiddlewareDriver } from '../middleware';
import { Request, Response, HttpHandler, HttpHandle } from '../http';
export interface Recognizer {
}
export declare type RouteHandle = HttpHandler | HttpHandle;
export declare class Router extends MiddlewareDriver implements Middleware {
    trie: Trie<RouteHandle>;
    missHandle: RouteHandle;
    constructor();
    serve(request: Request, response: Response): Promise<MiddlewareResult>;
    searchHandle(path: any): RouteHandle;
    miss(handle: RouteHandle): void;
    insertHandle(path: string, handle: RouteHandle): TrieNode<RouteHandle>;
}
