/// <reference path="../../../typings/main.d.ts"/>
"use strict";
import { test } from '../../test';
import { StaticFileHandler } from '../../../src/handlers/static';

test('StaticFileHandler', async function(testCase) {
  var handler = new StaticFileHandler('../');
});
