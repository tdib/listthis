const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const {
  addItemToList,
  deleteItem,
  createNewList,
  getListByID,
  getListsByUserID,
  updateList,
  removeUserFromList,
} = require('./dynamo')
const { uploadImage } = require('./s3')
const { getDistributionDomain } = require('./cloudfront')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
app.use(fileUpload())

app.get('/', (req, res) => res.send('Hello World!'))

// Get lists associated with a given user ID
app.get('/lists/:userID', async (req, res) => {
  const userID = req.params.userID
  try {
    const listsByUserID = await getListsByUserID(userID)
    res.json(listsByUserID)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Get specific list
app.get('/list/:listID', async (req, res) => {
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
app.post('/list/:listID', async (req, res) => {
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
app.put('/list/:listID', async (req, res) => {
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
app.post('/list', async (req, res) => {
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
app.delete('/list/:listID/:itemID', async (req, res) => {
  const { listID, itemID } = req.params

  try {
    res.json(await deleteItem({ listID, itemID }))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Leave a list
app.delete('/users/:userID/:listID', async (req, res) => {
  const { userID, listID } = req.params
  try {
    res.json(await removeUserFromList({ userID, listID }))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Upload image to S3 and return CloudFront URL to it
app.post('/lists/images', async (req, res) => {
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

app.listen(PORT, () => console.log(`App running on port ${PORT}!`))
