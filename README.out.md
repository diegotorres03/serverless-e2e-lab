
# Serverless E2E

**Index:**
1. **Webapp:**
    1. **Hosting (S3):** where to store app assets?
       1. [x] 1.1.1: create S3 Bucket as web hosting to store webapp 
       2. [x] 1.1.2: add command to update web assets in S3
    2. **CDN (CloudFront):** How to distribute assets across the globe?
       1. [x] 1.2.1: create CloudFront distribution
       2. [x] 1.2.2: add command to invalidate cloudfront distribution
    3. **DNS (Route53):** how to set up DNS? -- optional
       1. [o] {{1.3.1}}
2. **REST API:**
    1. **handlers**
       1. [x] 2.1.1: create lambdas for getOrders
       2. [ ] 2.1.2: create lambdas for createOrder
       3. [ ] 2.1.3: create lambdas for updateOrder
    2. **API (CDK/ClaudiaJS):**
       1. [ ] 2.2.1: create api
       2. [ ] 2.2.2: create /orders resource [POST, GET]
       3. [ ] 2.2.3: create /orders/{customer}/{id}
    3. **webapp**
       1. [ ] 2.3.1: get orders from api
       2. [ ] 2.3.2: send the order to the api
       
       