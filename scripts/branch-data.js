const branchData = {

  '1.1.1': {
    branch: `git checkout ch1.1.1`,
    todo: '1.1.1',
    task: 'create S3 Bucket as web hosting to store webapp [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-s3-readme.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const webappBucket = new S3.Bucket(this, 'webapp-artifact', {
        accessControl: S3.BucketAccessControl.PRIVATE,
        cors: [{
            allowedMethods: [S3.HttpMethods.GET],
            allowedOrigins: ['*'],

            // the properties below are optional
            allowedHeaders: ['Authorization'],
            exposedHeaders: [],
        }],
        removalPolicy: RemovalPolicy.DESTROY,
    })

    const webappDeployment = new S3Deployment.BucketDeployment(this, 'deployStaticWebapp', {
        sources: [S3Deployment.Source.asset(props?.assetsPath || '../webapp')],
        destinationBucket: webappBucket,
    })
    
    // export bucket Name
    new CfnOutput(this, 'webappBucketName', {
      value: webappBucket.bucketName,
      exportName: 'webappBucketName'
    })
`
    }, {
      path: './infraestructure/lib/infraestructure-stack.ts',
      key: '{{replaceme}}',
      value: 'this was replaced successfully'
    }]
  },
  '1.1.2': {
    branch: `git checkout ch1.1.2`,
    todo: '1.1.2',
    task: 'add command to update web assets in S3 [docs](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)',
    content: [
      {
        path: './webapp/deploy.sh',
        value: `aws s3 cp . s3://your-s3-bucket --recursive`
      },
      {
        path: './webapp/deploy.ps1',
        value: `aws s3 cp . s3://your-s3-bucket --recursive`
      },
    ]
  },
  '1.2.1': {
    branch: `git checkout ch1.2.1`,
    todo: '1.2.1',
    task: 'create CloudFront distribution [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudfront-readme.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const originAccessIdentity = new CloudFront.OriginAccessIdentity(this, 'OriginAccessIdentity')
    // allow clowdfront to read s3 webpp files
    webappBucket.grantRead(originAccessIdentity)

    const cdnDistribution = new CloudFront.Distribution(this, 'WebappDistribution', {
        defaultRootObject: 'index.html',

        defaultBehavior: {
        origin: new CloudFrontOrigins.S3Origin(webappBucket, { originAccessIdentity })
        }
    })
  
    // export webapp dns url
    new CfnOutput(this, 'webappDnsUrl', {
      value: cdnDistribution.distributionDomainName,
      exportName: 'webappDnsUrl'
    })
  `
    }]
  },
  '1.2.2': {
    branch: `git checkout ch1.2.2`,
    todo: '1.2.2',
    task: 'add command to invalidate cloudfront distribution [docs](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html)',
    content: [      {
        path: './webapp/deploy.sh',
        value: `cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths '/*'`
      },
      {
        path: './webapp/deploy.ps1',
        value: `cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths '/*'`
      }, {
        path: './infraestructure/bin/infraestructure.ts',
        key: `// import more CDK constructs here`,
        value: `RestApiStack,
    // import more CDK constructs here`,
      }, {
        path: './infraestructure/bin/infraestructure.ts',
        key: '// creating RestApiStack',
        value: `// creating RestApiStack
  const restApi = new RestApiStack(app, 'api', {
      env: {
      region: process.env.AWS_REGION,
    }
  })`,
      }]
  },
  '2.1.1': {
    branch: `git checkout ch2.1.1`,
    todo: '2.1.1',
    task: 'create lambdas for getOrders [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const getOrdersLambda = new Lambda.Function(this, 'getOrders', {
        runtime: Lambda.Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: Lambda.Code.fromAsset('../functions/get-orders'),
        // environment: { }
    })`,
    }]
  },
  '2.1.2': {
    branch: `git checkout ch2.1.2`,
    todo: '2.1.2',
    task: 'create lambdas for createOrder [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const createOrderLambda = new Lambda.Function(this, 'createOrder', {
        runtime: Lambda.Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: Lambda.Code.fromAsset('../functions/create-order'),
        // environment: { }
    })`,
    }]
  },
  '2.1.3': {
    branch: `git checkout ch2.1.3`,
    todo: '2.1.3',
    task: 'create lambdas for updateOrder [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const updateOrderLambda = new Lambda.Function(this, 'updateOrder', {
            runtime: Lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: Lambda.Code.fromAsset('../functions/update-order'),
            // environment: { }
        })`,
    }]
  },
  '2.2.1': {
    branch: `git checkout ch2.2.1`,
    todo: '2.2.1',
    task: 'create api [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.RestApi.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const api = new ApiGateway.RestApi(this, 'orders-api', {
        description: 'handle api calls from webapp',
        deployOptions: { stageName: 'dev' },
        defaultCorsPreflightOptions: {
            allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
            ],
            allowOrigins: ['*'],
            allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowCredentials: true,
        }
    })

    // export api value so it can be called by other stacks
    new CfnOutput(this, 'apiUrl', {
        value: api.url,
        exportName: 'apiUrl'
    })
`,
    }]
  },
  '2.2.2': {
    branch: `git checkout ch2.2.2`,
    todo: '2.2.2',
    task: 'create /orders resource [POST, GET] [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.IResource.html#addwbrmethodhttpmethod-target-options)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const ordersEndpoint = api.root.addResource('orders')
    ordersEndpoint.addMethod('GET', new ApiGateway.LambdaIntegration(getOrdersLambda, { proxy: true }))
    ordersEndpoint.addMethod('POST', new ApiGateway.LambdaIntegration(createOrderLambda, { proxy: true }))
`,
    }]
  },
  '2.2.3': {
    branch: `git checkout ch2.2.3`,
    todo: '2.2.3',
    task: 'create /orders/{customer}/{id} [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.IResource.html#addwbrresourcepathpart-options)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const singleOrderEndpoint = ordersEndpoint.addResource('{customer}').addResource('{id}')
    singleOrderEndpoint.addMethod('PATCH', new ApiGateway.LambdaIntegration(updateOrderLambda, { proxy: true }))
        `,
    }]
  },
  '2.3.1': {
    branch: `git checkout ch2.3.1`,
    todo: '2.3.1',
    task: 'get orders from api [docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)',
    content: [{
      path: './webapp/index.html',
      value: `            const url = 'https://{{apiUrl}}/orders'
            return await fetch(url).then(res => res.json())
        `,
    }]
  },
  '2.3.2': {
    branch: `git checkout ch2.3.2`,
    todo: '2.3.2',
    task: 'send the order to the api [docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options)',
    content: [{
      path: './webapp/index.html',
      value: `            const url = 'https://{{apiUrl}}/orders'
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    id: Date.now().toString(),
                    customer: 'diegotrs',
                    items: items,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                const res = await fetch(url, options)
                const responseData = await res.json()
            } catch (err) {
                console.error(err)
            }
`,
    }, {
      path: './infraestructure/bin/infraestructure.ts',
      key: `// import more CDK constructs here`,
      value: `BackendStack,
  // import more CDK constructs here`,
    }, {
      path: './infraestructure/bin/infraestructure.ts',
      key: '// creating BackendStack',
      value: `// creating BackendStack
const backend = new BackendStack(app, 'backend', {
  env: {
    region: process.env.AWS_REGION,
  }
})`,
    }]
  },
  '3.1.1': {
    branch: `git checkout ch3.1.1`,
    todo: '3.1.1',
    task: 'create DynamoDB orders table [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-dynamodb-readme.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const ordersTable = new DynamoDB.Table(this, 'orders', {
        partitionKey: { name: 'customer', type: DynamoDB.AttributeType.STRING },
        sortKey: { name: 'id', type: DynamoDB.AttributeType.STRING },
        billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
        stream: DynamoDB.StreamViewType.NEW_AND_OLD_IMAGES,
        timeToLiveAttribute,
        removalPolicy: RemovalPolicy.DESTROY,
    })
`,
    }]
  },
  '3.1.2': {
    branch: `git checkout ch3.1.2`,
    todo: '3.1.2',
    task: 'connect api to dynamodb [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-dynamodb.Table.html#static-fromwbrtablewbrarnscope-id-tablearn)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const ordersTableArn = Fn.importValue('ordersTableArn')
    const ordersTable = DynamoDB.Table.fromTableArn(this, 'ordersTable', ordersTableArn)
`,
    }, {
      path: './infraestructure/lib/infraestructure-stack.ts',
      key: /\/\/ environment: { }/g,
      value: 'environment: { ORDERS_TABLE: ordersTable.tableName }',
    }, {
      path: './infraestructure/lib/infraestructure-stack.ts',
      key: '// [ ] 3.1.2: allow lambda to access dynamodb table',
      value: `// [x] 3.1.2: allow lambda to access dynamodb table      
    ordersTable.grantReadWriteData(createOrderLambda)
    ordersTable.grantReadWriteData(getOrdersLambda)
    ordersTable.grantReadWriteData(updateOrderLambda)
`,
    }, {
      path: './infraestructure/lib/infraestructure-stack.ts',
      key: '// [ ] 3.1.2 export table arn [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.CfnOutput.html)',
      value: `// [x] 3.1.2 export table arn [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.CfnOutput.html)
    new CfnOutput(this, 'ordersTableName', {
      value: ordersTable.tableName,
      exportName: 'ordersTableName'
    })
    new CfnOutput(this, 'ordersTableArn', {
      value: ordersTable.tableArn,
      exportName: 'ordersTableArn'
    })
`
    }]
  },
  '3.2.1': {
    branch: `git checkout ch3.2.1`,
    todo: '3.2.1',
    task: 'use table on getOrders - get all orders from dynamodb [docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)',
    content: [{
      path: './functions/create-order/index.js',
      value: `    const res = await dynamo.scan({
            TableName: ordersTable,
        }).promise()
        return {
            body: JSON.stringify(res.Items.map(item => new Order(item))),
            statusCode: 200,
        }`,
    }]
  },
  '3.2.2': {
    branch: `git checkout ch3.2.2`,
    todo: '3.2.2',
    task: 'use table on createOrder - save order on dynamodb table [docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)',
    content: [{
      path: './functions/create-order/index.js',
      value: `    await dynamo.put({
            TableName: ordersTable,
            Item: order
        }).promise()
        return {
            body: JSON.stringify(order),
            statusCode: 200,
        }`,
    }]
  },
  '3.2.3': {
    branch: `git checkout ch3.2.3`,
    todo: '3.2.3',
    task: 'use table on updateOrder - patch an order on dynamodb table [docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property)',
    content: [{
      path: './functions/create-order/index.js',
      value: `    const res = await dynamo.update({
                TableName: ordersTable,
                Key: {
                    id: orderId,
                    customer: cusotmer,
                },
                ExpressionAttributeNames: { '#status': 'status' },
                ExpressionAttributeValues: { ':status': status },
                UpdateExpression: \`set #status = :status\`,
            }).promise()
        
            return {
                body: JSON.stringify(res),
                statusCode: 200,
            }`,
    }]
  },
  '4.1.1': {
    branch: `git checkout ch4.1.1`,
    todo: '4.1.1',
    task: 'create processing orders queue [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-sqs.Queue.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: ``,
    }]
  },
  '4.1.2': {
    branch: `git checkout ch4.1.2`,
    todo: '4.1.2',
    task: 'create user notification topic (sns) [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-sns.Topic.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const ordersQueue = new SQS.Queue(this, 'ordersQueue', {
        visibilityTimeout: Duration.seconds(60)
    })
          `,
    }]
  },
  '4.2.1': {
    branch: `git checkout ch4.2.1`,
    todo: '4.2.1',
    task: 'create a lambda to handle dynamodb stream [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const dynamoLambda = new Lambda.Function(this, 'dynamoHandler', {
        runtime: Lambda.Runtime.NODEJS_14_X,
        code: Lambda.Code.fromAsset('../functions/dynamo-handler'),
        handler: 'index.handler',
        environment: {
            QUEUE: ordersQueue.queueUrl,
            TS_DB: '',
            TS_TABLE: '',
        },
    })
`,
    }]
  },
  '4.2.2': {
    branch: `git checkout ch4.2.2`,
    todo: '4.2.2',
    task: 'create a lambda to handle sqs messages [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    const sqsLambda = new Lambda.Function(this, 'sqsHandler', {
        runtime: Lambda.Runtime.NODEJS_14_X,
        code: Lambda.Code.fromAsset('../functions/sqs-handler'),
        handler: 'index.handler',
        environment: { QUEUE: ordersQueue.queueUrl },
    })
`,
    }]
  },
  '4.3.1': {
    branch: `git checkout ch4.3.1`,
    todo: '4.3.1',
    task: 'set lambda 4.2.1 as handler for dynamodb table updates [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.Function.html#addwbreventwbrsourcesource)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `
    // allow lambda to read dynamo stream 
    ordersTable.grantStreamRead(dynamoLambda)

    // add ordersTable as source for lambda
    dynamoLambda.addEventSource(new LambdaEventSources.DynamoEventSource(ordersTable, {
        startingPosition: Lambda.StartingPosition.TRIM_HORIZON,
        batchSize: 1,
    }))
`,
    }]
  },
  '4.3.2': {
    branch: `git checkout ch4.3.2`,
    todo: '4.3.2',
    task: 'set lambda 4.2.2 as handler for sqs queue messages [docs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-lambda-event-sources-readme.html)',
    content: [{
      path: './infraestructure/lib/infraestructure-stack.ts',
      value: `    // allow lambda to publish messages on queue
    ordersQueue.grantSendMessages(dynamoLambda)
    sqsLambda.addEventSource(new LambdaEventSources.SqsEventSource(ordersQueue, {
        batchSize: 2,
    }))
`,
    }]
  },
  '5.1.1': {
    branch: `git checkout ch5.1.1`,
    todo: '5.1.1',
    task: 'task',
    content: [{
      path: '',
      value: ``,
    }]
  },

}

module.exports = { branchData }