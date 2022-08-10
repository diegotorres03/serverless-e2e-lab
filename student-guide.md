# Requirements:
In order to properly run this lab, we will require the following applications:
- [Powershell v7](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2)
- [Node.js v14](https://nodejs.org/en/download/)
- [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)
- [Git client](https://git-scm.com/download/win)



# Before the lab
1. clone [Serverless-e2e-lab](https://github.com/diegotorres03/serverless-e2e-lab) by running `git clone https://github.com/diegotorres03/serverless-e2e-lab.git`  in Powershell.
2. 

---

# 1.1.1: `create S3 Bucket as web hosting to store webapp`

**description:** In this task, you are required to create an [Amazon S3](https://aws.amazon.com/s3/) bucket to store the static assets for your web application. Then create a bucket deployment to deploy the initial version of the web application. 

**go to files:** [ts](./infraestructure/lib/webapp-stack.ts) | [py](./infraestructure-py/infraestructure_python/webapp_stack.py)


**documentaion:**
- AWS CDK S3 Bucket [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3-readme.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_s3.html)

- AWS CDK S3 Deployment [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_deployment-readme.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_s3_deployment.html)























---

# 1.1.2: `add command to update web assets in S3`

**description:** Once our bucket is created, we need a way to allow our web developers to publish their code without re-deploying infraestructure, for this we will be using the AWS CLI to copy local files in to the desired bucket. 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- [AWS CLI S3](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) 





---


# 1.2.1: `create CloudFront distribution`

**description:** Now that the webapp is stored on a bucket, we need a way to make it accesible from the web. Instead mo making the bucket publick, we will leverage [Amazon CloudFront](https://aws.amazon.com/cloudfront/), wich is a Content Delivery Netwerk (CDN).
So now we need to create a cloudfront origin and a cloudfront distribution.
The origin will point to the `index.html` inside the bucket, then inside the distribution add this origin so cloudfront will know where to get the assets.


**go to files:** [ts](./infraestructure/lib/webapp-stack.ts) | [py](./infraestructure-py/infraestructure_python/webapp_stack.py)


**documentaion:**
- Cloudfront Origin Access Identity [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.OriginAccessIdentity.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_cloudfront/OriginAccessIdentity.html) 
- Cloudfront Distribution [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.Distribution.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_cloudfront/Distribution.html)












---

# 1.2.2: `add command to invalidate cloudfront distribution`


**description:** Since Cloudfront create a cache with the webapp and replicate it across the glove. We need to delete that cache when a new version is released in order to see instantly the new version online.
Use the AWS CLI to create an invalidation.


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- [Create Invalidation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/create-invalidation.html) 





_note: then next updates are set up for next chapter_


















---

# 2.1.1: `create lambdas for getOrders`


**description:** Now we will create the api that will handle all the orders from our webapp.
First we need to create thelambda functions that will handle each individual api route.
Let's begin with the `getOrders` function, on the CDK file, create a lambda function and set the code path to `../functions/get-orders`.


_runtime:_ `node 14`


**go to files:** [js](./functions/get-orders/index.js)


**documentaion:**
- Lambda Function  [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html) 











---

# 2.1.2: `create lambdas for createOrder`


**description:** Let's now create the `createOrder` function, on the CDK file, create a lambda function and set the code path to `../functions/create-order`.


_runtime:_ `node 14`


**go to files:** [js](./functions/create-order/index.js)


**documentaion:**
- Lambda Function  [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html) 









---

# 2.1.3: `create lambdas for updateOrder`


**description:** Let's create the last function `updateOrder`, on the CDK file, create a lambda function and set the code path to `../functions/update-order`.


_runtime:_ `node 14`


**go to files:** [js](./functions/update-order/index.js)

**documentaion:**
- Lambda Function [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html) 










---

# 2.2.1: `create api`


**description:** Great Job! we jsut created all the lambda functions required to list, create and update orders. Now we need a way to call those functions.
To achieve this, we will create a Rest API using [Amazon API Gateway](https://aws.amazon.com/api-gateway/)


**go to files:** [ts](./infraestructure/lib/api-stack.ts) | [py](./infraestructure-py/infraestructure_python/api_stack.py)


**documentaion:**
- Rest API [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.RestApi.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/RestApi.html) 










---

# 2.2.2: `create /orders resource [POST, GET]`


**description:** Our Api is ready, let's add `/orders` resource with 2 methods [`POST`, `GET`]. 


**go to files:** [ts](./infraestructure/lib/api-stack.ts) | [py](./infraestructure-py/infraestructure_python/api_stack.py)


**documentaion:**
- API Resource [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.Resource.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/Resource.html)
- API Resource Method [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.Method.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/Method.html)
- API Lambda Integration [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.LambdaIntegration.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/LambdaIntegration.html)











---

# 2.2.3: `create /orders/{customer}/{id}`


**description:** Now, we are just missing the endpoint `/orders/{customer}/{id}`, here we will make [`PATCH`] request to update an order, 


**go to files:** [ts](./infraestructure/lib/api-stack.ts) | [py](./infraestructure-py/infraestructure_python/api_stack.py)


**documentaion:**
- API Resource [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.Resource.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/Resource.html)
- API Resource Method [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.Method.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/Method.html)
- API Lambda Integration [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.LambdaIntegration.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_apigateway/LambdaIntegration.html)











---

# 2.3.1: `get orders from api`


**description:** Now let's connect the webapp and the newly created api.
Here we want to start by listing all the orders by doing a get request to the `getOrders` endpoint.


**go to files:** [js](./webapp/src/main.js)


**documentaion:**
- [js fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 






---

# 2.3.2: `send the order to the api`


**description:** Now, we want to be able to send a new order to the api, we will use the same JS Fetch api to `POST` the new order.


**go to files:** [js](./webapp/src/main.js)


**documentaion:**
- [js fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 






_note: then next updates are set up for next chapter_




















---

# 3.1.1: `create DynamoDB orders table`


**description:** So far, we have been simulating the creation and listing of orders, but we don't have a place to store them, let's now create a [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) Table. 
Important to keep in mind, lets create a partitionKey key `customer` and a sort key `id`, both strigs.
We also need to specify a `timeToLiveAttribute` that you will find as a variable on the file.
And finnaly, add a Stream by specifying the `stream` property on the Table constructor, we want to use `NEW_AND_OLD_IMAGES` value from `StreamViewType`.


**go to files:** [ts](./infraestructure/lib/backend-stack.ts) | [py](./infraestructure-py/infraestructure_python/backend_stack.py)


**documentaion:**
- DynamoDB Table [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_dynamodb.Table.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_dynamodb/Table.html) 
- [How it works: DynamoDB Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/howitworks-ttl.html)











---

# 3.1.2: `connect api to dynamodb`


**description:** Now that or Table is created, we need to do some steps in order to use it on the api.
Orders table was declared on `backend stack` but we will need a reference on `api stack`, to achieve this, we need to export the table arn and or table name.
Once exported, we will need to import it on the `api stack` and pass the `tableName` value as enviroment variable for `getOrders` `createOrder` and `updateOrder` functions.
Don't forget to grant read, write access crom dynamo to the respective lambda function.


**go to files:** 
- Backend Stack [ts](./infraestructure/lib/backend-stack.ts) | [py](./infraestructure-py/infraestructure_python/backend_stack.py)
- Api Stack [ts](./infraestructure/lib/api-stack.ts) | [py](./infraestructure-py/infraestructure_python/api_stack.py)


**documentaion:**
- export CfnOutput [TypeScript](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.CfnOutput.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk/CfnOutput.html)
- import value [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Fn.html) | [Python](https://docs.aws.amazon.com/cdk/api/v1/python/aws_cdk.core/Fn.html)
- Lambda enviroment variables [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html#environment) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html#aws_cdk.aws_lambda.Function.add_environment)






























---

# 3.2.1: `use table on getOrders - get all orders from dynamodb`


**description:** now that table and lambdas are connected, and proper access control is in place, let's run a `scan` to get the current orders


**go to files:** [js](./functions/get-orders/index.js)


**documentaion:**
- [AWS SDK DynamoDB.DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) 






---

# 3.2.2: `use table on createOrder - put order on dynamodb table`


**description:** you know the drill. Perform a `put` operation on `ordersTable` to create the new order.


**go to files:** [js](./functions/create-order/index.js)


**documentaion:**
- [AWS SDK DynamoDB.DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)






---

# 3.2.3: `use table on updateOrder - update an order on dynamodb table`


**description:** last step, let's `update` an order on `updateOrder` function.


**go to files:** [js](./functions/update-order/index.js)


**documentaion:**
- [AWS SDK DynamoDB.DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)






---

# 4.1.1: `create processing orders queue`


**description:** In this chapter we will se how to enable our opperation team to queue orders andnotify the user about the status of their meal.
First, lets create an [SQS Queue](https://aws.amazon.com/sqs/)


**go to files:** [TypeScript](./infraestructure/lib/backend-stack.ts) | [Python](./infraestructure-py/infraestructure_python/backend_stack.py)


**documentaion:**
- AWS SQS Queue [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.Queue.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_sqs/Queue.html) 











---

# 4.1.2: `create user notification topic (sns)`


**description:** An [SNS Topic](https://aws.amazon.com/sns/)


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- AWS SNS Topic [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns.Topic.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_sns/Topic.html)











---

# 4.2.1: `create a lambda to handle dynamodb stream`


**description:** . 


**go to files:** [TypeScript](./infraestructure/lib/backend-stack.ts) | [Python](./infraestructure-py/infraestructure_python/backend_stack.py)



**documentaion:**
- Lambda Function [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html) 










---

# 4.2.2: `create a lambda to handle sqs messages`


**description:** . 


**go to files:** [TypeScript](./infraestructure/lib/backend-stack.ts) | [Python](./infraestructure-py/infraestructure_python/backend_stack.py)


**documentaion:**
- Lambda Function [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html) 
  










---

# 4.3.1: `set lambda 4.2.1 as handler for dynamodb table updates`


**description:** . 


**go to files:** [TypeScript](./infraestructure/lib/backend-stack.ts) | [Python](./infraestructure-py/infraestructure_python/backend_stack.py)


**documentaion:**
- Lambda event sources [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_event_sources-readme.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda_event_sources.html) 










---

# 4.3.2: `set lambda 4.2.2 as handler for sqs queue messages`


**description:** . 


**go to files:** [TypeScript](./infraestructure/lib/backend-stack.ts) | [Python](./infraestructure-py/infraestructure_python/backend_stack.py)


**documentaion:**
- Lambda event sources [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_event_sources-readme.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda_event_sources.html) 









_note: then next updates are set up for next chapter_



---

# 5.1.1: `create authenticate lambda function`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- Lambda Function [TypeScript](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) | [Python](https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.aws_lambda/Function.html) 






---

# 5.1.2: `create an endpoint fot authentication`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- topic [TypeScript]() | [Python]() 






---

# 5.2.1: `create the custom authorizer`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- topic [TypeScript]() | [Python]() 






---

# 5.2.2: `add authorizer to private endpoints`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- topic [TypeScript]() | [Python]() 






---

# 5.3.1: `use `Authorization` header on http getOrders`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- [AWS CLI S3](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) 






---

# 5.3.1: `use `Authorization` header on http createOrder`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- [AWS CLI S3](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) 






---

# 5.4.1: `define Policy Boundary`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- [AWS CLI S3](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) 






---

# 5.4.2: `attach boundary to all constructs`


**description:** . 


**go to files:** [ps1](./webapp/deploy.ps1)


**documentaion:**
- [AWS CLI S3](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) 



