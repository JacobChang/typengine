/// <reference path="../typings/main.d.ts"/>
"use strict";
import { test } from './test';
import {
  Request,
  Response
} from '../src/http';
import {
  Middleware,
  BaseMiddleware,
  MiddlewareDriver,
  MiddlewareResult
} from '../src/middleware';

class MockMiddleware extends BaseMiddleware {
  count: number;

  constructor(public results: Promise<MiddlewareResult>[]) {
    super();

    this.count = 0;
  }

  before(request: Request, response: Response): Promise<MiddlewareResult> {
    this.count += 1;
    return this.results[0];
  }

  serve(request: Request, response: Response): Promise<MiddlewareResult> {
    this.count += 1;
    return this.results[1];
  }

  after(request: Request, response: Response): Promise<MiddlewareResult> {
    this.count += 1;
    return this.results[2];
  }
}

test('middleware', async function(testCase) {
  let middleware = new MockMiddleware([
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue)
  ]);
  let driver = new MiddlewareDriver();
  driver.use(middleware);

  await driver.serve(null, null);
  await testCase.equal(middleware.count, 3);
  
  middleware.results = [
    Promise.resolve(MiddlewareResult.Abort),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue)
  ];
  await driver.serve(null, null);
  await testCase.equal(middleware.count, 4);

  middleware.results = [
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Abort),
    Promise.resolve(MiddlewareResult.Continue)
  ];
  await driver.serve(null, null);
  await testCase.equal(middleware.count, 6);
  
  middleware.results = [
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Abort)
  ];
  await driver.serve(null, null);
  await testCase.equal(middleware.count, 9);
}).catch(function(err) {
  console.log(err.actual);
  console.log(err.expect);
  console.log(err.stack);
});

test('middleware', async function(testCase) {
  let middleware1 = new MockMiddleware([
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue)
  ]);
  let middleware2 = new MockMiddleware([
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue)
  ]);
  let driver = new MiddlewareDriver();
  driver.use(middleware1);
  driver.use(middleware2);

  await driver.serve(null, null);
  await testCase.equal(middleware1.count, 3);
  await testCase.equal(middleware2.count, 3);
    
  middleware1.results = [
    Promise.resolve(MiddlewareResult.Abort),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue)
  ];
  await driver.serve(null, null);
  await testCase.equal(middleware1.count, 4);
  await testCase.equal(middleware2.count, 3);

  middleware1.results = [
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Abort),
    Promise.resolve(MiddlewareResult.Continue)
  ];
  await driver.serve(null, null);
  await testCase.equal(middleware1.count, 6);
  await testCase.equal(middleware2.count, 4);
  
  middleware1.results = [
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Continue),
    Promise.resolve(MiddlewareResult.Abort)
  ];
  await driver.serve(null, null);
  await testCase.equal(middleware1.count, 9);
  await testCase.equal(middleware2.count, 6);
}).catch(function(err) {
  console.log(err.actual);
  console.log(err.expect);
  console.log(err.stack);
});
