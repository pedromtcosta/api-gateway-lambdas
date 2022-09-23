# Lambdas with API Gateway - CDK
This sample project displays how to create AWS Lambdas behind an API Gateway using CDK.

## Structure
The structure of this project is meant to have the actual domain logic loosely coupled to the AWS and HTTP specifics. All domain logic is in the `commands` module, which then depends on the `kernel` module. This means that we have to transform the payloads and response that are send to or comes from the `commands` module to work with the ones expected by the the Lambda runtime, which is achieved through the `aws` module in this project (see `makeLambdaHandler` at `aws/index.ts`);

## External dependencies (NPM)
The Lambda packager/builder is smart enough to only pick up the dependencies needed by each specific Lambda Function. For example, the `SumNumbers` function uses the `bignumber.js` NPM package to perform its (very advanced) calculation, and even though this dependency comes from `node_modules` in the root of the source code, when we build the CloudFormation Stack, this module is only included in the `SumNumbers` Lambda.

## Pros & Cons
### Pros

- clean microservices-oriented architecture;
- clear separation between Domain and Transformations;
- less costs as we only pay per execution time;
- much less infra to manage;
- auto-scaling, caching, monitoring...;
- (as) easy (as possible) to switch to different cloud providers or self-hosting;

### Cons
- more complex code than running `express` behind the Lambda or in an EC2;
- more code as we need transaformers 🤖🦾🦿;
- more complex deployment process;