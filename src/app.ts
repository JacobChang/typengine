/// <reference path="../typings/main.d.ts"/>
"use strict";

import * as http from 'http';
import {
  Middleware,
  MiddlewareDriver,
  MiddlewareResult
} from './middleware';
import {
  Request,
  Response
} from './http';

export interface AppConfig {
  host: string;
  port: number;
}

export class App extends MiddlewareDriver {
  server: http.Server;

  constructor(public config: AppConfig) {
    super();

    this.server = http.createServer(this.callback.bind(this));
  }

  async listen(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.listen(
        this.config.port,
        this.config.host,
        (err, result) => {
          if(err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  callback(request: http.IncomingMessage, response: http.ServerResponse) {
    this.serve(new Request(request), new Response(response)).then(function(result) {
      console.log(result);
    }, function(err) {
      console.log(err);
    });
  }
}