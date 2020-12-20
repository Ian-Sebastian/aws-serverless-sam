import logger from '../../lib';

const handler = async (event, context) => {
  let response = {};
  logger(response);
  logger(event);
  logger(context);
  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'typescript handler',
      envVariables: process.env,
    }),
  };
};

export default handler;
