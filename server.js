const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/About', (req, res) => {
  const name = 'Danny'
  res.send('Hello ${name}')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
