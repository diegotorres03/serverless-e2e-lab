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
        
        
        // [x] 2.1.1: create lambdas for getOrders
        const getOrdersLambda = new Lambda.Function(this, 'getOrders', {
            runtime: Lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: Lambda.Code.fromAsset('../functions/get-orders'),
            environment: { /* 3.1.2 */ }
        })
        new CfnOutput(this, 'getOrdersLambda', { value: getOrdersLambda.functionName })

        
        // [x] 2.1.2: create lambdas for createOrder
        const createOrderLambda = new Lambda.Function(this, 'createOrder', {
            runtime: Lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: Lambda.Code.fromAsset('../functions/create-order'),
            environment: {  /* 3.1.2 */  }
        })
        new CfnOutput(this, 'createOrderLambda', { value: createOrderLambda.functionName })


        
        // [x] 2.1.3: create lambdas for updateOrder
        const updateOrderLambda = new Lambda.Function(this, 'updateOrder', {
            runtime: Lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: Lambda.Code.fromAsset('../functions/update-order'),
            environment: { /* 3.1.2 */ }
        })
        new CfnOutput(this, 'updateOrderLambda', { value: updateOrderLambda.functionName })


        
        // [ ] 3.1.2: grant lambda access to dynamo table

        // [ ] 5.1.1 create authenticate lambda function
        
        // [ ] 2.2.1: create api
        
        // [ ] 5.1.2 create an endpoint fot authentication
        // [ ] 5.2.2 add authorizer to private endpoints
        
        // [ ] 2.2.2: create /orders resource [POST, GET]
        // [ ] 2.2.3: create /orders/{customer}/{id}

    }
}
