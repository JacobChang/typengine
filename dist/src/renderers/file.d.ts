import { Renderer } from '../renderer';
export declare class FileRenderer implements Renderer {
    root: string;
    constructor(root: string);
    render(file: string, params?: any): Promise<string>;
}
