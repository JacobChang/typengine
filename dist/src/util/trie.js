"use strict";
class TrieNode {
    constructor(path, value) {
        this.path = path;
        this.value = value;
        this.parent = null;
        this.children = new Map();
    }
    parsePath(path) {
        return new RegExp(path);
    }
    addChild(child) {
        child.parent = this;
        this.children.set(child.path, child);
    }
    getChild(path) {
        return this.children.get(path);
    }
    removeChild(child) {
        child.parent = null;
        this.children.delete(child.path);
    }
}
exports.TrieNode = TrieNode;
class Trie {
    constructor(seperator) {
        this.seperator = seperator;
        this.root = new TrieNode('', null);
    }
    splitPath(path) {
        let parts = path.split(this.seperator).slice(1);
        let results = [];
        parts.map((part) => {
            results.push(this.seperator);
            if (part !== '') {
                results.push(part);
            }
        });
        return results;
    }
    search(path) {
        let parts = this.splitPath(path);
        let child = null;
        let current = this.root;
        for (const part of parts) {
            child = current.getChild(part);
            if (!child) {
                break;
            }
            current = child;
        }
        return child;
    }
    insert(path, value) {
        let parts = this.splitPath(path);
        let current = this.root;
        for (const part of parts) {
            let child = current.getChild(part);
            if (!child) {
                child = new TrieNode(part, null);
                current.addChild(child);
            }
            current = child;
        }
        current.value = value;
        return current;
    }
}
exports.Trie = Trie;
//# sourceMappingURL=trie.js.map