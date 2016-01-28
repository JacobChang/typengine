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

export class Router extends MiddlewareDriver implements Middleware {
  trie: Trie<RouteHandle>;
  missHandle: RouteHandle;

  constructor() {
    super();
    this.missHandle = null;
    this.trie = new Trie<RouteHandle>('/');
  }

  async serve(request: Request, response: Response) {
    let result = await super.serve(request, response);
    if(result == MiddlewareResult.Abort) {
      return result;
    }

    let handle = this.searchHandle(request.url);
    if(handle) {
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

  searchHandle(path): RouteHandle {
    if(!path) {
      return this.missHandle;
    }

    let node = this.trie.search(path);
    if(node) {
      return node.value;
    }
    
    return this.missHandle;
  }

  miss(handle: RouteHandle) {
    this.missHandle = handle;
  }

  insertHandle(path: string, handle: RouteHandle) {
    return this.trie.insert(path, handle);
  }
}