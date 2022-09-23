import * as cdk from 'aws-cdk-lib';
import { MyApplicationStack } from '../infra';

const app = new cdk.App();
new MyApplicationStack(app, 'MyApplicationStack');