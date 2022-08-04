
# reading cdk output file
$WebappConfig=Get-Content -Raw -Path '..\webapp.json' | ConvertFrom-Json -Depth 4

# get bucket name from json and append s3:// then store that in a vble
$bucketName="s3://" + $WebappConfig.webapp.webappBucketName

# get distribution id from json and store it in a vble
$distributionId=$WebappConfig.webapp.distributionId

# copy webapp.json to webapp folder
Copy-Item -Path ..\api.json -Destination .

Write-Host 'Uploading assets to' + $bucketName
#  [ ] 1.1.2: add command to update web assets in S3


Write-Host 'Deleting cache for distribution id =' + $distributionId
#  [ ] 1.2.2: add command to invalidate cloudfront distribution
