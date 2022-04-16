const AWS = require('aws-sdk')
require('dotenv').config()

// Set configuration to use credentials in given region
AWS.config.update({
  region: process.env.aws_default_region,
  accessKeyId: process.env.aws_s3_access_key_id,
  secretAccessKey: process.env.aws_s3_secret_access_key,
  // creds,
})

const s3Client = new AWS.S3()
const IMAGES_BUCKET = 'listthis-images'

const uploadImage = async ({ img }) => {
  const fileContent = Buffer.from(img.data, 'binary')

  const params = {
    Bucket: IMAGES_BUCKET,
    Key: img.name,
    Body: fileContent,
  }

  return await s3Client.upload(params).promise()
}

module.exports = {
  uploadImage,
}
