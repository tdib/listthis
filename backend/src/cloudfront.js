const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
  region: process.env.aws_default_region,
  accessKeyId: process.env.aws_cf_access_key_id,
  secretAccessKey: process.env.aws_cf_secret_access_key,
})
const cfClient = new AWS.CloudFront()
const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID

const getDistributionDomain = async () => {
  const params = {
    Id: CLOUDFRONT_DISTRIBUTION_ID,
  }

  const distribution = await cfClient.getDistribution(params).promise()
  const distributionDomain = distribution.DomainName
  return distributionDomain
}

module.exports = {
  getDistributionDomain,
}
