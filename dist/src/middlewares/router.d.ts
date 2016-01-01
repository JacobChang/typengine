import { Trie, TrieNode } from '../util/trie';
import { MiddlewareResult, Middleware, MiddlewareDriver } from '../middleware';
import { Request, Response, HttpHandler, HttpHandle } from '../http';
export interface Recognizer {
}
export declare type RouteHandle = HttpHandler | HttpHandle;
export interface RouteHandler {
    method: string;
    handle: RouteHandle;
}
export declare class Router extends MiddlewareDriver implements Middleware {
    trie: Trie<RouteHandler>;
    missHandle: RouteHandle;
    constructor();
    serve(request: Request, response: Response): Promise<MiddlewareResult>;
    searchHandler(path: any): RouteHandler;
    miss(handle: RouteHandle): void;
    insertHandler(path: string, method: string, handle: RouteHandle): TrieNode<RouteHandler>;
    option(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
    head(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
    trace(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
    get(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
    post(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
    put(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
    del(path: string, handle: RouteHandle): TrieNode<RouteHandler>;
}
