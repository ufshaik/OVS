var mongoose = require('mongoose');
var Candidate = require('../models/Candidate');
var Election = require('../models/Election');
var Voter = require('../models/Voter');
var Party = require('../models/Party');
var Em = require('../models/Em');
var dialog = require('dialog');
var Remote = require('../models/Request');
var Back = require('../models/Back');
var District = require('../models/District');
var asyncLoop = require('node-async-loop');

var emController = {};

emController.save = (req, res) => {
  var eleman = new Em()
  eleman.name = req.body.name
  eleman.password = req.body.password
  eleman.save((err, result) => {
    if (err) return console.log(err)
    console.log('Force Pushed')
    //res.redirect('');
  })
}

emController.verify = (req, res) => {
  Em.find({
    'name': req.body.name
  }, (err, result) => {
    if (err) console.log(err)

    if (result[0].password == req.body.password) {
res.redirect('/em/home/' + result[0]._id);


    } else {
 res.redirect('/em/');

    }
  })
}

emController.hom = (req, res) => {

  Em.findById(req.params.id, (err, result) => {
    if (err) res.send(err);
    else {
      res.render("../views/EM/ehome", {
        feed: result
      })
    }
  })
}

//============================em/candidates=============================================================
//Home candidates

emController.cahome = (req, res) => {
  Candidate.find((err, result) => {
    if (err) return console.log(err)
    res.render("../views/EM/ecindex", {
      candidates: result
    })
  })
}

emController.cashow = (req, res) => {
  Candidate.findById(req.params.id, (err, cand) => {
    if (err) res.send(err);
    else {
      res.render("../views/EM/cashow", {
        candidates: cand
      });
    }
  })
}


//Edit Candidates
emController.caedit = (req, res) => {
  Candidate.findById(req.params.id, (err, cand) => {
    if (err) res.send(err);
    else {
      res.render("../views/EM/caedit", {
        candidates: cand
      });
    }
  })
}

//Update Candidates
emController.caupdate = (req, res) => {
  Candidate.findById(req.params.id, (err, cand) => {
    if (err) res.send(err)
    cand.name = req.body.name
    cand.address = req.body.address
    cand.party = req.body.party
    cand.age = req.body.age
    cand.presidential = req.body.presidential
    cand.district = req.body.district
    cand.did = req.body.did
    cand.dname = req.body.dname
    cand.pid = req.body.pid
    cand.pvote = req.body.pvote
    cand.dvote = req.body.dvote
    cand.save((err, result) => {
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/em/candidates/show/' + cand._id);
    })
  })
}

//delete Candidates
emController.cadelete = (req, res) => {
  Candidate.remove({
    _id: req.params.id
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Candidate Removed!");
      res.redirect("/em/candidates");
    }
  });
};




//+++++++++++++++++++++++++++em/candidates++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//===========================em/Party===================================================================
emController.phome = (req, res) => {
  Party.find((err, result) => {
    res.render('../views/EM/pindex', { parties: result }) })
}

emController.pshow = (req, res) => {
  Candidate.find({
    'party': req.params.name
  }, (err, result) => {
    if (err) res.send(err);
    else {
      console.log(result);
      res.render("../views/EM/pshow", {
        parties: result
      });
    }
  })
}

emController.pedit = (req, res) => {
  Party.find({
    'name': req.params.name
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result)
      res.render("../views/EM/pedit", {
        parties: result
      })
    }
  })
}

//Update Candidates
emController.pupdate = (req, res) => {
  Party.findById(req.params.id, (err, result) => {
    if (err) res.send(err)
    result.name = req.body.name
    result.symbol = req.body.symbol
    result.save((err, result) => {
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/em/party');
    })
  })
}

//delete CandidateS
emController.pdelete = (req, res) => {
  Party.remove({
    'name': req.params.name
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.params.name)
      console.log("Party Removed!");
      res.redirect("/em/party");
    }
  });
};




//+++++++++++++++++++++++++++em/party+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//===========================em/voters=================================================================
//Home Voters

emController.vhome = (req, res) => {
  Voter.find( (err, result) => {
    if (err) return console.log(err)
    res.render("../views/EM/vindex", {
      voters: result
    })
  })
}

emController.vshow = (req, res) => {
  Voter.findById(req.params.id, (err, cand) => {
    if (err) res.send(err);
    else {
      res.render("../views/EM/vshow", {
        voters: cand
      });
    }
  })
}


//Edit Voters
emController.vedit = (req, res) => {
  Voter.findById(req.params.id, (err, result) => {
    if (err) res.send(err);
    else {
      res.render("../views/EM/vedit", {
        voters: result
      });
    }
  })
}

//Update Voters
emController.vupdate = (req, res) => {
  Voter.findById(req.params.id, (err, result) => {
    if (err) res.send(err)
    result.username = req.body.username
    result.password = req.body.password
    result.email = req.body.email
    result.age = req.body.age
    result.firstname = req.body.firstname
    result.middlename = req.body.middlename
    result.lastname = req.body.lastname

    result.save((err, result) => {
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/em/voters/show/' + result._id);
    })
  })
}

//delete Voters
emController.vdelete = (req, res) => {
  Voter.remove({
    _id: req.params.id
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Voter Removed!");
      res.redirect("/em/voters");
    }
  });
};


//+++++++++++++++++++++++++++em/voters++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//===========================em/elections===========================================================
emController.elcreate = (req, res) => {
  Election.find()
    .sort({
      eid: -1
    })
    .exec((err, result) => {
      res.render('../views/EM/elcreate', {
        elections: result
      })
    })
}

emController.elsave = (req, res) => {
  var election = new Election()
  election.eid = req.body.eid
  election.type = req.body.type
  election.status = req.body.status
  election.seats = req.body.seats
  election.edate = req.body.edate
  election.sdate = req.body.sdate
  election.e1date = req.body.e1date
  election.s1date = req.body.s1date
  election.save((err, result) => {
    if (err) return console.log(err)
    else {
      console.log("New Election!!Phew");
      res.redirect('/em/elections')
    }
  })
}

emController.elpolist = (req, res) => {
  Election.find({
    $and: [{
      'type': 'Presidential'
    }, {
      'status': 'Ongoing'
    }]
  }, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/EM/elpoindex', {
        elections: result
      })
    }
  })
}

emController.elposhow = (req, res) => {
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
        res.render('../views/EM/elposhow', {
          elections: election,
          candidates: candidate
        })
      })
    }
  })
}

emController.elpocal = (req, res) => {
  Election.findById(req.params.id, (err, election) => {
    if (err) res.send(err)
    else {
      Candidate.find({$and: [{'pid': election.eid }, {'presidential': 'true'}]})
           .sort({pvote: -1 })
        .exec((err, result) => {
          var max = 0;
          for (var i = 0; i < result.length; i++) {
            var max = max + result[i].pvote;
          }
          if (result[0].pvote > max / 2) {
            for (var i = 0; i < result.length; i++) {
              var back = new Back();
              back.name = result[i].name;
              back.party = result[i].party;
              back.age = result[i].age;
              back.presidential = result[i].presidential;
              back.pid = result[i].pid;
              back.pvote = result[i].pvote;
              back.save();
              console.log("New BackUP" + [i] + back);
            }
            election.status = 'Completed'
            election.save();
            for (var i = 0; i < result.length; i++) {
              result[i].pvote = 0;
              result[i].presidential = false;
              result[i].pid = 0;
              result[i].save();
            }
            console.log("No round 2");
            res.redirect('/em/elections/presidential');
          } else {
            console.log('Round 2');
            console.log(election.eid + 0.1);

            for (var i = 0; i < result.length; i++) {
              var back = new Back();
              back.name = result[i].name;
              back.party = result[i].party;
              back.age = result[i].age;
              back.presidential = result[i].presidential;
              back.pid = result[i].pid;
              back.pvote = result[i].pvote;
              back.save();
              console.log("New Backup" + [i] + back);
            }

            for (var i = 0; i < 2; i++) {
              result[i].pvote = 0;
              result[i].pid = result[i].pid + 0.1;
              result[i].save()
            }
            if (result.length > 2) {
              for (var i = 2; i < result.length; i++) {
                result[i].pvote = 0;
                result[i].presidential = false;
                result[i].pid = 0;
                result[i].save()
              }
            }

            var election1 = new Election();
            election1.eid = election.eid + 0.1;
            election1.type = election.type;
            election1.status = election.status;
            election1.sdate = election.s1date;
            election1.edate = election.e1date;
            console.log(election1.eid + election1.type + election1.status);
            election1.save((err, result) => {
              console.log(result);
            });
            election.status = "Completed";
            election.save();
            res.redirect('/em/elections/presidential')
          }
        })
    }
  })
}




emController.elpulist = (req, res) => {
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
      res.render('../views/EM/elpuindex', {
        elections: result
      })
    }
  })
}

emController.elpclist = (req, res) => {
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
      res.render('../views/EM/elpcindex', {
        elections: result
      })

    }
  })
}

emController.elpcshow = (req, res) => {
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
          //console.log('Round 2');
          //console.log(candidate2);
          //console.log('Round 1');
          //console.log(candidate)
          if (candidate2.length < 1) {
            res.render('../views/EM/elpcshow', {
              candidates: candidate
            })
          } else {
            res.render('../views/EM/elpc2show', {
              candidates: candidate,
              candidates2: candidate2
            })
          }

        })
      })
    }
  })
}


//===============================================District===============================================

emController.eldolist = (req, res) => {
  Election.find({$and: [{'type': 'District'}, {'status': 'Ongoing'}]}, (err, result) => {
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/EM/eldoindex', {
        elections: result
      })
    }
  })
}


emController.eldoshow = (req, res) =>{
  Election.find({_id: req.params.id}, (err, election) => {
    if (err) res.send(err)
    else {

      Party.find((req, party)=>{
      asyncLoop(party,0,party.length-1, (parts, next) =>{
          Party.findById(parts._id,(err, par)=>{
            Candidate.find({$and:[{'party': par.name},{'did': election[0].eid}]},(err, cand) =>{
              var cal = 0;
              if (cand.length !=0 )
              {
            asyncLoop(cand,0,cand.length-1, (cands, next) =>{
                      cal = cal + cands.dvote;
                      parts.dvotes = cal;
                      parts.save();
                      console.log('Party Updated');
                      next();

                  }
                  ,(err) =>{
                    if (err){
                      console.log('Error:' + err);
                      return;
                    }
                  }
                  )
                  }
                  else {
                    next();
                  }

            })

          })

          next();
      }
            ,(err) =>{
        if (err){
          console.log('Error:' + err);
          return;
        }
      }
      )
    })
      District.find({'eid': election[0].eid}, (err, reg) => {
        District.find({'eid': 0 }, (err, nonreg) =>{
          res.render('../views/EM/eldoshow', {elections: election,regs: reg, nregs: nonreg})
        })
      })
    }
  })
}

emController.created = (req, res) =>{
  District.find( (err, district) =>{
    console.log(district);
      res.render('../views/EM/dcreate', {districts: district})
  })
}

emController.saved = (req, res) => {
  var district = new District()
  district.id = req.body.id
  district.name = req.body.name
  district.save((err, result) => {
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/em/elections/district');
  })
}

emController.enrolld = (req, res) =>{
  District.findById(req.params.id, (err, update) =>{
    Election.find({'eid': req.params.n}, (err, election)=>{
      update.eid = election[0].eid
      update.save()
      res.redirect('/em/elections/district/ongoing')

    })
  })
}

emController.eldooshow = (req, res) =>{
  Election.find({'eid': req.params.id}, (err, election) =>{
    District.find({$and:[{'eid': req.params.id}, { _id: req.params.id2}]},(err, district) =>{
      Candidate.find({$and:[{'did': election[0].eid },{'dname': district[0].name}]}, (err, candidate) =>{
        res.render('../views/EM/eldooshow',{elections: election, districts: district, candidates: candidate})
      })
    })
  })

}


emController.cald = (req, res) =>{
  Election.find({_id: req.params.id},(err, election)=>{
    Candidate.find({'did': election[0].eid},(err, candidate)=>{
      Party.find((err, party)=>{
        var temp = 0;
    asyncLoop(candidate,0,candidate.length-1, (cand, next) =>{
        temp = temp + cand.dvote;
        next();
    }
    ,(err) =>{
      if (err){
        console.log('Error:' + err);
        return;
      }
    }
    )
    var max = temp;
    var store =0;
    console.log('Max Votes'+ max);
   var min = 0.05*max;
   console.log(min)
   // Qualify and Dis-Qualfy for seats based on 5% Criteria
    asyncLoop(party,0,party.length-1, (part, next) =>{
        if (err)
        {
          next(err);return;
        }
        Party.findById(part._id, (err, par) =>{
          if (par.dvotes > min) {
          console.log('Qualifies'+ par.name);
          } else {
            console.log('Dis-Qualified'+ par.name)
            Candidate.find({$and:[{'party': par.name},{'did': election[0].eid}]}, (err, cand)=>{
              asyncLoop(cand,0,cand.length-1, (cands, next) =>{
                  if (err)
                  {
                    next(err);return;
                  }
                  if ( cand.length != 0)
                  {
                  cands.district = false;
                  cands.dname = ' ';
                  cands.dvote = 0;
                  cands.did = 0;
                  cands.save()
                  next();
                  }
                  else{
                    next();
                  }
                          }
              ,(err) =>{
                if (err){
                  console.log('Error:' + err);
                  return;
                }
              }
              )

            })
          }
        })
        next();
    }
    ,(err) =>{
      if (err){
        console.log('Error:' + err);
        return;
      }
    }
    )

var total = election[0].seats
var i = 0;
console.log(total);
      Party.find().sort({dvotes: -1}).exec((err, par) =>{
        asyncLoop(par,0,total-1, (pars, next) =>{
          Candidate.find({$and:[{'party': pars.name }, {'did': election[0].eid }]}).sort({dvote: -1}).exec((err, cand) =>{
            if (err)
            {
              next(err);return;
            }
            District.find({$and :[{'name': cand[0].dname},{'eid': election[0].eid}] } , (err, dis)=>{
              if ( dis.length != 0)
              {
                console.log(dis);
                console.log('Inside If');
                var back = new Back();
                back.name = cand[0].name;
                back.age = cand[0].age;
                back.dvote = cand[0].dvote;
                back.party = cand[0].party;
                back.did = cand[0].did;
                back.district = cand[0].district;
                back.dname = cand[0].dname;
                back.seats = total;
                back.save();
                dis[0].eid = 0;
                dis[0].save();
              }
              else
              {
                District.find({'eid': election[0].eid}, (err, dist) =>{
                  console.log(dist);
                  console.log('Inside else');
                  var back = new Back();
                  back.name = cand[0].name;
                  back.age = cand[0].age;
                  back.dvote = cand[0].dvote;
                  back.party = cand[0].party;
                  back.did = cand[0].did;
                  back.district = cand[0].district;
                  back.dname = dist[0].name;
                  back.seats = total;
                  back.save();
                  dist[0].eid = 0;
                  dist[0].save();
                })
              }
            })
            next();
        })
        }
        ,(err) =>{
    if (err)
    {
        console.log('Error: ' + err);
        return;
    }

    console.log('Finished!');
    res.redirect('/em/elections/district/refresh/'+ election[0]._id)
 })

  })



      })
    })
  })

}


emController.refresh = (req, res) =>{

setTimeout(function1, 3000);

function function1 () {
  Election.findById(req.params.id, (err, result) =>{
  Candidate.find({'did': result.eid }, (err, cand) =>{
    var ca = cand.length-1;
  asyncLoop(cand,0,ca, (cands, next) =>{
      if (err)
      {
        next(err);return;
      }
      cands.district = false;
      cands.dname = ' ';
      cands.dvote = 0;
      cands.did = 0;
      cands.save();
      next();

  }
  ,(err) =>{
    if (err){
      console.log('Error:' + err);
      return;
    }
  }
  )
  })

  Party.find((err, par) =>{
    var pa = par.length - 1;
  asyncLoop(par,0,pa, (party, next) =>{
      if (err)
      {
        next(err);return;
      }
      party.dvotes = 0;
      party.save();
      next();
  }
  ,(err) =>{
    if (err){
      console.log('Error:' + err);
      return;
    }
  }
  )
  })
  result.status = 'Completed';
  result.save()
})
}
  res.redirect('/em/elections/district');
}

emController.eldclist = (req, res) =>{
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
      res.render('../views/EM/eldcindex', {
        elections: result
      })

    }
  })

}

emController.eldcshow = (req, res) => {
  Election.find({
    _id: req.params.id
  }, (err, election) => {
    if (err) res.send(err)
    else {

      Back.find({'did': election[0].eid}, (err, candidate) => {
            res.render('../views/EM/eldcshow', {
              candidates: candidate
          })
        })
      }})}

      emController.eldulist = (req, res) => {
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
            res.render('../views/EM/elduindex', {
              elections: result
            })

          }
        })

      }
//+++++++++++++++++++++++++++em/elections+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//===========================em/requests============================================================

emController.rlist = (req, res) => {

  Em.findById(req.params.id, (err, result) => {
    if (err) res.send(err)
    else {
      Remote.find({$and:[{'to':'admin'},{'ename':'Party'}]}, (req, presult) =>{
        Remote.find({$and:[{'to':'admin'},{'ename':'Candidate'}]}, (req, cresult) =>{
        res.render("../views/EM/rlist", {preqs:presult, result:result , creqs:cresult})

      })
    })
    }
  })
}

emController.rreg = (req, res) => {
  var reg = new Remote()
  reg.from = req.body.cname
  reg.to = req.body.pname
  reg.ename = req.body.ename
  reg.content = req.body.content
  reg.save((err, result) => {
    if (err) return console.log(err)
    else {
      console.log('Request Pushed')
      Em.find({
        'name': req.body.cname
      }, (err, result) => {
        if (err) console.log(err)
        res.redirect('/em/home/' + result[0].id);
      })
    }
  })
}

emController.resolve = (req, res) => {
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
    Em.find({ 'name': temp }, (err, result1) => {
      dialog.info('Read Succesfull ', 'Read', (exitCode) => {
        if (exitCode == 0) res.redirect('/em/request/' + result1[0]._id);
      })
    })
 })
}




//+++++++++++++++++++++++++++em/requests++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


module.exports = emController;
