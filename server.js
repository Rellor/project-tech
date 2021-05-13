const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT||8000

require('dotenv').config({
  path: '.env'
});

app.use(express.static('static'));
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

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


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Dark Souls 3 Matcher',
    homebutton: 'login',
    homebuttonlink: 'Tap screen',
  })
})

app.get('/test', (req, res) => {
  MongoClient.connect(URI, function(err, db) {
    if (err) throw err;
    var dbo = db.db('Project-Tech-Database');
    dbo.collection('users').findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      console.log('hierboven moet het staan');
      db.close();
    });
  });

  res.render('pages/test', {
    title: 'test page',
  })
})


app.post('/test', (req, res) => {
const usernametest = req.body.usertest;
const passwordtest = req.body.passtest;
const imagetest = req.body.image;

  MongoClient.connect(URI, function(err, db) {
    if (err) throw err;
    var dbo = db.db('Project-Tech-Database');
    var myobj = { username: usernametest, password: passwordtest, image: imagetest};
    dbo.collection('users').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });

  res.render('pages/test', {
    title: 'test page'
  })
})

app.get('/testupdate', (req, res) => {

  res.render('pages/testupdate', {
    title: 'test page',
  })
})


app.post('/testupdate', (req, res) => {
const usernametest = req.body.usertest;
const passwordtest = req.body.passtest;
const imagetest = req.body.image;

MongoClient.connect(URI, function(err, db) {
  if (err) throw err;
  var dbo = db.db('Project-Tech-Database');
  var myquery = { username: usernametest, password: passwordtest };
  var newvalues = { $set: {image: imagetest} };
  dbo.collection('users').updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log('1 document updated');
    db.close();
  });
});

  res.render('pages/testupdate', {
    title: 'test page'
  })
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
