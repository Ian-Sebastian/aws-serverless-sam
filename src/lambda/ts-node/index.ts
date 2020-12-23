// import logger from '../../lib';

interface ISomeResponse {
  statusCode: number;
  body: string;
}

export async function handler(event: any, context: any) {
  let response: ISomeResponse;

  console.log(event);
  console.log(context);

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "typescript handler",
      // envVariables: process.env,
    }),
  };
  console.log(response);
  return { message: "ok!" };
}
