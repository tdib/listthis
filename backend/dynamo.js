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

const createNewList = async ({ id, name }) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: id,
      name: name,
      items: [],
    },
    // name: 'hello',
    // note: 'world',
    // authorId: 'me',
    // isChecked: false,
    // dateAdded: 'xfdf',
    // imageURL: 'fdasf',
  }

  return await dynamoClient.put(params).promise()
}

const getListByID = async id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  }

  return await dynamoClient.get(params).promise()
}

const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  }

  const items = await dynamoClient.scan(params).promise()
  return items
}

// Adds item to list (if id is new)
// Updates item in list (if id exists)
// TODO: work with id nesting
const addOrUpdateItem = async ({ id, item }) => {
  const params = {
    TableName: TABLE_NAME,
    // Item: item,
    Item: {
      id: id,
      items: {},
    },
  }
  return await dynamoClient.put(params).promise()
}

const updateList = async list => {
  const params = {
    TableName: TABLE_NAME,
    List: list,
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
  createNewList,
  getAllItems,
  getListByID,
  addOrUpdateItem,
  updateList,
  deleteItem,
}
