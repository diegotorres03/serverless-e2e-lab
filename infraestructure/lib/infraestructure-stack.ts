import {
  Stack,
  StackProps,
  aws_s3 as S3,
  aws_s3_deployment as S3Deployment,
  aws_cloudfront as CloudFront,
  aws_cloudfront_origins as CloudFrontOrigins,
  aws_dynamodb as DynamoDB,
  aws_lambda as Lambda,
  aws_lambda_event_sources as LambdaEventSources,
  aws_iam as IAM,
  aws_apigateway as ApiGateway,
  aws_timestream as TimeStream,
  // aws_apigatewayv2 as ApiGateway2,
  aws_sqs as SQS,
  aws_sns as SNS,
  RemovalPolicy,
  CfnOutput,
  Fn,
  Duration,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'


// define properties for webapp stack
export interface WebappProps extends StackProps {

  /** @param {string} assetsPath where the website is located */
  assetsPath: string
}


// {{replaceme}}
export class WebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: WebappProps) {
    super(scope, id, props)
    // [ ] 1.1.1: create S3 Bucket as web hosting to store webapp [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-s3-readme.html)
    // [ ] 1.2.1: create CloudFront distribution [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudfront-readme.html)
    // [o] 1.3.1: create Route 53 record set [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-route53-readme.html)

  }
}


export class RestApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    // [how to import value from other stack](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.Fn.html#static-importwbrvaluesharedvaluetoimport)

    // [ ] 3.1.2: connect api to dynamodb [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-dynamodb.Table.html#static-fromwbrtablewbrarnscope-id-tablearn)
    
    // [ ] 2.1.1: create lambdas for getOrders [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)
    // [ ] 2.1.2: create lambdas for createOrder [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)
    // [ ] 2.1.3: create lambdas for updateOrder [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)
    
    // [ ] 2.2.1: create api [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.RestApi.html)
    // [ ] 2.2.2: create /orders resource [POST, GET] [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.IResource.html#addwbrmethodhttpmethod-target-options)
    // [ ] 2.2.3: create /orders/{customer}/{id} [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.IResource.html#addwbrresourcepathpart-options)

    // [ ] 3.1.2: allow lambda to access dynamodb table

  }
}




export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const timeToLiveAttribute = '_expireOn'

    // [ ] 3.1.1: create DynamoDB orders table [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-dynamodb-readme.html)
    // [ ] 3.1.2 export table arn [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.CfnOutput.html)
  
    // [ ] 4.1.1: create processing orders queue [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-sqs.Queue.html)
    // [ ] 4.1.2: create user notification topic (sns) [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-sns.Topic.html)
    
    // [ ] 4.2.1: create a lambda to handle dynamodb stream [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)
    // [ ] 4.2.2: create a lambda to handle sqs messages [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)
    
    // [ ] 4.3.1: set lambda 4.2.1 as handler for dynamodb table updates [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html#addwbreventwbrsourcesource)
    // [ ] 4.3.2: set lambda 4.2.2 as handler for sqs queue messages [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-lambda-event-sources-readme.html)
    

  }
}