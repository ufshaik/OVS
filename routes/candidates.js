var express = require('express');
var router = express.Router();
var cand = require("../controllers/CandidateController.js");


//Create Candidates
router.get('/register', (req, res) => {
  cand.create(req, res);
});

router.post('/save', (req, res) => {
  cand.save(req, res);
});


router.get('/', (req, res) => {
  res.render('../views/candidates/login');
});

router.post('/verify', (req, res) => {
  cand.verify(req, res)
})

router.get('/home/:id', (req, res) => {
  cand.hom(req, res)
})

router.get('/show/:id', (req, res) => {
  cand.show(req, res);
})

router.post('/update/:id', (req, res) => {
  cand.update(req, res);
});

router.get('/party/:id', (req, res) => {
  cand.plist(req, res);
});

router.get('/request/:id', (req, res) => {
  cand.rlist(req, res);
});

router.post('/request/create', (req, res) => {
  cand.rreg(req, res);
});

router.get('/request/resolve/:id', (req, res) => {
  cand.resolve(req, res);
});

router.get('/elections', (req, res) => {
  res.render('../views/candidates/eindex')
});
router.get('/elections/presidential', (req, res) => {
  res.render('../views/candidates/eview')
})

router.get('/elections/presidential/ongoing', (req, res) => {
cand.elpolist(req, res);
})
router.get('/elections/presidential/oshow/:id', (req, res) => {
  cand.elposhow(req, res);
})
router.get('/elections/presidential/cshow/:id', (req, res) => {
  cand.elpocshow(req, res);
})

router.get('/elections/presidential/upcoming', (req, res) => {
  cand.elpulist(req, res)
})

router.get('/elections/presidential/completed', (req, res) => {
  cand.elpclist(req, res)
})
//=============================================================
router.get('/elections/district', (req, res) => {
  res.render('../views/candidates/edview')
})

router.get('/elections/district/ongoing', (req, res) => {
  cand.eldolist(req, res);
})

router.get('/elections/district/oshow/:id', (req, res) => {
  cand.eldoshow(req, res);
})

router.get('/elections/district/ooshow/:id2/:id', (req, res) =>{
  cand.eldooshow(req, res)
})

router.get('/elections/district/cshow/:id', (req, res) => {
  cand.eldocshow(req, res);
})
router.post('/elections/district/vote/:id', (req, res) => {
  cand.dvote(req, res);
})
router.get('/elections/district/upcoming', (req, res) => {
  cand.eldulist(req, res)
})

router.get('/elections/district/completed', (req, res) => {
  cand.eldclist(req, res)
})

router.get('/elections/district/coshow/:id', (req, res) =>{
  cand.eldcshow(req, res)
})




router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    res.redirect('/candidates');
  });
})


module.exports = router;
