/// <reference path="../../typings/main.d.ts"/>
"use strict";
import { test } from '../test';
import { Trie, TrieNode } from '../../src/util/trie';

test('trie', async function(testCase) {
  let trie = new Trie('/');

  await testCase.equal(trie.root.path, '');
  await testCase.equal(trie.root.value, null);
  await testCase.equal(trie.seperator, '/');

  let rootNode = trie.insert('/', 'root');
  await testCase.equal(rootNode.parent, trie.root);
  await testCase.equal(rootNode.path, '/');
  await testCase.equal(rootNode.value, 'root');

  await testCase.equal(trie.search('/home'), null);

  let homeNode = trie.insert('/home', 'home-node');

  await testCase.equal(trie.search('/home'), homeNode);
  await testCase.equal(homeNode.parent, rootNode);
  await testCase.equal(homeNode.parent.path, '/');
  await testCase.equal(homeNode.parent.value, 'root');
  await testCase.equal(homeNode.path, 'home');
  await testCase.equal(homeNode.value, 'home-node');


  let testNode = trie.insert('/users/test', 'test-node');
  let seperatorNode = trie.search('/users/');
  let usersNode = trie.search('/users');
  await testCase.equal(usersNode.parent, rootNode);
  await testCase.equal(seperatorNode.parent, usersNode);
  await testCase.equal(testNode.parent, seperatorNode);
  await testCase.equal(usersNode.value, null);
  await testCase.equal(seperatorNode.value, null);
  await testCase.equal(testNode.value, 'test-node');
  
  usersNode = trie.insert('/users', 'users-node');
  await testCase.equal(usersNode.parent, rootNode);
  await testCase.equal(seperatorNode.parent, usersNode);
  await testCase.equal(testNode.parent, seperatorNode);
  await testCase.equal(usersNode.value, 'users-node');
  await testCase.equal(seperatorNode.value, null);
  await testCase.equal(testNode.value, 'test-node');
}).catch(function(err) {
  console.log(err.actual);
  console.log(err.expect);
  console.log(err.stack);
});
