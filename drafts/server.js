//server.js

//load everything
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const app = express()
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

//update and delete Route
app.get('/updl',(req, res) => {
  db.collection('candidates').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('pages/updl',{candidates: result})
    console.log(result)
})
})

app.put('/updl', (req, res) => {
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

app.delete('/updl', (req, res) => {
  db.collection('candidates').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Something deleted')
  })
})


//for protoejs
app.get('/home',(req, res) => {

    res.render('protoejs/home')

})
