var mongoose = require('mongoose');
var Party = require('../models/Party');
var Candidate = require('../models/Candidate');
var Remote = require('../models/Request');
var dialog = require('dialog')
var Back = require('../models/Back')
var District = require('../models/District')
var Election = require('../models/Election')

var candidateController = {};

var partyController = {};

partyController.verify = (req, res) => {

  Party.find({
    'name': req.body.name
  }, (err, result) => {
    if (err) console.log(err)
    if (result[0].name = req.body.name) {
       res.redirect('/party/home/' + result[0]._id);

    } else {
     res.redirect('/party');

    }
  })
}
//Create a candidate
partyController.create = (req, res) => {
  res.render("../views/party/create");
}


//Save
partyController.save = (req, res) => {
  var par = new Party();
  par.name = req.body.name
  par.symbol = req.body.symbol
  par.save((err, result) => {
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/party');
  })
}


//Home
partyController.hom = (req, res) => {

  Party.find({
    _id: req.params.id
  }, (err, party) => {
    console.log(party[0].name);
    Candidate.find({
      'party': party[0].name
    }, (err, cand) => {
      if (err) res.send(err);
      else {
        res.render("../views/party/home", {
          parties: party,
          candidates: cand
        })
      }
    })
  })
}

//show
partyController.show = (req, res) => {
  Party.find({_id: req.params.id}, (err, result) => {
    if (err) res.send(err);
    else {
      console.log(result);
      res.render("../views/party/show", {
        parties: result
      });
    }
  })
}


//Update voter
partyController.update = (req, res) => {
  Party.findById(req.params.id, (err, result) => {
    if (err) res.send(err)
    result.name = req.body.name
    result.symbol = req.body.symbol
    result.save((err, result) => {
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/party/show/' + result._id);
    })
  })
}

partyController.rlist = (req, res) => {
  Party.findById(req.params.id, (err, party) => {
    if (err) res.send(err)
    else {
      Remote.find({$and:[{'to':party.name},{'from': { $nin :['admin']}}]}, (req, presult) =>{
      Remote.find({$and: [{'from':'admin'}, {'ename': 'Party'}]}, (req, eresult) =>{
        console.log(presult)
        res.render("../views/party/rlist", {parties: party, preqs:presult, ereqs:eresult })
      })
      })
    }
  })
}


partyController.rreg = (req, res) => {
  var reg = new Remote()
  reg.from = req.body.pname
  reg.to = req.body.cname
  reg.ename = req.body.ename
  reg.content = req.body.content
  reg.save((err, result) => {
    if (err) return console.log(err)
    else {
      console.log('Request Pushed')
      Party.find({'name': req.body.pname}, (err, result) => {
        if (err) console.log(err)
        res.redirect('/party/home/' + result[0].id);
      })
    }
  })
}


partyController.resolve = (req, res) => {
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
    Party.find({'name': temp }, (err, result1) => {
      dialog.info('Resolved Succesfully', 'Resolution', (exitCode) => {
        if (exitCode == 0) res.redirect('/party/request/' + result1[0]._id);
      })
    })
  })
}


partyController.clist = (req, res) => {
  Party.find({
    _id: req.params.id
  }, (err, party) => {
    if (err) res.send(err)
    else {
      Candidate.find({'party': ''}, (err, result) => {
        if (err) res.send(err)
        else {
          res.render('../views/party/clist', {
            candidates: result,
            parties: party
          })
        }
      })
    }
  })
}


partyController.cshow = (req, res) => {
  Party.find({
    'name': req.params.name
  }, (err, party) => {
    if (err) res.send(err)
    else {
      console.log(party)
      Candidate.find({
        _id: req.params.id
      }, (err, cand) => {
        res.render('../views/party/cshow', {
          candidates: cand,
          parties: party
        })
      })
    }
  })
}

partyController.cupdate = (req, res) => {
  Party.find({
    'name': req.params.name
  }, (err, party) => {
    if (err) res.send(err)
    else {
      Candidate.findById(req.params.id, (err, candidate) => {
        candidate.party = party[0].name
        candidate.save((err, result) => {
          if (err) return console.log(err)
          else {
            console.log('Candidate-Party Updated')
            res.redirect('/party/candidates/' + party[0].name + '/show/' + candidate._id);
          }
        })
      })
    }
  })
}

partyController.cdelete = (req, res) => {
  Party.find({
    'name': req.params.name
  }, (err, party) => {
    Candidate.findById(req.params.id, (err, candidate) => {

      candidate.party = req.body.party
      candidate.save((err, result) => {
        if (err) return console.log(err)
        else {
          console.log('Removed from party')
          res.redirect('/party/home/' + party[0]._id);
        }
      })
    })
  })
}

//=======================================================================================
partyController.elpolist = (req, res) => {
  Election.find({$and: [{'type': 'Presidential'}, {'status': 'Ongoing'}]}, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/party/elpoindex', {
        elections: result
      })
    }
  })
}

partyController.elposhow = (req, res) => {
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
        res.render('../views/party/elposhow', {
          elections: election,
          candidates: candidate
        })
      })
    }
  })
}

partyController.elpocshow = (req, res) => {
  Candidate.findById(req.params.id, (err, cand) => {
    if (err) res.send(err);
    else {
      res.render("../views/party/elpocshow", {
        candidates: cand
      });
    }
  })
}

partyController.elpclist = (req, res) => {
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
      res.render('../views/party/elpcindex', {
        elections: result
      })
    }
  })
}


partyController.elpcshow = (req, res) => {
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
            res.render('../views/party/elpcshow', {
              candidates: candidate
            })
          } else {
            res.render('../views/party/elpc2show', {
              candidates: candidate,
              candidates2: candidate2
            })
          }

        })
      })
    }
  })
}


partyController.elpulist = (req, res) => {
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
      res.render('../views/party/elpuindex', {
        elections: result
      })

    }
  })

}

module.exports = partyController;
