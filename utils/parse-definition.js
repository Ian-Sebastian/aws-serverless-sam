const fs = require('fs');
const stepFunctionDefinition = fs.readFileSync(`${__dirname}/step-function.definition.json`, 'utf8').replace(/\s/g, '');
console.log(stepFunctionDefinition);
