/// <reference path="../../../typings/main.d.ts" />
import { Request, Response, HttpHandler } from '../http';
export declare enum PathType {
    OutOfRange = 0,
    NotExist = 1,
    InvalidCharacter = 2,
    Valid = 3,
}
export declare class StaticFileHandler implements HttpHandler {
    root: string;
    constructor(root: string);
    handle(request: Request, response: Response): Promise<boolean>;
    extractFilePath(url: string): string;
    validatePath(filePath: string): PathType;
    readFile(absPath: string): Promise<string>;
}
