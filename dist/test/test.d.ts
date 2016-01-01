/// <reference path="../../typings/main.d.ts" />
export declare class TestCase {
    desc: string;
    timeout: number;
    constructor(desc: string, timeout?: number);
    equal(actual: any, expect: any): Promise<void>;
    resolve(promise: Promise<any>, expect: any): Promise<void>;
    reject(promise: Promise<any>, expect: any): Promise<void>;
}
export interface TestCaseRun {
    (testCase: TestCase): any;
}
export declare function test(desc: string, run: TestCaseRun): Promise<void>;
