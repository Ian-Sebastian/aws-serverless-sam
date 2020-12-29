import { Client } from "pg";
interface ISomeResponse {
  statusCode: number;
  body: string;
}

let response: ISomeResponse;

export async function handler(event: any, context: any) {
  console.log(event);
  console.log(context);

  /**
   * Lambda container can access postgres service through:
   * - compose docker service discovery
   * - process.env.HOST_DOCKER_INTERNAL set by template.yaml, overrided with docker0 interface (Linux)
   * - process.env.HOST_DOCKER_INTERNAL set by default to host.docker.internal, translated through docker service discovery
   */
  const client = new Client({
    user: "root",
    host: process.env.HOST_DOCKER_INTERNAL || 'postgres',
    password: "password",
    database: "user_db",
  });

  await client.connect();

  const res = await client.query(
    "SELECT * from hello_table ORDER BY id DESC LIMIT 1"
  );

  const hello = `${res.rows[0].hello_source} says hello to ${res.rows[0].hello_target}`;

  console.log(hello);

  await client.end();

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: hello,
    }),
  };

  return response;
}
