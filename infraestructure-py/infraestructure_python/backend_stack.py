from aws_cdk import (
    # Duration,
    CfnOutput,
    Duration,
    Environment,
    Stack,
    aws_dynamodb as dynamo,
    aws_timestream as timestream,
    aws_lambda as lambda_,
    aws_lambda_event_sources as lambda_event_sources,
    aws_sqs as sqs,
    aws_sns as sns,
    # imports
    RemovalPolicy
)
from constructs import Construct

class BackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        time_to_live_attribute = '_expireOn'

        # [ ] 3.1.1: create DynamoDB orders table
        # [ ] 3.1.2: connect api to dynamodb
        # [ ] 4.1.1: create processing orders queue
        # [ ] 4.1.2: create user notification topic (sns)
        # [ ] 4.2.1: create a lambda to handle dynamodb stream
        # [ ] 4.2.2: create a lambda to handle sqs messages
        # [ ] 4.3.1: set lambda 4.2.1 as handler for dynamodb table updates
        # [ ] 4.3.2: set lambda 4.2.2 as handler for sqs queue messages


