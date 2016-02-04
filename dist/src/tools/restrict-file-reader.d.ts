/// <reference path="../../../typings/main.d.ts" />
export declare enum PathState {
    NORMAL = 0,
    PATH_REQUIRED = 1,
    NOT_EXIST = 2,
    OUT_OF_DIR = 3,
    ILLEGAL_CHARACTER = 4,
}
export declare class RestrictFileReader {
    rootDir: string;
    constructor(rootDir: string);
    readFile(filePath: string, options: any): Promise<string>;
    checkPath(absPath: string): Promise<PathState>;
}
