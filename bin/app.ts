#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CiCdAwsPipelineDemoStack } from '../lib/app-stack';

const app = new cdk.App();
new CiCdAwsPipelineDemoStack(app, 'AppStaCiCdAwsPipelineDemoStackck', {
   env: {
    account: '731833107751',
    region: 'us-east-1',
   }
});

app.synth();