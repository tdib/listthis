const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
  region: process.env.listthis_aws_default_region,
  accessKeyId: process.env.listthis_aws_cf_access_key_id,
  secretAccessKey: process.env.listthis_aws_cf_secret_access_key,
})
const cfClient = new AWS.CloudFront()
const CLOUDFRONT_DISTRIBUTION_ID = process.env.listthis_aws_cf_distribution_id

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
