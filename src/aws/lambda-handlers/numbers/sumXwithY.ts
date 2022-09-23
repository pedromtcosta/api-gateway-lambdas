import { makeLambdaHandler } from '../..';
import { sumXwithY } from '../../../commands/numbers/sumXwithY';

export const handler = makeLambdaHandler(sumXwithY, (e) => [
  e.pathParameters?.x, e.pathParameters?.y
]);