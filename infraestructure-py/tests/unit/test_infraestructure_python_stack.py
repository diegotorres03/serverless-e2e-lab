import aws_cdk as core
import aws_cdk.assertions as assertions

from infraestructure_python.infraestructure_python_stack import InfraestructurePythonStack

# example tests. To run these tests, uncomment this file along with the example
# resource in infraestructure_python/infraestructure_python_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = InfraestructurePythonStack(app, "infraestructure-python")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
