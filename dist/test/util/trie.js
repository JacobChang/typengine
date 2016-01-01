/// <reference path="../../typings/main.d.ts"/>
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var test_1 = require('../test');
var trie_1 = require('../../src/util/trie');
test_1.test('trie', function (testCase) {
    return __awaiter(this, void 0, Promise, function* () {
        let trie = new trie_1.Trie('/');
        yield testCase.equal(trie.root.path, '');
        yield testCase.equal(trie.root.value, null);
        yield testCase.equal(trie.seperator, '/');
        let rootNode = trie.insert('/', 'root');
        yield testCase.equal(rootNode.parent, trie.root);
        yield testCase.equal(rootNode.path, '/');
        yield testCase.equal(rootNode.value, 'root');
        yield testCase.equal(trie.search('/home'), null);
        let homeNode = trie.insert('/home', 'home-node');
        yield testCase.equal(trie.search('/home'), homeNode);
        yield testCase.equal(homeNode.parent, rootNode);
        yield testCase.equal(homeNode.parent.path, '/');
        yield testCase.equal(homeNode.parent.value, 'root');
        yield testCase.equal(homeNode.path, 'home');
        yield testCase.equal(homeNode.value, 'home-node');
        let testNode = trie.insert('/users/test', 'test-node');
        let seperatorNode = trie.search('/users/');
        let usersNode = trie.search('/users');
        yield testCase.equal(usersNode.parent, rootNode);
        yield testCase.equal(seperatorNode.parent, usersNode);
        yield testCase.equal(testNode.parent, seperatorNode);
        yield testCase.equal(usersNode.value, null);
        yield testCase.equal(seperatorNode.value, null);
        yield testCase.equal(testNode.value, 'test-node');
        usersNode = trie.insert('/users', 'users-node');
        yield testCase.equal(usersNode.parent, rootNode);
        yield testCase.equal(seperatorNode.parent, usersNode);
        yield testCase.equal(testNode.parent, seperatorNode);
        yield testCase.equal(usersNode.value, 'users-node');
        yield testCase.equal(seperatorNode.value, null);
        yield testCase.equal(testNode.value, 'test-node');
    });
}).catch(function (err) {
    console.log(err.actual);
    console.log(err.expect);
    console.log(err.stack);
});
//# sourceMappingURL=trie.js.map