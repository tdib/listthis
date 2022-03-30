const AWS = require('aws-sdk')
require('dotenv').config()

// Set up credentials using access key id and secret access key
const creds = new AWS.Credentials({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
})

// Set configuration to use credentials in given region
AWS.config.update({
  region: process.env.aws_default_region,
  creds,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'BuyThis4Me'

const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  }

  const items = await dynamoClient.scan(params).promise()
  return items
}

// Adds item to list (if id is new)
// Updates item in list (if id exists)
const addOrUpdateItem = async item => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  }
  return await dynamoClient.put(params).promise()
}

const deleteItem = async id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  }
  return await dynamoClient.delete(params).promise()
}

module.exports = {
  dynamoClient,
  getAllItems,
  addOrUpdateItem,
  deleteItem,
}
