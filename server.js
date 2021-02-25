const express = require('express')
const pug = require('pug');
const path = require('path');
const multer = require('multer');
let upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000
require('dotenv').config()
app.engine('pug',pug.__express)
app.set('view engine', 'pug')

app.get('/',(req, res) =>{
    res.render('index')
});

app.get('/home',(req, res) =>{
    res.render('index')
});

app.get('/preferences',(req, res) =>{
    res.render('preferenceProfile')
});
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

