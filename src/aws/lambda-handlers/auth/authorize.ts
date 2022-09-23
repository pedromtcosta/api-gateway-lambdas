import { LambdaHttpEvent } from '../..';
import { authorize } from '../../../commands/auth/authorize';

export const handler = async (event: LambdaHttpEvent) => {
  let effect = 'Deny';
  if (event.authorizationToken && typeof event.authorizationToken === 'string') {
    const authToken = event.authorizationToken.split(' ')[1];
    effect = (await authorize(authToken)).status === 'SUCCESS'
      ? 'Allow'
      : 'Deny';
  }

  return {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: [
            'execute-api:Invoke'
          ],
          Effect: effect,
          Resource: [
            event.methodArn
          ],
        },
      ],
    },
  }
};
