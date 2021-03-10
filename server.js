const express = require('express')
const pug = require('pug');
const slug = require('slug');
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const userModels = require('./models/user');
const prefModels = require('./models/preference');
const { ObjectId } = require('bson');
const app = express();
const port = 3000
let userId;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0u7k.mongodb.net/Cluster0?retryWrites=true&w=majority`

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, dbName:'usersData'});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

  // we're connected!
app.get('/',(req, res) =>{
    res.redirect('home');
    
});

app.get('/home',(req, res) =>{
    // userId I can reach
    if(typeof userId === "string"){
        let currentPrefs= prefModels.Preference.findById(userId,(err, preferenceData)=>{
            userModels.User.find()
            .where('gender').equals(preferenceData.genderPref)
            .where('age').equals(preferenceData.agePref)
            .where('beers').gt(preferenceData.percentOverlap)
            .exec().then((Users,err)=>{
                res.render('index',{userList: Users})
            console.log('users: ' + Users);
            console.log('err: ' + err);
            console.log('genderpref: ' + preferenceData.genderPref);
            });
        });
       

    }else{
        userModels.User.find((err,Users)=>{
            res.render('index',{userList: Users})
          });
    }
});


app.get('/preferences',(req, res) =>{
    res.render('preferenceProfile');
});

app.post('/preferences', (req, res) => {
    let userPref={
        genderPref: req.body.genderOther,
        agePref: req.body.agePreference,
        percentOverlap: req.body.percent
    }
    const model = new prefModels.Preference(userPref);
    model.save(function(err, userPref){
        if(err){
            console.log(err); 
            return;
        } 
        userId = userPref.id;
        res.redirect('/');
    })
})

app.listen(port, ()=>{
    console.log(`Beermatching app listening on port ${port}!`);
});

app.use(function (req, res){
    res.status(404).render('error');
});
