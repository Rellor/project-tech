const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 6969
const session = require('express-session');

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
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

const {
  DB_URL,
  DB_USER,
  DB_PASS
} = process.env;

let users = {
  username: '',
  password: '',
  image: ''
}

let loginuser = 'Admin'
let loginpassword = 'Password123'

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
    loggedinuser: 'log in',
    loggedinlink: '/login',
    loggedinimg: 'img/no-user-image.gif'
  })
})

app.get('/register', (req, res) => {

  res.render('pages/register', {
    title: 'Register',
    pagetext: 'register account',
    loggedinuser: 'log in',
    loggedinlink: '/login',
    loggedinimg: 'img/no-user-image.gif'
  })
})


app.post('/register', (req, res) => {
  const usernametest = req.body.usertest;
  const passwordtest = req.body.passtest;
  const imagetest = req.body.image;

  MongoClient.connect(URI, function(err, db) {
    if (err) throw err;
    var dbo = db.db('Project-Tech-Database');
    var myobj = {
      username: usernametest,
      password: passwordtest,
      image: imagetest
    };
    dbo.collection('users').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });

  res.render('pages/login', {
    title: 'log in',
    loggedinuser: 'log in',
    loggedinlink: '/login',
    loggedinimg: 'img/no-user-image.gif',
    failedlogin: 'hidden'
  })
})

app.post('/update', (req, res) => {
  const usernametest = req.body.usertest;
  const passwordtest = req.body.passtest;
  const imagetest = req.body.image;

  MongoClient.connect(URI, function(err, db) {
    if (err) throw err;
    var dbo = db.db('Project-Tech-Database');
    var myquery = {
      username: usernametest,
      password: passwordtest
    };
    var newvalues = {
      $set: {
        image: imagetest
      }
    };
    dbo.collection('users').updateOne(myquery, newvalues, function(err, res) {
      if (err) {
        throw err
      } else;
      console.log('1 document updated');
      db.close();
    });
  });

  res.render('pages/update', {
    title: 'Update',
    pagetext: 'update account',
    loggedinuser: loginuser,
    loggedinlink: '/login',
    loggedinimg: 'img/Archdeacon-royce.jpg'
  })
})

app.get('/update', (req, res) => {

  res.render('pages/update', {
    title: 'Update',
    pagetext: 'update account',
    loggedinuser: loginuser,
    loggedinlink: '/login',
    loggedinimg: 'img/Archdeacon-royce.jpg'
  })
})

app.get('/login', (req, res) => {

  res.render('pages/login', {
    title: 'log in',
    loggedinuser: 'log in',
    loggedinlink: '/login',
    loggedinimg: 'img/no-user-image.gif',
    failedlogin: 'hidden'
  })
})

app.post('/login', (req, res) => {
  const usernamelogin = req.body.username;
  const passwordlogin = req.body.password;

  if (usernamelogin == loginuser && passwordlogin == loginpassword) {
    console.log('ja top man en nu?');
    MongoClient.connect(URI, function(err, db) {
      if (err) throw err;
      var dbo = db.db('Project-Tech-Database');
      dbo.collection('users').find().toArray()
        .then(results => {
          res.render('pages/account', {
            title: 'Accounts',
            pagetext: 'view account',
            users: results,
            uitkomst: users,
            loggedinuser: loginuser,
            loggedinlink: '/update',
            loggedinimg: 'img/Archdeacon-royce.jpg',
          })
        })
      db.close();
    });
  } else {
    console.log('werkt niet man shit')
    res.render('pages/login', {
      title: 'log in',
      loggedinuser: 'log in',
      loggedinlink: '/login',
      loggedinimg: 'img/no-user-image.gif',
      failedlogin: 'visible'
    })
  }
})

// 404 pagina
app.use((req, res, next) => {
  res.send('404 Deze pagina bestaat niet!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
