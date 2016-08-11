"use strict";
import * as http from 'http';

import { test } from '../../test';
import {
  Request,
  Response
} from '../../../src/http';
import { Router, RouteHandle } from '../../../src/middlewares/router';

var res: any = {
}

res.setHeader = function() {};
res.write = function(content) {
  this.content = content;
};
res.end = function() {};

test('router', async function(testCase) {
  let router = new Router();
  
  testCase.equal(router.missHandle, null);
  
  var requestMock = new Request(<http.IncomingMessage>{});
  var responseMock = new Response(<http.ServerResponse>res);
  
  const testHandle: RouteHandle = function(request: Request, response: Response) {
    response.status = 200;
    response.send('test');
    return Promise.resolve(true);
  }

  const homeHandle: RouteHandle = function(request: Request, response: Response) {
    response.status = 201;
    response.send('home');
    return Promise.resolve(true);
  }

  router.insertHandle('/test', testHandle);
  router.insertHandle('/home', homeHandle);

  let handle = router.searchHandle('/test');
  testCase.equal(handle, testHandle);
  
  handle = router.searchHandle('/home');
  testCase.equal(handle, homeHandle);

  await router.serve(requestMock, responseMock);
  await testCase.equal(responseMock.status, 404);
  await testCase.equal(res.content, '');
  
  requestMock.url = '/home';
  await router.serve(requestMock, responseMock);
  await testCase.equal(responseMock.status, 201);
  await testCase.equal(res.content, 'home');
  
  requestMock.url = '/test';
  await router.serve(requestMock, responseMock);
  await testCase.equal(responseMock.status, 200);
  await testCase.equal(res.content, 'test');
});
