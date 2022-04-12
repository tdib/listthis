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
const USERS_TABLE = 'users'

// Create empty list
const createNewList = async ({ listID, listName, userID }) => {
  const params = {
    TableName: LISTS_TABLE,
    Item: {
      id: listID,
      name: listName,
      items: [],
    },
  }

  // Link current user to list
  await associateListIDwithUser({ listID, userID })

  return await dynamoClient.put(params).promise()
}

// Link a list ID with a user ID
const associateListIDwithUser = async ({ listID, userID }) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userID: userID,
    },
    UpdateExpression: 'SET associatedListIDs = list_append(associatedListIDs, :newListID)',
    ExpressionAttributeValues: {
      ':newListID': [listID],
    },
  }

  return await dynamoClient.update(params).promise()
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

// Adds item to list
const addItemToList = async ({ listID, item }) => {
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      id: listID,
    },
    UpdateExpression: 'SET #attrName = list_append(#attrName, :newItem)',
    ExpressionAttributeNames: {
      '#attrName': 'items',
    },
    ExpressionAttributeValues: {
      ':newItem': [item],
    },
  }

  return await dynamoClient.update(params).promise()
}

//
const getListsByUserID = async userID => {
  const params = {
    TableName: USERS_TABLE,
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

  return associatedLists
}

const getListsByListIDs = async listIDs => {
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
  // TODO: investigate doing this directly through dynamo
  const listsByID = allLists.filter(list => listIDs.includes(list.id))
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
  addItemToList,
  updateList,
  deleteItem,
}
