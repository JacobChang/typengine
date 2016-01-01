/// <reference path="../../typings/main.d.ts" />
import * as http from 'http';
import { MiddlewareDriver } from './middleware';
export interface AppConfig {
    host: string;
    port: number;
}
export declare class App extends MiddlewareDriver {
    config: AppConfig;
    server: http.Server;
    constructor(config: AppConfig);
    listen(): Promise<boolean>;
    callback(request: http.IncomingMessage, response: http.ServerResponse): void;
}
