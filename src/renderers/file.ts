'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { Renderer } from '../renderer';

export class FileRenderer implements Renderer {
  constructor(public root: string) {
    
  }

  readFile(absPath): Promise<string> {
    return new Promise(function(resolve, reject) {
      fs.readFile(absPath, 'utf-8', function(err, content) {
        if(err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }

  async render(file: string, params?: any): Promise<string> {
    var absPath = path.join(this.root, file);

    var content = await this.readFile(absPath);

    return content;
  }
}