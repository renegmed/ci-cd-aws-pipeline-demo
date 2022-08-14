import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const pipeline = new CodePipeline(this, 'Pipeline001', {
      pipelineName: 'TestPipeline001',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('renegmed/ci-cd-aws-pipeline-demo', 'master'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth']
      }),      
    });

    // Add a stage
    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "731833107751", region: "us-east-1"}  // it would be better to use different account to see how cdk have effect on other accounts
    }));

    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // Add another stage
    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: { account: "731833107751", region: "us-east-1"}  // it would be better to use different account to see how cdk have effect on other accounts
    }));


  }
}
