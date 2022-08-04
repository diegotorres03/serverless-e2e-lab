from aws_cdk import (
    Stack,
    CfnOutput,
    RemovalPolicy,
    aws_s3 as s3,
    # imports
)
from constructs import Construct

class WebappStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        
        # [ ] 1.1.1: create S3 Bucket as web hosting to store webapp
        # [ ] 1.2.1: create CloudFront distribution



    # Duration,
    # aws_cloudfront as cloudfront,
    # aws_cloudfront_origins as cloudfront_origins,