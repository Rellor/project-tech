const express = require('express')
const app = express()
const port = 6969

app.use(express.static('static'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index',  { title: 'Dark Souls 3 Matcher', homebutton:'login', homebuttonlink:'Tap screen', kutzooilink: '', kutzooi: '' })
})

// 404 pagina
app.use((req, res, next) => {
    res.send('404 Deze pagina bestaat niet!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
