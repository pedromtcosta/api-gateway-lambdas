import { makeLambdaHandler } from '../..';
import { createUser } from '../../../commands/users/create';

export const handler = makeLambdaHandler(createUser, (e) => [
  JSON.parse(e.body!)
]);