import { Renderer } from '../renderer';
export declare class FileRenderer implements Renderer {
    root: string;
    constructor(root: string);
    readFile(absPath: any): Promise<string>;
    render(file: string, params?: any): Promise<string>;
}
