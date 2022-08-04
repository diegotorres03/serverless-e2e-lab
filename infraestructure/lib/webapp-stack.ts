import {
    Stack,
    StackProps,
    aws_s3 as S3,
    aws_s3_deployment as S3Deployment,
    aws_iam as IAM,
    
    aws_cloudfront as CloudFront,
    aws_cloudfront_origins as CloudFrontOrigins,
    // imports

    CfnOutput,
    RemovalPolicy,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'


// define properties for webapp stack
export interface WebappProps extends StackProps {

    /** @param {string} assetsPath where the website is located */
    assetsPath: string
}

export class WebAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: WebappProps) {
        super(scope, id, props)
        
        
        // [x] 1.1.1: create S3 Bucket as web hosting to store webapp
        const webappBucket = new S3.Bucket(this, 'webapp-artifact', {
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
        new CfnOutput(this, 'webappBucketName', { value: webappBucket.bucketName })


        
        // [x] 1.2.1: create CloudFront distribution
        const originAccessIdentity = new CloudFront.OriginAccessIdentity(this, 'OriginAccessIdentity')
        
        // allow clowdfront to read s3 webpp files
        webappBucket.grantRead(originAccessIdentity)

        const cdnDistribution = new CloudFront.Distribution(this, 'WebappDistribution', {
            defaultRootObject: 'index.html',

            defaultBehavior: {
                origin: new CloudFrontOrigins.S3Origin(webappBucket, { originAccessIdentity })
            }
        })
    
        // export webapp dns url
        new CfnOutput(this, 'webappDnsUrl', { value: cdnDistribution.distributionDomainName })
        new CfnOutput(this, 'distributionId', { value: cdnDistribution.distributionId })


        // [o] 1.3.1: create Route 53 record set

    }
}
