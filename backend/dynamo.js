const AWS = require('aws-sdk')
require('dotenv').config()

// Set up credentials using access key id and secret access key
// const creds = new AWS.Credentials({
//   accessKeyId: process.env.aws_ddb_access_key_id,
//   secretAccessKey: process.env.aws_ddb_secret_access_key,
// })

// Set configuration to use credentials in given region
AWS.config.update({
  region: process.env.aws_default_region,
  accessKeyId: process.env.aws_ddb_access_key_id,
  secretAccessKey: process.env.aws_ddb_secret_access_key,
  // creds,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const LISTS_TABLE = 'listthis-lists'
const USERS_TABLE = 'listthis-users'

// Create empty list
const createNewList = async ({ listID, listName, userID }) => {
  const params = {
    TableName: LISTS_TABLE,
    Item: {
      listID: listID,
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

const getListByID = async listID => {
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      listID: listID,
    },
  }

  return await dynamoClient.get(params).promise()
}

// Adds item to list
const addItemToList = async ({ listID, item }) => {
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      listID: listID,
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

// Gets all lists that the given user is associated with
const getListsByUserID = async userID => {
  const associatedListIDs = await getUserAssociatedLists(userID)

  // Return list of lists extracted from associated ids
  // const { Items: associatedLists } = await getListsByListIDs(associatedListIDs)
  const associatedLists = await getListsByListIDs(associatedListIDs)

  return associatedLists
}

const getUserAssociatedLists = async userID => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userID: userID,
    },
  }

  const { Item: { associatedListIDs }} = await dynamoClient.get(params).promise()

  return associatedListIDs
}

const getListsByListIDs = async listIDs => {
  const params = {
    TableName: LISTS_TABLE,
  }
  // Get all lists from database
  const { Items: allLists } = await dynamoClient.scan(params).promise()

  // Filter lists by id
  // TODO: investigate doing this directly through dynamo
  const listsByID = allLists.filter(list => listIDs.includes(list.listID))
  return listsByID
}

const updateList = async ({ listID, listItems }) => {
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      listID: listID,
    },
    UpdateExpression: 'SET #attrName = :listItems',
    ExpressionAttributeNames: {
      '#attrName': 'items',
    },
    ExpressionAttributeValues: {
      ':listItems': listItems,
    },
  }
  return await dynamoClient.update(params).promise()
}

const deleteItem = async ({ listID, itemID }) => {
  // Get list from listID
  const {
    Item: { items: list },
  } = await getListByID(listID)

  // Create new list without deleted item
  const updatedList = list.filter(item => (item.itemID != itemID ? item : null))

  // Set the items of the current list to the updated items
  const params = {
    TableName: LISTS_TABLE,
    Key: {
      listID: listID,
    },
    UpdateExpression: 'SET #attrName = :updatedList',
    ExpressionAttributeNames: {
      '#attrName': 'items',
    },
    ExpressionAttributeValues: {
      ':updatedList': updatedList,
    },
  }

  return await dynamoClient.update(params).promise()
}

const removeUserFromList = async ({ userID, listID }) => {
  // Get lists associated with userID
  const userLists = await getUserAssociatedLists(userID)

  // Remove listID from associated lists for user
  userLists.splice(userLists.indexOf(listID), 1)

  const params = {
    TableName: USERS_TABLE,
    Key: {
      userID: userID,
    },
    UpdateExpression: 'SET #attrName = :updatedUserLists',
    ExpressionAttributeNames: {
      '#attrName': 'associatedListIDs',
    },
    ExpressionAttributeValues: {
      ':updatedUserLists': userLists,
    },
  }

  return await dynamoClient.update(params).promise()
}

module.exports = {
  dynamoClient,
  createNewList,
  getListsByUserID,
  getListByID,
  addItemToList,
  updateList,
  deleteItem,
  removeUserFromList,
}
