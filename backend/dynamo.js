const AWS = require('aws-sdk')
const { deleteImage } = require('./s3')
require('dotenv').config()

// Set configuration to use credentials in given region
AWS.config.update({
  region: process.env.aws_default_region,
  accessKeyId: process.env.aws_ddb_access_key_id,
  secretAccessKey: process.env.aws_ddb_secret_access_key,
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
  const associatedLists = await getListsByListIDs(associatedListIDs)

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

// Find and remove lists with no user association - also deletes images within these lists
const pruneLists = async () => {
  // Get all lists in the database
  const { Items: allLists } = await dynamoClient
    .scan({
      TableName: LISTS_TABLE,
    })
    .promise()

  // Extract list IDs from lists
  const allListIDsSet = new Set()
  allLists.forEach(list => {
    allListIDsSet.add(list.listID)
  })

  // Get all users in the database
  const { Items: allUsers } = await dynamoClient
    .scan({
      TableName: USERS_TABLE,
    })
    .promise()

  // Get list of lists that are associated to any user
  let allAssociatedListIDs = []
  allUsers.forEach(user => {
    allAssociatedListIDs = allAssociatedListIDs.concat(user.associatedListIDs)
  })
  // Convert list into set (as long as one exists that is all we need)
  const allAssociatedListIDsSet = new Set(allAssociatedListIDs)

  // Find lists with no association (difference of sets)
  const unpopulatedListIDs = new Set(allListIDsSet)
  for (let listID of allAssociatedListIDsSet) {
    if (unpopulatedListIDs.has(listID)) {
      unpopulatedListIDs.delete(listID)
    }
  }

  // Go through each unpopulated list and delete the images associated (if applicable)
  for (let unpopulatedListID of unpopulatedListIDs) {
    // Get an unpopulated list
    const {
      Item: { items: unpopulatedList },
    } = await getListByID(unpopulatedListID)

    // For every element in the current unpopulated list
    for (let item of unpopulatedList) {
      // Delete its associated image if it exists
      if (item.imageURL) {
        const imgURL = item.imageURL
        deleteImage({ imgURL })
      }
    }

    // Delete the list itself
    await dynamoClient
      .delete({
        TableName: LISTS_TABLE,
        Key: {
          listID: unpopulatedListID,
        },
      })
      .promise()
  }
}

module.exports = {
  createNewList,
  getListsByUserID,
  getListByID,
  addItemToList,
  updateList,
  deleteItem,
  removeUserFromList,
  pruneLists,
}
