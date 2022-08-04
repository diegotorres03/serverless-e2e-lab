import {
    Stack,
    StackProps,
    aws_dynamodb as DynamoDB,
    aws_lambda as Lambda,
    aws_lambda_event_sources as LambdaEventSources,
    aws_iam as IAM,
    aws_timestream as TimeStream,
    aws_sqs as SQS,
    aws_sns as SNS,
    aws_quicksight as Quicksight,
    CfnOutput,
    Duration,
    RemovalPolicy,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class BackendStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const timeToLiveAttribute = '_expireOn'

        // [ ] 3.1.1: create DynamoDB orders table
        // [ ] 3.1.2: connect api to dynamodb
        // [ ] 4.1.1: create processing orders queue
        // [ ] 4.1.2: create user notification topic (sns)
        // [ ] 4.2.1: create a lambda to handle dynamodb stream
        // [ ] 4.2.2: create a lambda to handle sqs messages
        // [ ] 4.3.1: set lambda 4.2.1 as handler for dynamodb table updates
        // [ ] 4.3.2: set lambda 4.2.2 as handler for sqs queue messages

    }
}
