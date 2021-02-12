const express = require('express')
const pug = require('pug');
const app = express()
const port = 3000

app.set('view engine', 'pug')

app.get('/',(req, res) =>{
    res.render('index')
});

app.get('/profile',(req, res) =>{
    res.send("Your profile")
});

app.get('/user',(req, res) =>{
    res.send("A different profile")
});

app.get('/selection',(req, res) =>{
    res.send("A selection of beers you could choose from")
});

app.get('/beer',(req, res) =>{
    res.send("Here's the information about a certain beer")
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res, next){
    res.status(404).send("Error 404 - Sorry, can't find this page for you!")
});

