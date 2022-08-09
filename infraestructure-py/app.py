#!/usr/bin/env python3
import os
import aws_cdk as cdk

from infraestructure_python.webapp_stack import WebappStack
# imports


region = os.environ['AWS_REGION'] or 'us-east-2'

app = cdk.App()

# creating WebAppStack
webapp = WebappStack(app, 'webapp', env=cdk.Environment(region=region))

# creating RestApiStack

# creating BackendStack

app.synth()
