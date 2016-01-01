"use strict";

import { Request, Response } from './http';

export enum MiddlewareResult {
  Continue,
  Break,
  Abort,
  Done
}

export interface Middleware {
  enabled?: boolean;
  enable?(): boolean;
  disable?(): boolean;

  before?(request: Request, response: Response): Promise<MiddlewareResult>;
  serve?(request: Request, response: Response): Promise<MiddlewareResult>;
  after?(request: Request, response: Response): Promise<MiddlewareResult>;
}

export class BaseMiddleware implements Middleware {
  enabled: boolean;

  constructor() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
    return true;
  }

  disable() {
    this.enabled = false;
    return true;
  }
}

export class MiddlewareDriver extends BaseMiddleware {
  middlewares: Middleware[];

  constructor() {
    super();

    this.middlewares = [];
  }

  use(middleware: Middleware) {
    middleware.enable();
    this.middlewares.push(middleware);
  }

  async serve(request: Request, response: Response): Promise<MiddlewareResult> {
    let result: MiddlewareResult = MiddlewareResult.Done;

    for(const middleware of this.middlewares) {
      if(middleware.enabled && middleware.before) {
        result = await middleware.before(request, response);
        if(result === MiddlewareResult.Break) {
          break;
        }

        if(result === MiddlewareResult.Continue) {
          continue;
        }

        if(result === MiddlewareResult.Abort) {
          return result;
        }
      }
    }

    for(const middleware of this.middlewares) {
      if(middleware.enabled && middleware.serve) {
        result = await middleware.serve(request, response);
        if(result === MiddlewareResult.Break) {
          break;
        }

        if(result === MiddlewareResult.Continue) {
          continue;
        }

        if(result === MiddlewareResult.Abort) {
          return result;
        }
      }
    }

    for(const middleware of this.middlewares) {
      if(middleware.enabled && middleware.after) {
        result = await middleware.after(request, response);
        if(result === MiddlewareResult.Break) {
          break;
        }

        if(result === MiddlewareResult.Continue) {
          continue;
        }

        if(result === MiddlewareResult.Abort) {
          return result;
        }
      }
    }

    return result;
  }
}