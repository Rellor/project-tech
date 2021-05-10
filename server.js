const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 6969

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Rellor:Password@tech-cluster.uuvlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(express.static('static'));
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index',  { title: 'Dark Souls 3 Matcher', homebutton:'login', homebuttonlink:'Tap screen', kutzooilink: '', kutzooi: '' })
})

app.get('/login', (req, res) => {
  console.log(req);
  var username = req.body.username;
  var password = req.body.password;
  var image = req.body.image;
  res.render('pages/login',  { title: 'Login', username: username, password: password, image: image})
  res.sendfile("login");

})

app.post('/login', (req, res) => {
  console.log(req);
  var username = req.body.username;
  var password = req.body.password;
  var image = req.body.image;
  res.render('pages/login',  { title: 'Login', username: username, password: password, image: image})
  res.sendfile("login");
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
