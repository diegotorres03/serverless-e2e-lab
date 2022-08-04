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
        
        # [x] 2.1.2: create lambdas for createOrder
        create_orders_lambda = lambda_.Function(self, 'createOrder',
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler='index.handler',
            code=lambda_.Code.from_asset('../functions/create-order'),
        )
        # 3.1.2
        # create_orders_lambda.add_environment('ORDERS_TABLE', orders_table.table_name)
        # orders_table.grant_read_write_data(create_orders_lambda)
        CfnOutput(self, 'create_orders_lambda', value= create_orders_lambda.function_name)


        
        # [x] 2.1.3: create lambdas for updateOrder
        update_orders_lambda = lambda_.Function(self, 'updateOrder',
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler='index.handler',
            code=lambda_.Code.from_asset('../functions/update-order')
        )
        # 3.1.2
        # update_orders_lambda.add_environment('ORDERS_TABLE', orders_table.table_name)
        # orders_table.grant_read_write_data(update_orders_lambda)
        CfnOutput(self, 'update_orders_lambda', value= update_orders_lambda.function_name)

    

        
        # [ ] 3.1.2: grant lambda access to dynamo table 

        # [ ] 5.1.1 create authenticate lambda function
        
        # [ ] 2.2.1: create api

        # [ ] 5.1.2 create an endpoint fot authentication
        # [ ] 5.2.2 add authorizer to private endpoints
        
        # [ ] 2.2.2: create /orders resource [POST, GET]
        # [ ] 2.2.3: create /orders/{customer}/{id}


