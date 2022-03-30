const express = require('express')
const fetch = require('node-fetch')
const app = express()
const PORT = 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/weather', (req, res) => {
  fetch('http://api.weatherstack.com/current?access_key=6255ecb5ac58429c16364e87ffb6bc59&query=Melbourne')
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => res.error(err))
})

app.get('/lists', (req, res) => res.send('Hello World!'))

app.get('/list/:id', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`App running on port ${PORT}!`))
