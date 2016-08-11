"use strict";
import * as fs from 'fs';
import * as path from 'path';
import { Request, Response, HttpHandler } from '../http';

export enum PathType {
  OutOfRange,
  NotExist,
  InvalidCharacter,
  Valid
}

export class StaticFileHandler implements HttpHandler {
  root: string;

  constructor(root: string) {
    this.root = path.resolve(root);
  }

  async handle(request: Request, response: Response): Promise<boolean> {
    let filePath = this.extractFilePath(request.url);
    if(filePath === '') {
      response.status = 404;
      response.setHeader('Content-Type', 'text/html');
      return response.send('');
    }

    let type = this.validatePath(filePath);
    if(type === PathType.OutOfRange || type === PathType.InvalidCharacter) {
      response.status = 403;
      response.setHeader('Content-Type', 'text/html');
      return response.send('');
    }

    let content = await this.readFile(filePath);

    response.status = 200;
    return response.send(content);
  }

  extractFilePath(url: string): string {
    try {
      let decodeUrl = decodeURIComponent(url);
      return path.normalize(path.join(this.root, decodeUrl));
    } catch (e) {
      return '';
    }
  }

  validatePath(filePath: string): PathType {
    // Null bytes is not allowed
    if(filePath.indexOf('\0') !== -1) {
      return PathType.InvalidCharacter;
    }

    if(filePath.indexOf(this.root) !== 0) {
      return PathType.OutOfRange;
    }

    return PathType.Valid;
  }

  async readFile(absPath: string): Promise<string> {
    return new Promise<string>(function(resolve, reject) {
      fs.exists(absPath, function(exists) {
        if(exists) {
          let options = {
            encoding: 'utf-8'
          };

          fs.readFile(absPath, options, function(err, data) {
            if(err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        } else {
          reject(new Error('file does not exist'));
        }
      });
    });
  }
}
