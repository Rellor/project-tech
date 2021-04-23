const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 6969

app.use(express.static('static'));
app.use(bodyParser());
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index',  { title: 'Dark Souls 3 Matcher', homebutton:'login', homebuttonlink:'Tap screen', kutzooilink: '', kutzooi: '' })
})

app.get('/login', (req, res) => {
  res.render('pages/login',  { title: 'Login'})
  res.sendfile("login");
})

app.post('/login', (req, res) => {
  var naam = req.body.firstname;
  console.log(naam);
    res.render('pages/login',  { title: 'Login', naam: naam})
})

app.post('/login', function(req, res, next){
   // req.body object has your form values
   console.log(req.body.firstname);
});

// 404 pagina
app.use((req, res, next) => {
    res.send('404 Deze pagina bestaat niet!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
