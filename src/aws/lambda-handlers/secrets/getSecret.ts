import { makeLambdaHandler } from '../..';
import { getSecret } from '../../../commands/secrets/getSecret';

export const handler = makeLambdaHandler(getSecret);