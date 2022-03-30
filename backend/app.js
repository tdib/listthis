const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const { getAllItems, addOrUpdateItem, deleteItem } = require('./dynamo')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', async (req, res) => {
  try {
    const list = await getAllItems()
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.get('/list/:id', (req, res) => {
  const id = req.params.id
  try {
    res.send(`This is list ${id}`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.post('/list', async (req, res) => {
  const item = req.body
  try {
    const newItem = await addOrUpdateItem(item)
    res.json(newItem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.put('/list/:id', async (req, res) => {
  const item = req.body
  const id = req.params.id
  item.id = id
  try {
    const updatedItem = await addOrUpdateItem(item)
    res.json(updatedItem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.delete('/list/:id', async (req, res) => {
  const id = req.params.id

  try {
    res.json(await deleteItem(id))
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
})

app.listen(PORT, () => console.log(`App running on port ${PORT}!`))
