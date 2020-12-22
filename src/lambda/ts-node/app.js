const imported = require('ts-node/register');
const method = require('./main');

exports.lambdaHandler = async (event, context) => {
  console.log(imported);
  console.log(method);
  console.log('Query');
  const queries = JSON.stringify(event.queytStringParameters);
  return {
    statusCode: 200,
    body: `Queries: ${queries}`,
  };
};
