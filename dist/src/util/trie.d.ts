export declare class TrieNode<T> {
    path: string;
    value: T;
    parent: TrieNode<T>;
    children: Map<string, TrieNode<T>>;
    constructor(path: string, value: T);
    parsePath(path: string): RegExp;
    addChild(child: TrieNode<T>): void;
    getChild(path: string): TrieNode<T>;
    removeChild(child: TrieNode<T>): void;
}
export declare class Trie<T> {
    seperator: string;
    root: TrieNode<T>;
    constructor(seperator: string);
    splitPath(path: string): string[];
    search(path: string): TrieNode<T>;
    insert(path: string, value: T): TrieNode<T>;
}
