"use strict";

class NotEqualError extends Error {
  constructor(public actual, public expect) {
    super(`${actual} is not equal to ${expect}`);
  }
}

class NotRejectError extends Error {
  constructor(public actual, public expect) {
    super(`should reject with ${expect} instead of resolve to ${actual}`);
  }
}

class NotResolveError extends Error {
  constructor(public actual, public expect) {
    super(`should resolve to ${actual} instead of reject with ${expect}`);
  }
}

export class TestCase {
  constructor(public desc: string, public timeout?: number) {
  }

  async equal(actual, expect) {
    if(actual != expect) {
      throw new NotEqualError(actual, expect);
    }
  }

  async resolve(promise: Promise<any>, expect) {
    try {
      let actual = await promise;
      if(actual != expect) {
        throw new NotEqualError(actual, expect);
      }
    } catch(err) {
      if(err instanceof NotEqualError) {
        throw err;
      } else {
        throw new NotResolveError(err, expect);
      }
    }
  }

  async reject(promise: Promise<any>, expect) {
    try {
      let actual = await promise;
      throw new NotRejectError(actual, expect);
    } catch(err) {
      if(err instanceof NotRejectError) {
        throw err;
      } else {
        if(err != expect) {
          throw new NotEqualError(err, expect);
        }
      }
    }
  }
}

export interface TestCaseRun {
  (testCase: TestCase): any;
}

export async function test(desc: string, run: TestCaseRun) {
  let testCase = new TestCase(desc);

  await run(testCase).catch(function(err) {
    console.log(err.actual);
    console.log(err.expect);
    console.log(err.stack);
  });
}
