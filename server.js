const express = require('express')
const pug = require('pug');
const slug = require('slug');
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient

//let upload = multer({ dest: 'uploads/' })
let genderPref, minRange, maxRange, percentOverlap
let upload = [genderPref, minRange, maxRange, percentOverlap]
const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0u7k.mongodb.net/Cluster0?retryWrites=true&w=majority`

let db = null;


/*
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})
  
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
    upload.push({
        genderPref: req.body.genderOther,
        agePref: req.body.agePreference,
        percentOverlap: req.body.percent
    })
    res.redirect(`preferences?genderPref=${req.body.genderOther}&minRange=${req.body.agePreference}&percentOverlap=${req.body.percent}`)
}


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res){
    res.status(404).render('error')
});

