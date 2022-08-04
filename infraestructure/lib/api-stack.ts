import {
    Stack,
    StackProps,
    aws_dynamodb as DynamoDB,
    aws_lambda as Lambda,
    aws_iam as IAM,
    aws_apigateway as ApiGateway,
    aws_ec2 as EC2,
    CfnOutput,
    Fn,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class RestApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)


        // [import value](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.Fn.html#static-importwbrvaluesharedvaluetoimport)
        // [ ] 3.1.2: connect api to dynamodb
        
        // [ ] 2.1.1: create lambdas for getOrders
        // [ ] 2.1.2: create lambdas for createOrder
        // [ ] 2.1.3: create lambdas for updateOrder
        
        // [ ] 3.1.2: grant lambda access to dynamo table

        // [ ] 5.1.1 create authenticate lambda function
        
        // [ ] 2.2.1: create api
        
        // [ ] 5.1.2 create an endpoint fot authentication
        // [ ] 5.2.2 add authorizer to private endpoints
        
        // [ ] 2.2.2: create /orders resource [POST, GET]
        // [ ] 2.2.3: create /orders/{customer}/{id}

    }
}
