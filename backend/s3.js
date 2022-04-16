const AWS = require('aws-sdk')
require('dotenv').config()
const contentDisposition = require('content-disposition')

// Set configuration to use credentials in given region
AWS.config.update({
  region: process.env.aws_default_region,
  accessKeyId: process.env.aws_s3_access_key_id,
  secretAccessKey: process.env.aws_s3_secret_access_key,
  // creds,
})

const s3Client = new AWS.S3()
const IMAGES_BUCKET = 'listthis-images'

const uploadImage = async ({ imgID, img }) => {
  const fileContent = Buffer.from(img.data, 'binary')

  const params = {
    Bucket: IMAGES_BUCKET,
    Key: imgID,
    ContentType: img.mimeType,
    Body: fileContent,
    ContentDisposition: contentDisposition(img.name, {
      type: 'inline',
    }),
  }

  return await s3Client.upload(params).promise()
}

const deleteImage = async ({ imgURL, imgID }) => {
  if (imgURL) {
    // Extract image ID/key from URL
    imgID = imgURL.substring(imgURL.lastIndexOf('/') + 1)
  }

  const params = {
    Bucket: IMAGES_BUCKET,
    Key: imgID,
  }

  return await s3Client.deleteObject(params).promise()
}

module.exports = {
  uploadImage,
  deleteImage,
}
