import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
// import { ManualApprovalStep } from 'aws-cdk-lib/pipelines'
//import { MyPipelineAppStage } from './stage;

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new CodePipeline(this, 'Pipeline001', {
      pipelineName: 'TestPipeline001',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('renegmed/ci-cd-aws-pipeline-demo', 'master'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth']
      }),      
    });
  }
}
