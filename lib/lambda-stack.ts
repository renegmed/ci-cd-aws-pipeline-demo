import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack { 
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
        super(scope, id, props); 

        console.log("...code from asset\n", Code.fromAsset(path.join(__dirname, 'lambda')));
        
        new Function(this, "LambdaFunction001", {
            runtime: Runtime.NODEJS_12_X, // using node fro this, but can easily us python or other
            handler: 'handler.handler',
            code: Code.fromAsset(path.join(__dirname, 'lambda')),  // resolving to ./lambda directory 
            environment: { "stageName": stageName}  // inputting stagename
        });
    }
}