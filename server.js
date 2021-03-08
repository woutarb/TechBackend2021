const express = require('express')
const pug = require('pug');
const slug = require('slug');
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient

//let upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0u7k.mongodb.net/Cluster0?retryWrites=true&w=majority`
let preferenceCollection;
let usersCollection;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Databases')
    const db = client.db('usersData')
    usersCollection = db.collection('users')
    preferenceCollection = db.collection('preferences')
  })
  

app.get('/',(req, res) =>{
    const dbUserlist = usersCollection.find()
    res.render('index', {userList:dbUserlist})
});

app.get('/home',(req, res) =>{
    const dbUserlist = db.collection('users').find()
    res.render('index', {userList:dbUserlist})
});


app.get('/preferences',(req, res) =>{
    res.render('preferenceProfile')
});

app.post('/preferences', (req, res) => {
    let userPref={
        genderPref: req.body.genderOther,
        agePref: req.body.agePreference,
        percentOverlap: req.body.percent
    }
    res.redirect('/')
    preferenceCollection.insertOne(userPref)
        .then(result =>{
            console.log(result)
        })
    .catch(error=>console.error(error))
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res){
    res.status(404).render('error')
});

