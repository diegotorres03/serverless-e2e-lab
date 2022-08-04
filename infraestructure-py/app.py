#!/usr/bin/env python3
import os
import aws_cdk as cdk

from infraestructure_python.webapp_stack import WebappStack

    from infraestructure_python.api_stack import ApiStack
    # imports



region = os.environ['AWS_REGION'] or 'us-east-2'

app = cdk.App()

# creating WebAppStack
webapp = WebappStack(app, 'webapp-py', env=cdk.Environment(region=region))


    # creating RestApiStack
    api = ApiStack(app, 'api-py', env=cdk.Environment(region=region))


# creating BackendStack

app.synth()
