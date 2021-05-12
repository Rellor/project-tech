const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 6969;

require('dotenv').config({
  path: '.env'
});

const {
  DB_URL,
  DB_USER,
  DB_PASS
} = process.env;

const MongoClient = require('mongodb').MongoClient;
const URI = process.env.MONGO_CONNECTION_URI;
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect((err) => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});



app.use(express.static('static'));
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Dark Souls 3 Matcher',
    homebutton: 'login',
    homebuttonlink: 'Tap screen',
    kutzooilink: '',
    kutzooi: ''
  })
})

app.get('/login', (req, res) => {
  MongoClient.connect(URI, function(err, db) {
    if (err) throw err;
    const dbo = db.db('Project-Tech-Database');
    // Find all documents in the customers collection:
    dbo.collection('users').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  const username = req.body.username;
  const password = req.body.password;
  const image = req.body.image;
  res.render('pages/login', {
    title: 'Login',
    username: username,
    password: password,
    image: image
  })
  res.sendFile('login');

})

app.post('/login', (req, res) => {
  MongoClient.connect(URI, function(err, db) {
    if (err) throw err;
    const dbo = db.db('Project-Tech-Database');
    // Find all documents in the customers collection:
    dbo.collection('users').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  const username = req.body.username;
  const password = req.body.password;
  const image = req.body.image;
  res.render('pages/login', {
    title: 'Login',
    username: username,
    password: password,
    image: image
  })
  res.sendFile('login');
})

app.post('/login', function(req, res, next) {
  // req.body object has your form values
  console.log(req.body.firstname);
});

// 404 pagina
app.use((req, res, next) => {
  res.send('404 Deze pagina bestaat niet!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
