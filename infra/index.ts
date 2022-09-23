import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdanodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class MyApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authorizeLambda = new lambdanodejs.NodejsFunction(this, 'Authorize', {
      functionName: 'Authorize',
      entry: 'src/aws/lambda-handlers/auth/authorize.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 2048,
    });

    const createUserLambda = new lambdanodejs.NodejsFunction(this, 'CreateUser', {
      functionName: 'CreateUser',
      entry: 'src/aws/lambda-handlers/users/create.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 2048,
    });

    const sumNumbersLambda = new lambdanodejs.NodejsFunction(this, 'SumNumbers', {
      functionName: 'SumNumbers',
      entry: 'src/aws/lambda-handlers/numbers/sumXwithY.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 2048,
    });

    const getSecretLambda = new lambdanodejs.NodejsFunction(this, 'GetSecret', {
      functionName: 'GetSecret',
      entry: 'src/aws/lambda-handlers/secrets/getSecret.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 2048,
    });

    const authorizer = new apigateway.TokenAuthorizer(this, 'ApiAuthorizer', {
      handler: authorizeLambda,
      resultsCacheTtl: cdk.Duration.seconds(0)
    });

    const api = new apigateway.RestApi(this, 'DummyApi');

    const users = api.root.addResource('users');
    users.addMethod(
      'POST',
      new apigateway.LambdaIntegration(createUserLambda, {proxy:true})
    );

    const numbers = api.root.addResource('numbers');
    const numbersWithX = numbers.addResource('{x}')
    const numbersWithXSum = numbersWithX.addResource('sum')
    const numbersWithXSumY = numbersWithXSum.addResource('{y}')

    numbersWithXSumY.addMethod(
      'GET',
      new apigateway.LambdaIntegration(sumNumbersLambda, {proxy:true}),
      {
        requestParameters: {
          'method.request.path.x': true,
          'method.request.path.y': true
        },
      }
    );

    const secrets = api.root.addResource('secrets');
    secrets.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getSecretLambda),
      {
        authorizer,
        authorizationType: apigateway.AuthorizationType.CUSTOM,
      }
    )
  }
}
