#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { WebAppStack } from '../lib/webapp-stack'
// imports
import { IConstruct } from 'constructs'

const app = new cdk.App()

const region = process.env.AWS_REGION

// creating WebAppStack
const webapp = new WebAppStack(app, 'webapp', {
  env: { region },
  assetsPath: '../webapp'
})

// creating RestApiStack

// creating BackendStack

// [ ] 5.4.1  define Policy Boundary
// [ ] 5.4.2 attach boundary to all constructs