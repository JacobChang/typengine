/// <reference path="../typings/main.d.ts"/>
const glob = require('glob');
const path = require('path');
var files = glob.sync('./dist/test/suits/**/*.js');
files.forEach(function (file) {
    console.log(`-------- start run test in file {file} -----------`);
    require(path.join(process.cwd(), file));
    console.log(`-------- stop run test in file {file} -----------`);
});
//# sourceMappingURL=runner.js.map