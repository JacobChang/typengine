/// <reference path="../../../typings/main.d.ts"/>
"use strict";

import { test } from '../../test';
import {
  FileRenderer
} from '../../../src/renderers/file';

test('FileRenderer', async function(testCase) {
  var fileRenderer = new FileRenderer('.');

  await testCase.resolve(fileRenderer.render('./test/mock/test.html'), '<html><head></head><body></body></html>');
});
