"use strict";

import { Trie, TrieNode } from '../util/trie';
import { Renderer } from '../renderer';
import {
  MiddlewareResult,
  Middleware,
  MiddlewareDriver
} from '../middleware';
import {
  Request,
  Response,
  HttpHandler,
  HttpHandle
} from '../http';

export interface Recognizer {
  
}

export type RouteHandle = HttpHandler | HttpHandle; 

export interface RouteHandler {
  method: string;
  handle: RouteHandle;
}

export class Router extends MiddlewareDriver implements Middleware {
  trie: Trie<RouteHandler>;
  missHandle: RouteHandle;

  constructor() {
    super();
    this.trie = new Trie<RouteHandler>('/');
  }

  async serve(request: Request, response: Response) {
    let result = await super.serve(request, response);
    if(result != MiddlewareResult.Continue) {
      return result;
    }

    let handler = this.searchHandler(request.url);
    if(handler) {
      let handle = handler.handle;
      if((<HttpHandler>handle).handle) {
        (<HttpHandler>handle).handle(request, response);
      } else {
        (<HttpHandle>handle)(request, response);
      }
    } else {
      response.status = 404;
      response.send('');
    }

    return MiddlewareResult.Done;
  }

  searchHandler(path): RouteHandler {
    let node = this.trie.search(path);
    if(node) {
      return node.value;
    }
    
    return null;
  }

  miss(handle: RouteHandle) {
    this.missHandle = handle;
  }

  insertHandler(path: string, method: string, handle: RouteHandle) {
    let handler = {
      method: method,
      handle: handle
    };

    return this.trie.insert(path, handler);
  }

  option(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'OPTION', handle);
  }

  head(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'HEAD', handle);
  }

  trace(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'TRACE', handle);
  }

  get(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'GET', handle);
  }

  post(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'POST', handle);
  }

  put(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'PUT', handle);
  }

  del(path: string, handle: RouteHandle) {
    return this.insertHandler(path, 'DELETE', handle);
  }
}