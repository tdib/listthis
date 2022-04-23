const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bcrypt = require('bcrypt')

const {
  addItemToList,
  deleteItem,
  createNewList,
  getListByID,
  getListsByUserID,
  updateList,
  removeUserFromList,
  createNewUser,
  validateLogin,
  associateListIDWithUser,
  getUserByID,
  createInviteLink,
  getListByInviteID,
} = require('./src/dynamo')
const { uploadImage } = require('./src/s3')
const { getDistributionDomain } = require('./src/cloudfront')

const { createToken, validateToken } = require('./src/JWT')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.get('/', (req, res) => res.send('ListThis Backend!'))

// Get user from a user ID
app.get('/user/:userID', validateToken, async (req, res) => {
  const { userID } = req.params
  try {
    const { Item: user } = await getUserByID(userID)
    delete user.password
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Get lists associated with a given user ID
app.get('/lists/:userID', validateToken, async (req, res) => {
  const { userID } = req.params
  try {
    const listsByUserID = await getListsByUserID(userID)
    res.json(listsByUserID)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Get specific list
app.get('/list/:listID', validateToken, async (req, res) => {
  const listID = req.params.listID
  try {
    const list = await getListByID(listID)
    res.json(list.Item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Create item in a list (not working)
app.post('/list/:listID', validateToken, async (req, res) => {
  const { listID } = req.params
  const { item } = req.body
  try {
    const newItem = await addItemToList({ listID, item })
    res.json(newItem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Update list items
app.put('/list/:listID', validateToken, async (req, res) => {
  const { listID } = req.params
  const { listItems } = req.body
  try {
    const updatedList = await updateList({ listID, listItems })
    res.json(updatedList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Create new list
app.post('/list', validateToken, async (req, res) => {
  const { listID, listName, userID } = req.body
  try {
    const newList = await createNewList({ listID, listName, userID })
    res.json(newList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Delete item from list
app.delete('/list/:listID/:itemID', validateToken, async (req, res) => {
  const { listID, itemID } = req.params

  try {
    res.json(await deleteItem({ listID, itemID }))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Leave a list
app.delete('/users/:userID/:listID', validateToken, async (req, res) => {
  const { userID, listID } = req.params
  try {
    res.json(await removeUserFromList({ userID, listID }))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Upload image to S3 and return CloudFront URL to it
app.post('/lists/images', validateToken, async (req, res) => {
  const { img } = req.files
  const { imgID } = req.body
  try {
    // Upload image to S3 and get key
    const uploadedImgKey = await uploadImage({ imgID, img }).then(uploadedImg => uploadedImg.key)
    // Get distribution domain from cloudfront
    const distributionDomain = await getDistributionDomain()
    // Construct url to access image from cldoufront
    const imageURL = 'https://' + distributionDomain + '/' + uploadedImgKey
    res.json(imageURL)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Associate user with listID
app.put('/users/:userID/:listID', validateToken, async (req, res) => {
  const { userID, listID } = req.params
  try {
    res.json(await associateListIDWithUser({ listID, userID }))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.post('/auth/signup', async (req, res) => {
  const { userID, username, password } = req.body
  try {
    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = await createNewUser({ userID, username, password: hashedPass })
    res.json(newUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const validatedUser = await validateLogin({ username, password })
    // Correct login details provided
    if (validatedUser) {
      // Create access token to store in browser
      const accessJWT = createToken(validatedUser)
      res.cookie('access-token', accessJWT, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in ms = 1000ms * 60s * 60m * 24h * 30d
        httpOnly: true,
      })
      res.json({
        isAuthenticated: true,
        accessToken: accessJWT,
        result: {
          userID: validatedUser[0].userID,
          username: validatedUser[0].username,
          associatedListIDs: validatedUser[0].associatedListIDs,
        },
      })
    } else {
      res.json({ isAuthenticated: false })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Create an invite to given list ID
app.post('/invite/:listID', validateToken, async (req, res) => {
  const { listID } = req.params
  const { inviteID, expiry } = req.body
  const postURL = req.get('origin') + req.originalUrl
  try {
    await createInviteLink({ listID, inviteID, expiry })
    res.json(postURL.slice(0, postURL.lastIndexOf('/')) + '/join/' + inviteID)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Get list from invite ID
app.get('/invite/join/:inviteID', validateToken, async (req, res) => {
  const { inviteID } = req.params
  const { userID } = req.body
  try {
    const inviteList = await getListByInviteID(inviteID)
    res.json(inviteList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.listen(PORT, () => console.log(`App running on port ${PORT}!`))
