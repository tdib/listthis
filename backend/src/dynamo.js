const AWS = require('aws-sdk')
const { deleteImage } = require('./s3')
require('dotenv').config()
const bcrypt = require('bcrypt')

// Set configuration to use credentials in given region
AWS.config.update({
  region: process.env.listthis_aws_default_region,
  accessKeyId: process.env.listthis_aws_ddb_access_key_id,
  secretAccessKey: process.env.listthis_aws_ddb_secret_access_key,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const LISTS_TABLE = 'listthis-lists'
const USERS_TABLE = 'listthis-users'
const INVITES_TABLE = 'listthis-invites'

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
  await associateListIDWithUser({ listID, userID })

  return await dynamoClient.put(params).promise()
}

// Link a list ID with a user ID
const associateListIDWithUser = async ({ listID, userID }) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userID: userID,
    },
    // UpdateExpression: 'SET associatedListIDs = list_append(associatedListIDs, :newListID)',
    UpdateExpression: 'ADD associatedListIDs :newListID',
    ExpressionAttributeValues: {
      ':newListID': dynamoClient.createSet(listID),
    },
  }

  return await dynamoClient.update(params).promise()
}

const getUserByID = async userID => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userID: userID,
    },
  }

  return await dynamoClient.get(params).promise()
}

// Get a list by the given ID
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
  const associatedLists = await getListsByListIDs(associatedListIDs.values)

  return associatedLists
}

// Gets list IDs associated with a user
const getUserAssociatedLists = async userID => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userID: userID,
    },
  }

  const {
    Item: { associatedListIDs },
  } = await dynamoClient.get(params).promise()

  return associatedListIDs
}

// Gets lists filtered by a list of ids
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

// Replaces items in a list with a new list (slightly updated list)
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

// Deletes an item in a list - If necessary also deletes the image from S3
const deleteItem = async ({ listID, itemID }) => {
  // Get list from listID
  const {
    Item: { items: list },
  } = await getListByID(listID)

  const updatedList = []
  // Remove image if any from item to delete
  list.forEach(item => {
    // Item should be deleted
    if (item.itemID === itemID) {
      if (item.imageURL) {
        // Extract image ID/key from URL
        const imgURL = item.imageURL
        deleteImage({ imgURL })
      }
    } else {
      updatedList.push(item)
    }
  })

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

// Removes a list ID from a user's associated lists
const removeUserFromList = async ({ userID, listID }) => {
  // Get lists associated with userID
  const userLists = await getUserAssociatedLists(userID)

  // Remove listID from associated lists for user
  userLists.values.splice(userLists.values.indexOf(listID), 1)

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

// Create a new user in the database
const createNewUser = async ({ userID, username, password }) => {
  // Check if a user already exists with username
  const { Count: usersWithSameUsername } = await dynamoClient
    .scan({
      TableName: USERS_TABLE,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    })
    .promise()

  // A user with the given username already exists
  if (usersWithSameUsername > 0) {
    return null
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userID: userID,
      associatedListIDs: dynamoClient.createSet(''),
      username: username,
      password: password,
    },
  }

  return await dynamoClient.put(params).promise()
}

const validateLogin = async ({ username, password }) => {
  // Find user by username
  const { Items: user } = await dynamoClient
    .scan({
      TableName: USERS_TABLE,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    })
    .promise()

  // If a user matches the username
  if (user.length) {
    // Compare raw password to hashed password
    const isMatch = await bcrypt.compare(password, user[0].password)

    if (isMatch) {
      return user
    }
  } else {
    return
  }
}

// Create an invite link
const createInviteLink = async ({ inviteID, listID, expiry }) => {
  const params = {
    TableName: INVITES_TABLE,
    Item: {
      inviteID: inviteID,
      listID: listID,
      expiry: expiry,
    },
  }

  return await dynamoClient.put(params).promise()
}

// Return information about a list based on its invite ID
const getListByInviteID = async inviteID => {
  // Get invite information via ID
  const { Item: invite } = await dynamoClient
    .get({
      TableName: INVITES_TABLE,
      Key: {
        inviteID: inviteID,
      },
    })
    .promise()

  // Invalid link handling
  if (!invite || invite.expiry < Math.round(Date.now() / 1000)) {
    return { isValid: false }
  }

  // Get list information via list ID
  const { Item: list } = await dynamoClient
    .get({
      TableName: LISTS_TABLE,
      Key: {
        listID: invite.listID,
      },
    })
    .promise()

  return list
}

module.exports = {
  createNewList,
  associateListIDWithUser,
  getListsByUserID,
  getListByID,
  addItemToList,
  updateList,
  deleteItem,
  removeUserFromList,
  createNewUser,
  validateLogin,
  getUserByID,
  createInviteLink,
  getListByInviteID,
}