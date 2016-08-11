"use strict";
import { test } from '../../test';
import { RestrictFileReader } from '../../../src/tools/restrict-file-reader';

test('RestrictFileReader', async function(testCase) {
  var reader = new RestrictFileReader('.');

  var options = {
    encoding: 'utf-8'
  };

  var content = await reader.readFile('./test/mock/test.html', options);
  testCase.equal(content, '<html><head></head><body></body></html>');
  
  await reader.readFile('./test/mock/test2.html', options).catch(function(err) {
    testCase.equal(err.message, 'NOT_EXIST');
  });
  
  await reader.readFile('', options).catch(function(err) {
    testCase.equal(err.message, 'PATH_REQUIRED');
  });
});
