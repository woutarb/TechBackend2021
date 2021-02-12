const express = require('express')
const pug = require('pug');
const app = express()
const port = 3000
app.engine('pug',pug.__express)
app.set('view engine', 'pug')
var path = require('path');


app.get('/',(req, res) =>{
    res.render('index')
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

