import { Command, CommandResponse, CommandStatus } from '../kernel';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type LambdaHttpEvent = {
  body: string | null
  headers: {[key: string]: string}
  httpMethod: HttpMethod
  path: string,
  pathParameters: {[key: string]: string} | null
  queryStringParameters: {[key: string]: string} | null
  authorizationToken: string | null
  methodArn: string
};

export const makeLambdaHandler = (
  command: Command,
  eventToParam?: (e: LambdaHttpEvent) => any[]
) => {
  return async (event: LambdaHttpEvent) => {
    let response: CommandResponse;
    if (eventToParam) {
      const params = eventToParam(event);
      console.log(JSON.stringify(params));
      response = await command(...params);
    } else {
      response = await command();
    }

    return {
      headers: {},
      body: JSON.stringify(response.response ?? ''),
      statusCode: commandStatusToHttpStatusCode(response.status)
    }
  };
};

const commandStatusToHttpStatusCode = (status: CommandStatus) => {
  if (status === 'SUCCESS') return 200;
  if (status === 'CLIENT_ERROR') return 400;
  return 500;
};
