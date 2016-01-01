/// <reference path="../typings/main.d.ts"/>
"use strict";
import { test } from './test';
import * as mimetypes from '../src/mimetypes';

test('mimetypes', async function(testCase) {
  await testCase.equal(mimetypes.extToType['pdf'], 'application/pdf');

  await testCase.equal(mimetypes.typeToExt['application/pdf'], 'pdf');
}).catch(function(err) {
  console.log(err.actual);
  console.log(err.expect);
  console.log(err.stack);
});
