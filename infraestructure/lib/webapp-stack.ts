import {
    Stack,
    StackProps,
    aws_s3 as S3,
    aws_s3_deployment as S3Deployment,
    aws_iam as IAM,
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
        
        // [ ] 1.1.1: create S3 Bucket as web hosting to store webapp
        // [ ] 1.2.1: create CloudFront distribution
        // [o] 1.3.1: create Route 53 record set

    }
}
