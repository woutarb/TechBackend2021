const express = require('express')
const app = express()
const port = 3000

app.get('/',(req, res) =>{
    res.send("Hello World")
});

app.get('/profile',(req, res) =>{
    res.send("Your profile")
});

app.get('/profile/:',(req, res) =>{
    res.send(`Profile of user ${req.params.movieID}`)
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
});

app.use(function (req, res, next){
    res.status(404).send("Error 404 - Sorry, can't find this page for you!")
});



/*
  //Respond to a Post request to the /user route:
app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
  //Respond to a PUT request to the /user route:
  
  app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })
  //Respond to a DELETE request to the /user route:
  
  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })
  */
