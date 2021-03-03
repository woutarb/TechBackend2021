const express = require('express')
const pug = require('pug');
const slug = require('slug');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

let upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
/*
app.use(express.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient } = require('mongodb');
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.o0u7k.mongodb.net/<Cluster0>`
require('dotenv').config()

let db = null;

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const userList = [
        {
            firstName:'Clara',
            age: '50',
            gender: 'f',
            beers:'53'
        },
        {
            firstName:'Pien',
            age: '30',
            gender: 'f',
            beers:'24'
        },
        {
            firstName:'Willem',
            age: '25',
            gender: 'm',
            beers:'13'
        },
        {
            firstName:'Karel',
            age: '21',
            gender: 'm',
            beers:'53'
        }
    ]

console.log(typeof userList);


app.get('/',(req, res) =>{
    res.render('index', {userList:userList})
});

app.get('/home',(req, res) =>{
    res.render('index', {userList:userList})
});

app.get('/preferences',(req, res) =>{
    res.render('preferenceProfile')
});

app.post('/preferences', addPref);

function addPref(req, res){
    /*upload.push({
        genderPref:req.body.genderOther,
        minRange: req.body.minAgeRange,
        maxRange: req.body.maxAgeRange,
        percentOverlap: req.body.percentRange 
    })
    res.redirect(`preferences${genderPref}${minRange}${maxRange}${percentOverlap}`)
    */
   console.log(req.body);
   res.status(200).send({message:'Done!'});
}

app.get('/profile',(req, res) =>{
    res.render('profile')
});

app.get('/user',(req, res) =>{
    res.render('otheruser')
});

app.get('/selection',(req, res) =>{
    res.render('selectbeer')
});

app.get('/beer',(req, res) =>{
    res.render('beer')
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res, next){
    res.status(404).render('error')
});

