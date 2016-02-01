import { Request, Response } from './http';
export declare enum MiddlewareResult {
    Continue = 0,
    Break = 1,
    Abort = 2,
    Done = 3,
}
export interface Middleware {
    enabled?: boolean;
    enable?(): boolean;
    disable?(): boolean;
    before?(request: Request, response: Response): Promise<MiddlewareResult>;
    serve?(request: Request, response: Response): Promise<MiddlewareResult>;
    after?(request: Request, response: Response): Promise<MiddlewareResult>;
}
export declare class BaseMiddleware implements Middleware {
    enabled: boolean;
    constructor();
    enable(): boolean;
    disable(): boolean;
}
export declare class MiddlewareDriver extends BaseMiddleware {
    middlewares: Middleware[];
    constructor();
    use(middleware: Middleware): void;
    serve(request: Request, response: Response): Promise<MiddlewareResult>;
}
