var mongoose = require('mongoose');
//const notifier = require('node-notifier');
//const notifysend = require('node-notifier').NotifySend;
var Candidate = require('../models/Candidate');
var Party = require('../models/Party');
var Remote = require('../models/Request');
var dialog = require('dialog')
var Election = require('../models/Election')
var Back = require('../models/Back')
var District = require('../models/District')

//var notifier = new notifysend();
var candidateController = {};


candidateController.verify = (req, res) => {
  var sessData = req.session;
  sessData.name = req.body.name;

  Candidate.findOne({
    'name': req.body.name
  }, (err, result) => {
    if (result == null) {

       res.redirect('/candidates');

    } else {
      if (result.name = req.body.name) {
         res.redirect('/candidates/home/' + result._id);

      }
    }
  })
}

//Create a candidate
candidateController.create = (req, res) => {
  var someName = req.session.name;
  res.render("../views/candidates/create");
}


//Save
candidateController.save = (req, res) => {
  var cand = new Candidate();
  cand.name = req.body.name
  cand.age = req.body.age
  cand.party = req.body.party
  cand.address = req.body.address
  cand.save((err, result) => {
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/candidates');
  })
}


//Home
candidateController.hom = (req, res) => {
  var someName = req.session.name;
  console.log(someName);

  Candidate.findById(req.params.id, (err, result) => {
    if (err) res.send(err);
    else {
      res.render("../views/candidates/home", {
        candidates: result
      })
    }
  })
}

//show
candidateController.show = (req, res) => {
  var someName = req.session.name;
  Candidate.findById(req.params.id, (err, result) => {
    if (err) res.send(err);
    else {
      res.render("../views/candidates/show", {
        candidates: result
      });
    }
  })
}


//Update voter
candidateController.update = (req, res) => {
  Candidate.findById(req.params.id, (err, result) => {
    if (err) res.send(err)
    result.name = req.body.name
    result.party = req.body.party
    result.address = req.body.address
    result.age = req.body.age
    result.save((err, result) => {
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/candidates/show/' + result._id);
    })
  })
}

candidateController.plist = (req, res) => {
  var someName = req.session.name;
  Candidate.findById(req.params.id, (err, cand)=>{
    Party.find((err, result) => {
      if (err) res.send(err)
      res.render("../views/candidates/plist", {
        parties: result,
        cands: cand
      })
    })

  })

}

candidateController.rlist = (req, res) => {
  var someName = req.session.name;
  Candidate.findById(req.params.id, (err, candidate) => {
    if (err) res.send(err)
    else {
      Remote.find({$and:[{'to':candidate.name},{'from': { $nin :['admin']}}]}, (req, presult) =>{
      Remote.find({$and: [{'from':'admin'}, {'ename':'Candidate'}]}, (req, eresult) =>{
        console.log(presult)
        res.render("../views/candidates/rlist", {candidates: candidate, preqs:presult, ereqs:eresult })

      })
      })
    }
  })
}

candidateController.rreg = (req, res) => {
  var reg = new Remote()
  reg.from = req.body.cname
  reg.to = req.body.pname
  reg.ename = req.body.ename
  reg.content = req.body.content
  reg.save((err, result) => {
    if (err) return console.log(err)
    else {
      console.log('Request Pushed')
      Candidate.find({
        'name': req.body.cname
      }, (err, result) => {
        if (err) console.log(err)
        res.redirect('/candidates/home/' + result[0].id);
      })
    }
  })
}

candidateController.resolve = (req, res) => {
  var stored = req.params.id
  console.log(stored)
  Remote.find({_id: stored}, (req, result) => {
    var temp = result[0].to;
    Remote.remove({_id: stored}, (err) => {
      if (err) { console.log(err);}
      else {
        console.log("Removed!")
      }
    })
    Candidate.find({ 'name': temp}, (err, result1) => {
      dialog.info('Read Succesfully ', 'Read', (exitCode) => {
        if (exitCode == 0) res.redirect('/candidates/request/' + result1[0]._id);
      })
    })
  })
}


candidateController.elpolist = (req, res) => {
  Election.find({$and: [{'type': 'Presidential'}, {'status': 'Ongoing'}]}, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/elpoindex', {
        elections: result
      })
    }
  })
}

candidateController.elposhow = (req, res) => {
  Election.find({
    _id: req.params.id
  }, (err, election) => {
    if (err) res.send(err)
    else {
      Candidate.find({
        $and: [{
          'pid': election[0].eid
        }, {
          'presidential': 'true'
        }]
      }, (err, candidate) => {
        console.log(candidate)
        console.log(election[0].eid)
        res.render('../views/candidates/elposhow', {
          elections: election,
          candidates: candidate
        })
      })
    }
  })
}

candidateController.elpocshow = (req, res) => {
  Candidate.findById(req.params.id, (err, cand) => {
    if (err) res.send(err);
    else {
      res.render("../views/candidates/elpocshow", {
        candidates: cand
      });
    }
  })
}

candidateController.elpclist = (req, res) => {
  Election.find({
    $and: [{
      'type': 'Presidential'
    }, {
      'status': 'Completed'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/elpcindex', {
        elections: result
      })
    }
  })
}


candidateController.elpcshow = (req, res) => {
  Election.find({
    _id: req.params.id
  }, (err, election) => {
    if (err) res.send(err)
    else {

      Back.find({
        'pid': election[0].eid
      }, (err, candidate) => {
        Back.find({
          'pid': election[0].eid + 0.1
        }, (err, candidate2) => {
          if (candidate2.length < 1) {
            res.render('../views/candidates/elpcshow', {
              candidates: candidate
            })
          } else {
            res.render('../views/candidates/elpc2show', {
              candidates: candidate,
              candidates2: candidate2
            })
          }

        })
      })
    }
  })
}


candidateController.elpulist = (req, res) => {
  Election.find({
    $and: [{
      'type': 'Presidential'
    }, {
      'status': 'Upcoming'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/elpuindex', {
        elections: result
      })

    }
  })

}
//=============================================================================
candidateController.eldolist =(req, res) =>{
  Election.find({
    $and: [{
      'type': 'District'
    }, {
      'status': 'Ongoing'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/eldoindex', {
        elections: result
      })
    }
  })

}

candidateController.eldoshow = (req, res) => {
  Election.find({_id: req.params.id}, (err, election) => {
      District.find({'eid': election[0].eid}, (err, reg) => {
          res.render('../views/candidates/eldoshow', {elections: election,regs: reg})
        })
    })
}
candidateController.eldooshow = (req, res) =>{
  Election.find({'eid': req.params.id}, (err, election) =>{
    District.find({$and:[{'eid': req.params.id}, { _id: req.params.id2}]},(err, district) =>{
      Candidate.find({$and:[{'did': election[0].eid },{'dname': district[0].name}]}, (err, candidate) =>{
        res.render('../views/candidates/eldooshow',{elections: election, districts: district, candidates: candidate})
      })
    })
  })

}

candidateController.eldclist = (req, res) => {
  Election.find({
    $and: [{
      'type': 'District'
    }, {
      'status': 'Completed'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/eldcindex', {
        elections: result
      })
    }
  })
}
candidateController.eldulist = (req, res) => {
  Election.find({
    $and: [{
      'type': 'District'
    }, {
      'status': 'Upcoming'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/elduindex', {
        elections: result
      })

    }
  })

}

candidateController.eldclist = (req, res) =>{
  Election.find({
    $and: [{
      'type': 'District'
    }, {
      'status': 'Completed'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/candidates/eldcindex', {
        elections: result
      })

    }
  })
}

candidateController.eldcshow = (req, res) => {
  Election.find({
    _id: req.params.id
  }, (err, election) => {
    if (err) res.send(err)
    else {

      Back.find({'did': election[0].eid}, (err, candidate) => {
            res.render('../views/candidates/eldcshow', {
              candidates: candidate
          })
        })
      }})}




module.exports = candidateController;
