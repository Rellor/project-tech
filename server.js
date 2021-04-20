const express = require('express')
const app = express()
const port = 6969

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index',  { title: 'Travel Buddy | Home', message: 'Welkom!!', kutzooi: 'Ja, kutzooi' })
})

app.get('/About', (req, res) => {
  const name = 'Danny'
  res.send('Hello ${name}')
})

// 404 pagina
app.use((req, res, next) => {
    res.send('404 Deze pagina bestaat niet!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
