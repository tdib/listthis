const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const { addItemToList, deleteItem, createNewList, getListByID, getListsByUserID, updateList, removeUserFromList } = require('./dynamo')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

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

// Get specific list (unused?)
app.get('/list/:id', async (req, res) => {
  const id = req.params.id
  try {
    const list = await getListByID(id)
    res.json(list.Item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

// Create item in a list (not working)
app.post('/list/:id', async (req, res) => {
  const { listID, item } = req.body
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

// app.post('/list/:id', async (req, res) => {
//   console.log('WE ARE HERE')
//   const itemFields = req.body
//   console.log('itemFields:', itemFields)
//   try {
//     const newItem = await updateList(item)
//     res.json(newItem)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ err: 'Something went wrong' })
//   }
// })

// app.post('/list/:id', async (req, res) => {
//   const item = req.body
//   const id = req.params.id
//   item.id = id
//   try {
//     const updatedItem = await addOrUpdateItem(item)
//     res.json(updatedItem)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ err: 'Something went wrong' })
//   }
// })

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
    res.json(await removeUserFromList({ userID, listID}))
    // TODO: set up leave function
    // res.json(await deleteItem(id))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.listen(PORT, () => console.log(`App running on port ${PORT}!`))
