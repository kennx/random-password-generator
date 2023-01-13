const PasswordGenerator = require('../build/index.cjs');

const result = new PasswordGenerator().generate();

console.log(result);
