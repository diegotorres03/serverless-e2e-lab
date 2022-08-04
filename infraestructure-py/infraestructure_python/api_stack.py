from aws_cdk import (
    # Duration,
    CfnOutput,
    Environment,
    Stack,
    aws_lambda as lambda_,
    aws_apigateway as apigateway,
    aws_dynamodb as dynamo,
    # imports
    RemovalPolicy,
    Fn
)
from constructs import Construct

class ApiStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # [import value](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk/Fn.html#aws_cdk.Fn.import_value)
        # [add env variables to lambda](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html#aws_cdk.aws_lambda.Function.add_environment)
       
        # [ ] 3.1.2: connect api to dynamodb
        
        # [ ] 2.1.1: create lambdas for getOrders
        # [ ] 2.1.2: create lambdas for createOrder
        # [ ] 2.1.3: create lambdas for updateOrder
        
        # [ ] 3.1.2: grant lambda access to dynamo table 

        # [ ] 5.1.1 create authenticate lambda function
        
        # [ ] 2.2.1: create api

        # [ ] 5.1.2 create an endpoint fot authentication
        # [ ] 5.2.2 add authorizer to private endpoints
        
        # [ ] 2.2.2: create /orders resource [POST, GET]
        # [ ] 2.2.3: create /orders/{customer}/{id}


