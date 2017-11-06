//server.js

//load everything
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const app = express()
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
//jquery

var db



//init view Engine
app.set('view engine','ejs')

//Bodyparser load and also get everything from form into body req
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//public folder
app.use(express.static('public'))

//views folder
app.use(express.static(path.join(__dirname,'views')));


//Database
MongoClient.connect('mongodb://reaper:starwars@ds149335.mlab.com:49335/ovs', (err, database) =>{
  if (err) return console.log(err)
  db = database
  app.listen(3000, function(){
    console.log('Port 3000 is under invasion')
  })
})

//add candidate Routes
app.get('/addcand',(req, res) => {
  db.collection('candidates').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/addcand',{candidates: result})
    console.log(result)
})
})
//Add Candidate Route
app.post('/addcand',(req, res) =>{
  db.collection('candidates').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/addcand')
})
})


//update and delete Route
app.get('/upcand',(req, res) => {
  db.collection('candidates').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/upcand',{candidates: result})
    console.log(result)
})
})

app.put('/upcand', (req, res) => {
  db.collection('candidates')
  .findOneAndUpdate({name: req.body.name2 }, {
    $set: {
      id: req.body.id,
      name: req.body.name,
      par: req.body.par
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/upcand', (req, res) => {
  db.collection('candidates').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Something deleted')
  })
})

//add Voter Routes
app.get('/addvoter',(req, res) => {
  db.collection('voters').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/addvoter',{voters: result})
    console.log(result)
})
})
//Add Voter Route
app.post('/addvoter',(req, res) =>{
  db.collection('voters').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/addvoter')
})
})


//update and delete Route
app.get('/upvoter',(req, res) => {
  db.collection('voters').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/upvoter',{voters: result})
    console.log(result)
})
})

app.put('/upvoter', (req, res) => {
  db.collection('voters')
  .findOneAndUpdate({name: req.body.name2 }, {
    $set: {
      id: req.body.id,
      name: req.body.name,
      age: req.body.age
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/upvoter', (req, res) => {
  db.collection('voters').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Something deleted')
  })
})

app.get('/login',(req, res) => {
      res.render('pages/login')

})
app.get('/register',(req, res) => {
      res.render('pages/register')

})


//for protoejs
app.get('/home',(req, res) => {

    res.render('protoejs/home')

})