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
const LISTS_TABLE = 'lists'
const USER_TABLE = 'users'

// Create empty list
const createNewList = async ({ id, name }) => {
  // TODO: link list to user who created it
  const params = {
    TableName: LISTS_TABLE,
    Item: {
      id: id,
      name: name,
      items: [],
    },
  }

  return await dynamoClient.put(params).promise()
}

const getListByID = async id => {
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      id: id,
    },
  }

  return await dynamoClient.get(params).promise()
}

// const getAllItems = async () => {
//   const params = {
//     TableName: LISTS_TABLE,
//   }

//   const items = await dynamoClient.scan(params).promise()
//   return items
// }

// Adds item to list (if id is new)
// Updates item in list (if id exists)
// TODO: work with id nesting
const addOrUpdateItem = async ({ id, item }) => {
  // TODO: work with multiple lists
  const params = {
    TableName: LISTS_TABLE,
    // Item: item,
    Item: {
      id: id,
      items: {},
    },
  }
  return await dynamoClient.put(params).promise()
}

//
const getListsByUserID = async userID => {
  const params = {
    TableName: USER_TABLE,
    Key: {
      userID: userID,
    },
  }

  // Get associated list ids from user
  const {
    Item: { associatedListIDs },
  } = await dynamoClient.get(params).promise()

  // Return list of lists extracted from associated ids
  // const { Items: associatedLists } = await getListsByListIDs(associatedListIDs)
  const associatedLists = await getListsByListIDs(associatedListIDs)

  console.log('(dynamo) associated lists:', associatedLists)

  return associatedLists
}

const getListsByListIDs = async listIDs => {
  console.log(listIDs)
  const params = {
    TableName: LISTS_TABLE,
    // KeyConditionExpression: 'id = :listid',
    // ExpressionAttributeValues: {
    //   ':listid': 'list1id',
    // },
  }
  // Get all lists from database
  const { Items: allLists } = await dynamoClient.scan(params).promise()

  // Filter lists by id
  const listsByID = allLists.filter(list => listIDs.includes(list.id))
  console.log(listsByID)
  return listsByID
}

const updateList = async list => {
  const params = {
    TableName: LISTS_TABLE,
  }
  return await dynamoClient.put(params).promise()
}

const deleteItem = async id => {
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      id,
    },
  }
  return await dynamoClient.delete(params).promise()
}

module.exports = {
  dynamoClient,
  createNewList,
  getListsByUserID,
  getListByID,
  addOrUpdateItem,
  updateList,
  deleteItem,
}
