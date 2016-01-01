"use strict";

export class TrieNode<T> {
  public parent: TrieNode<T> = null;
  public children: Map<string, TrieNode<T>> = new Map<string, TrieNode<T>>();

  constructor(public path: string, public value: T) {
  }

  parsePath(path: string): RegExp {
    return new RegExp(path);
  }

  addChild(child: TrieNode<T>) {
    child.parent = this;
    this.children.set(child.path, child);
  }

  getChild(path: string) {
    return this.children.get(path);
  }
  
  removeChild(child: TrieNode<T>) {
    child.parent = null;
    this.children.delete(child.path);
  }
}

export class Trie<T> {
  public root: TrieNode<T>;

  constructor(public seperator: string) {
    this.root = new TrieNode<T>('', null);
  }

  splitPath(path: string): string[] {
    let parts = path.split(this.seperator).slice(1);

    let results = [];
    parts.map((part) => {
      results.push(this.seperator);
      if(part !== '') {
        results.push(part);
      }
    });

    return results;
  }

  search(path: string): TrieNode<T> {
    let parts = this.splitPath(path);
    
    let child: TrieNode<T> = null;
    let current = this.root;
    for(const part of parts) {
      child = current.getChild(part);
      if(!child) {
        break;
      }

      current = child;
    }

    return child;
  }

  insert(path: string, value: T): TrieNode<T> {
    let parts = this.splitPath(path);

    let current = this.root;
    for(const part of parts) {
      let child = current.getChild(part);
      if(!child) {
        child = new TrieNode<T>(part, null);
        current.addChild(child);
      }
      current = child;
    }
    current.value = value;

    return current;
  }
}