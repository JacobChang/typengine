"use strict";
import * as http from 'http';
import { MimeType } from './mimetypes';
import { Renderer } from './renderer';

const HttpStatus = {
  
};

export class Request {
  constructor(public request: http.IncomingMessage) {
    
  }
  
  get method(): string {
    return this.request.method;
  }
  
  set method(method: string) {
    this.request.method = method;
  }
  
  get url() {
    return this.request.url;
  }
  
  set url(url: string) {
    this.request.url = url;
  }
  
  get headers() {
    return this.request.headers;
  }
  
  toJSON() {
    return {
      method: this.method,
      url: this.url,
      headers: this.headers
    }
  }
}

export interface HttpHeader {
  key: string;
  value: string;
}

export class Response {
  public headers: HttpHeader[];

  constructor(public response: http.ServerResponse) {
    this.headers = [];
  }
  
  get status() {
    return this.response.statusCode;
  }
  
  set status(status: number) {
    this.response.statusCode = status;
  }

  setHeader(key: string, value: string) {
    this.headers.push({
      key: key,
      value: value
    });
  }

  send(body: string): boolean {
    this.response.setHeader('Content-Type', 'text/plain');
    
    this.headers.map((header) => {
      this.response.setHeader(header.key, <string>header.value);
    });

    this.response.write(body);

    this.response.end();

    return true;
  }
}

export interface HttpHandler {
  handle: HttpHandle;
}

export interface HttpHandle {
  (request: Request, response: Response): Promise<boolean>;
}
