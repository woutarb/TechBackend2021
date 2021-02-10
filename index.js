const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/',(req, res) =>{
    res.send("Hello World - Welcome to the main page")
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

app.get('/beerlc',(req, res) =>{
    /* Doesn't work yet???
    res.sendFile('lchouffe.html',{
    root:Path2D.join(__dirname, './') 
    })
    */
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res, next){
    res.status(404).send("Error 404 - Sorry, can't find this page for you!")
});

