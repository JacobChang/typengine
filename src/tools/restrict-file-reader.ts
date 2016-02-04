/// <reference path="../../typings/main.d.ts"/>

import * as fs from 'fs';
import * as path from 'path';

export enum PathState {
  NORMAL,
  PATH_REQUIRED,
  NOT_EXIST,
  OUT_OF_DIR,
  ILLEGAL_CHARACTER
}

export class RestrictFileReader {
  constructor(public rootDir: string) {
    
  }

  async readFile(filePath: string, options): Promise<string> {
    let absPath = path.join(this.rootDir, filePath);

    let state = await this.checkPath(absPath);

    return new Promise<string>((resolve, reject) => {
      if(state === PathState.NORMAL) {
        fs.readFile(absPath, options, function(err, content) {
          if(err) {
            reject(err);
          } else {
            resolve(content);
          }
        });
      } else {
        reject(new Error(PathState[state]));
      }
    });
  }

  async checkPath(absPath: string): Promise<PathState> {
    return new Promise<PathState>(function(resolve, reject) {
      if(absPath === '') {
        reject(new Error(PathState[PathState.PATH_REQUIRED]));
      }

      fs.exists(absPath, (exists) => {
        if(exists) {
          resolve(PathState.NORMAL);
        } else {
          reject(new Error(PathState[PathState.NOT_EXIST]));
        }
      });
    });
  }
}
