const express = require('express')
const pug = require('pug');
const slug = require('slug');
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
//import {User, userSchema} from './models/user'
const models = require('./models/user');
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


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, dbName:'usersData'});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('connected dbonce-style!');
    models.User.find(function(err,User){
        if(err) return cole.error(err);
        console.log(User);
    })
});
  // we're connected!
  app.get('/',(req, res) =>{
    const dbUserlist = usersCollection.find().toArray()
    res.render('index', {userList:dbUserlist})
});

app.get('/home',(req, res) =>{
    //const dbUserlist = db.collection('users').find().toArray()
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

