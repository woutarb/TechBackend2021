const express = require('express')
const app = express()
const port = 3000

app.get('/',(req, res) =>{
    res.send("Hello World - Welcome to the main page")
});

app.get('/profile',(req, res) =>{
    res.send("Your profile")
});

app.get('/user',(req, res) =>{
    res.send("A different profile")
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res, next){
    res.status(404).send("Error 404 - Sorry, can't find this page for you!")
});

