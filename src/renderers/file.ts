"use strict";

import { Renderer } from '../renderer';

export class FileRenderer implements Renderer {
  constructor(public root: string) {
    
  }

  render(file: string, params?: any): Promise<string> {
    return Promise.resolve('');
  }
}