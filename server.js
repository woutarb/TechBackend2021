// The requires for needed packages
const express = require('express')
const pug = require('pug');
require('dotenv').config()
const mongoose = require('mongoose');
const userModels = require('./models/user');
const prefModels = require('./models/preference');
const path = require('path');

// Stating what the app and port are, creating a let for a user id.
const app = express();
const port = 3000
let userId;

// Setting the view engine, setting the directory name for views & making sure the static files know where to look
app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting up the string needed to connect to the database, using ENV with a healthy combination of gitignore to keep information safe.
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0u7k.mongodb.net/Cluster0?retryWrites=true&w=majority`

// Setting up mongoose connection data like the database name, allowing it to error
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, dbName:process.env.DB_NAME});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Making sure the base url goes to the home page
app.get('/',(req, res) =>{
    res.redirect('home');
    
});

// routing for the home page
app.get('/home',(req, res) =>{  
    // If there is a userId (when it is not null or undefined), collect users based on preferences from the ID
    if(typeof userId === "string"){
        let currentPrefs= prefModels.Preference.findById(userId,(err, preferenceData)=>{
            // if the minage is smalled than max age, error on out.
            if(preferenceData.minAgePref >= preferenceData.maxAgePref){
                res.status(501).send('Error! You can not have your preference age minimum to be above or equal to the maximum!');
            }else{
                // if the user is fine with any of the genders, ignore looking for overlap with a preferred gender
                if(preferenceData.genderPref == 'either'){
                    userModels.User.find({})
                    .where('age').gte(preferenceData.minAgePref)
                    .where('age').lte(preferenceData.maxAgePref)
                    .where('beers').gte(preferenceData.percentOverlap)
                    .exec().then((Users,err)=>{
                        res.render('index',{userList: Users})
                    });
                }else{
                    // If the user wants a more specific match, find users in the database where the specifics are wished for, and only render them
                    userModels.User.find({})
                    .where('gender').equals(preferenceData.genderPref)
                    .where('age').gte(preferenceData.minAgePref)
                    .where('age').lte(preferenceData.maxAgePref)
                    .where('beers').gte(preferenceData.percentOverlap)
                    .exec().then((Users,err)=>{
                        res.render('index',{userList: Users})
  
                });
            }
        }
        });
    }else{
        // When there isn't a userID, render all people in the database
        userModels.User.find((err,Users)=>{
            res.render('index',{userList: Users})
          });
    }
});

// render a pug page for filling in preferences
app.get('/preferences',(req, res) =>{
    res.render('preferenceProfile');
});

// when posting preferences, store them in userPref and save them in the database, mongo creates a id to look on through the ddatabase with
app.post('/preferences', (req, res) => {
    if(typeof userId === "string"){
    }
    let userPref={
        genderPref: req.body.genderOther,
        minAgePref: req.body.minAgePreference,
        maxAgePref: req.body.maxAgePreference,
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

// make sure to listen on the correct port
app.listen(port, ()=>{
    console.log(`Beermatching app listening on port ${port}!`);
});

// when error hapens render the error page
app.use(function (req, res){
    res.status(404).render('error'); 
    res.status(500).render('error'); 
});
