// import logger from '../../lib';

interface ISomeResponse {
  statusCode: number;
  body: string;
}

export function handler(event, context, callback) {
  let response: ISomeResponse;

  console.log(response);
  console.log(event);
  console.log(context);

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'typescript handler',
      // envVariables: process.env,
    }),
  };

  callback(undefined, response);
}
